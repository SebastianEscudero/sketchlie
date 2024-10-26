import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const { fileName, fileType, userId } = await req.json();
    
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

    const uniqueFileName = `${userId}_${fileName}`;
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: uniqueFileName,
        ContentType: fileType,
        CacheControl: 'public, max-age=31536000',
    });

    const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    const finalUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${encodeURIComponent(uniqueFileName)}`;

    return NextResponse.json({ presignedUrl, finalUrl });
}
