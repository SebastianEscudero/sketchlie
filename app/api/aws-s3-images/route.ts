import { S3Client, HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import sharp from 'sharp';

export const POST = async (req: any) => {
    const bucketName = process.env.AWS_BUCKET_NAME;
    const bucketRegion = process.env.AWS_BUCKET_REGION;
    const accessKey = process.env.AWS_ACCESS;
    const secretAccessKey = process.env.AWS_SECRET;
    const cloudFrontDomain = process.env.CLOUDFRONT_DOMAIN;

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
            // Usar CloudFront en lugar de S3 directo
            const finalUrl = `https://${cloudFrontDomain}/${encodeURIComponent(uniqueFileName)}`;

            try {
                const headResponse = await s3.send(new HeadObjectCommand({
                    Bucket: bucketName,
                    Key: uniqueFileName
                }));

                if (headResponse.ETag) {
                    return finalUrl;
                }
            } catch {
                const arrayBuffer = await file.arrayBuffer();
                let buffer = Buffer.from(arrayBuffer);
                
                if (file.type.startsWith('image/')) {
                    const optimizationResult = await optimizeImage(buffer, file.type);
                    buffer = optimizationResult.buffer;
                }

                const command = new PutObjectCommand({
                    Bucket: bucketName,
                    Key: uniqueFileName,
                    Body: buffer,
                    ContentType: file.type,
                });

                await s3.send(command);
                return finalUrl;
            }
        }));

        return new NextResponse(JSON.stringify(results), { 
            status: 200, 
            headers: { 
                'Content-Type': 'application/json',
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
