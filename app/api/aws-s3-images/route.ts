import { S3Client, HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

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

    if (!userId) {
        return new NextResponse("No user id provided", { status: 400 })
    }

    const files = formData.getAll('file');
    const results = [];

    for (const file of files) {
        const uniqueFileName = `${userId}_${file.name}`;

        // Check if file already exists
        const headParams = {
            Bucket: bucketName,
            Key: uniqueFileName,
        };
        try {
            await s3.send(new HeadObjectCommand(headParams));

            // If the file exists, return the existing URL
            const url = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${encodeURIComponent(uniqueFileName)}`;
            results.push(url);
            continue;
        } catch (error) {
            // If the file doesn't exist, continue to upload
        }

        try {
            // Upload the file
            const arrayBuffer = await file.arrayBuffer();
            const uploadParams = {
                Bucket: bucketName,
                Key: uniqueFileName,
                Body: Buffer.from(arrayBuffer),
                ContentType: file.type,
            };
            await s3.send(new PutObjectCommand(uploadParams));

            const url = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${encodeURIComponent(uniqueFileName)}`;
            results.push(url);
        } catch (error) {
            console.error(`Error uploading file to S3: ${uniqueFileName}`, error);
            results.push(null);
        }
    }

    return new NextResponse(JSON.stringify(results), { status: 200, headers: { 'Content-Type': 'application/json' } });
}