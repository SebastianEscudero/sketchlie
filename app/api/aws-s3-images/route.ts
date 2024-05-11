import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
    const bucketName = process.env.AWS_BUCKET_NAME;
    const bucketRegion = process.env.AWS_BUCKET_REGION;
    const accessKey = process.env.AWS_ACCESS;
    const secretAccessKey = process.env.AWS_SECRET;

    if (!bucketName || !bucketRegion || !accessKey || !secretAccessKey) {
        return new NextResponse("No AWS credentials", {status: 500})
    }

    const s3 = new S3Client({
        credentials: {
            accessKeyId: accessKey,
            secretAccessKey: secretAccessKey,
        },
        region: bucketRegion,
    });

    const formData = await req.formData();
    const file = formData.get('file');
    const userId = formData.get('userId');

    if (!userId) {
        return new NextResponse("No user id provided", {status: 400})
    }

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
        return new NextResponse(url, {status: 200});
    } catch (error) {
        // If the file doesn't exist, continue to upload
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const putParams = {
        Bucket: bucketName,
        Key: uniqueFileName,
        Body: buffer,
        ContentType: file.type,
    };

    const command = new PutObjectCommand(putParams)

    await s3.send(command)

    const url = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${encodeURIComponent(uniqueFileName)}`;

    return new NextResponse(url, {status: 200})
}