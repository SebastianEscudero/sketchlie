import { S3Client, HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import sharp from 'sharp';

// Maximum file size for optimization (5MB)
const MAX_OPTIMIZATION_SIZE = 5 * 1024 * 1024;

export const POST = async (req: any) => {
    const bucketName = process.env.AWS_BUCKET_NAME;
    const bucketRegion = process.env.AWS_BUCKET_REGION;
    const accessKey = process.env.AWS_ACCESS;
    const secretAccessKey = process.env.AWS_SECRET;

    if (!bucketName || !bucketRegion || !accessKey || !secretAccessKey) {
        return new NextResponse("No AWS credentials", { status: 500 })
    }

    const s3 = new S3Client({
        credentials: {
            accessKeyId: accessKey,
            secretAccessKey: secretAccessKey,
        },
        region: bucketRegion,
    });

    const formData = await req.formData();
    const userId = formData.get('userId');
    const files = formData.getAll('file');

    if (!userId) {
        return new NextResponse("No user id provided", { status: 400 })
    }

    try {
        const results = await Promise.all(files.map(async (file: File) => {
            const uniqueFileName = `${userId}_${file.name}`;

            // Generate the final URL upfront
            const finalUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${encodeURIComponent(uniqueFileName)}`;

            // Check if file exists in S3
            try {
                const headResponse = await s3.send(new HeadObjectCommand({ 
                    Bucket: bucketName, 
                    Key: uniqueFileName 
                }));
                
                // If ETag matches, return cached URL
                const eTag = headResponse.ETag;
                if (eTag) {
                    return finalUrl;
                }
            } catch {
                // File doesn't exist, process and upload
                let processedBuffer: Buffer;
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                // Optimize images if they're not too large
                if (file.type.startsWith('image/') && buffer.length < MAX_OPTIMIZATION_SIZE) {
                    processedBuffer = await optimizeImage(buffer, file.type);
                } else {
                    processedBuffer = buffer;
                }

                // Generate presigned URL with metadata
                const command = new PutObjectCommand({
                    Bucket: bucketName,
                    Key: uniqueFileName,
                    ContentType: file.type,
                    CacheControl: 'public, max-age=31536000', // 1 year cache
                    Metadata: {
                        'original-name': file.name,
                        'upload-date': new Date().toISOString(),
                    }
                });

                const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

                // Upload to S3 with optimized settings
                await fetch(presignedUrl, {
                    method: 'PUT',
                    body: processedBuffer,
                    headers: {
                        'Content-Type': file.type,
                        'Cache-Control': 'public, max-age=31536000',
                    },
                });
            }

            return finalUrl;
        }));

        return new NextResponse(JSON.stringify(results), { 
            status: 200, 
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600', // Cache API response for 1 hour
                'ETag': `W/"${Date.now()}"`, // Add ETag for browser caching
            } 
        });

    } catch (error) {
        console.error('Error processing uploads:', error);
        return new NextResponse("Error processing uploads", { status: 500 });
    }
}

async function optimizeImage(buffer: Buffer, mimeType: string): Promise<Buffer> {
    const image = sharp(buffer);
    const metadata = await image.metadata();
    const width = metadata.width || 0;

    // Only resize if image is larger than 2000px
    if (width > 2000) {
        image.resize(2000, undefined, { 
            withoutEnlargement: true,
            fit: 'inside'
        });
    }

    // Optimize based on image type
    switch (mimeType) {
        case 'image/jpeg':
            return image
                .jpeg({ 
                    quality: 80, 
                    progressive: true,
                    optimizeScans: true
                })
                .toBuffer();
        case 'image/png':
            return image
                .png({ 
                    compressionLevel: 9, 
                    progressive: true,
                    palette: true
                })
                .toBuffer();
        case 'image/webp':
            return image
                .webp({ 
                    quality: 80,
                    effort: 6 // Higher compression effort
                })
                .toBuffer();
        default:
            return buffer;
    }
}