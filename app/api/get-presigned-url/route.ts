import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from 'next/server';

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
});

const MAX_PRESIGNED_URL_DURATION = 604800; // 7 days in seconds

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');

  if (!key) {
    return NextResponse.json({ error: 'No key provided' }, { status: 400 });
  }

  if (!process.env.AWS_BUCKET_REGION || !process.env.AWS_BUCKET_NAME) {
    console.error('AWS configuration is missing');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: MAX_PRESIGNED_URL_DURATION });

    return NextResponse.json({ url: presignedUrl }, {
      headers: {
        'Cache-Control': 'public, max-age=604800, s-maxage=604800', // 7 days
      },
    });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json({ error: 'Failed to generate presigned URL' }, { status: 500 });
  }
}
