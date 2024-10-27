import { S3Client, HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import sharp from 'sharp';

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
            const finalUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${encodeURIComponent(uniqueFileName)}`;

            // Check if file exists in S3 (keep existing caching logic)
            try {
                const headResponse = await s3.send(new HeadObjectCommand({
                    Bucket: bucketName,
                    Key: uniqueFileName
                }));

                if (headResponse.ETag) {
                    console.log(`File already exists in S3: ${uniqueFileName}`);
                    return finalUrl;
                }
            } catch {
                // File doesn't exist, proceed with upload
                const arrayBuffer = await file.arrayBuffer();
                let buffer = Buffer.from(arrayBuffer);
                const originalSize = buffer.length;

                // Optimize image if it's an image file
                if (file.type.startsWith('image/')) {
                    const optimizationResult = await optimizeImage(buffer, file.type);
                    buffer = optimizationResult.buffer;
                    
                    console.log(`Image optimization results for ${file.name}:`);
                    console.log(`  Original size: ${originalSize / 1024} KB`);
                    console.log(`  Optimized size: ${buffer.length / 1024} KB`);
                    console.log(`  Size reduction: ${((originalSize - buffer.length) / originalSize * 100).toFixed(2)}%`);
                    console.log(`  Dimensions: ${optimizationResult.width}x${optimizationResult.height}`);
                }

                const command = new PutObjectCommand({
                    Bucket: bucketName,
                    Key: uniqueFileName,
                    Body: buffer,
                    ContentType: file.type,
                    CacheControl: 'public, max-age=31536000',
                    Metadata: {
                        'original-name': file.name,
                        'upload-date': new Date().toISOString(),
                    }
                });

                await s3.send(command);

                return finalUrl;
            }
        }));

        return new NextResponse(JSON.stringify(results), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600',
                'ETag': `W/"${Date.now()}"`,
            }
        });

    } catch (error) {
        console.error('Error processing uploads:', error);
        return new NextResponse("Error processing uploads", { status: 500 });
    }
}

async function optimizeImage(buffer: Buffer, mimeType: string): Promise<{ buffer: Buffer, width: number, height: number }> {
    const image = sharp(buffer);
    const metadata = await image.metadata();
    let width = metadata.width || 0;
    let height = metadata.height || 0;

    // Resize if image is larger than 2000px
    if (width > 2000 || height > 2000) {
        image.resize(2000, 2000, {
            withoutEnlargement: true,
            fit: 'inside'
        });
        const resizedMetadata = await image.metadata();
        width = resizedMetadata.width || 0;
        height = resizedMetadata.height || 0;
    }

    // Apply mild sharpening
    image.sharpen({ sigma: 1, m1: 0.5, m2: 0.3, x1: 2, y2: 10, y3: 20 });

    // Optimize based on image type
    let optimizedBuffer: Buffer;
    switch (mimeType) {
        case 'image/jpeg':
            optimizedBuffer = await image
                .jpeg({
                    quality: 85,
                    progressive: true,
                    optimizeScans: true,
                    mozjpeg: true,
                    trellisQuantisation: true,
                    overshootDeringing: true,
                    quantisationTable: 3
                })
                .toBuffer();
            break;
        case 'image/png':
            optimizedBuffer = await image
                .png({
                    compressionLevel: 9,
                    progressive: true,
                    palette: true,
                    quality: 80,
                    effort: 10,
                    adaptiveFiltering: true,
                    colors: 256
                })
                .toBuffer();
            break;
        case 'image/webp':
            optimizedBuffer = await image
                .webp({
                    quality: 82,
                    effort: 6,
                    lossless: false,
                    nearLossless: true
                })
                .toBuffer();
            break;
        default:
            optimizedBuffer = buffer;
    }

    // If the optimized version is larger, return the original
    if (optimizedBuffer.length > buffer.length) {
        return { buffer, width, height };
    }

    return { buffer: optimizedBuffer, width, height };
}
