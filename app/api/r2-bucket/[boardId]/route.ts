import { bodyToString } from "@/lib/utils";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const GET = async (request: Request): Promise<Response> => {
    const url = new URL(request.url);
    const pathnameSegments = url.pathname.split('/');
    // Assuming the structure is /api/r2-bucket/{boardId}/...
    // Skip the first segment if it's empty due to a leading slash
    const startIndex = pathnameSegments[0] === '' ? 3 : 2;
    const boardId = pathnameSegments.length > startIndex ? pathnameSegments[startIndex] : null;

    if (!boardId) {
        return new Response(JSON.stringify({ error: "Board ID is undefined" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME;
    const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
    const s3 = new S3Client({
        region: "auto",
        endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: process.env.CLOUDFLARE_R2_BUCKET_ACCESS_KEY!,
            secretAccessKey: process.env.CLOUDFLARE_R2_BUCKET_SECRET_KEY!,
        }
    });

    const objectKey = `board-${boardId}.json`;

    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: objectKey,
        });

        const { Body } = await s3.send(command);
        if (Body) {
            const bodyText = await bodyToString(Body); // Convert Body to string based on the environment
            const layersJson = JSON.parse(bodyText); // Parse string as JSON
            return new Response(JSON.stringify(layersJson), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            // Handle case where Body is undefined or null
            return new Response(JSON.stringify({ error: "No content found for the specified board ID" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error: any) {
        console.error("Error fetching board layers", error);
        // Check if the error is a CORS issue
        if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            return new Response(JSON.stringify({ error: "CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource." }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        // Handle other errors
        return new Response(JSON.stringify({ error: "Failed to fetch board layers from R2 bucket", details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};