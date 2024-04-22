import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export const POST = async (req: any) => {
    const bucketName = process.env.AWS_BUCKET_NAME;
    const bucketRegion = process.env.AWS_BUCKET_REGION;
    const accessKey = process.env.AWS_ACCESS_KEY;
    const secretAccessKey = process.env.AWS_SECRET_KEY;

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
    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueFileName = `${uuidv4()}_${file.name}`;

    const params = {
        Bucket: bucketName,
        Key: uniqueFileName,
        Body: buffer,
        ContentType: file.type,
      };

    const command = new PutObjectCommand(params)

    await s3.send(command)

    const url = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${encodeURIComponent(uniqueFileName)}`;

    return new NextResponse(url, {status: 200})
}