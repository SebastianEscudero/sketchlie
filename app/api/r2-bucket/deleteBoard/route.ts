import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const POST = async (request: Request): Promise<Response> => {
    // Parse the request body
    const { boardId } = await request.json();

    // Check if board.id is defined
    if (!boardId) {
        return new Response(JSON.stringify({ error: "Board ID is undefined" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME;
    const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
    const ACCESS_KEY = process.env.CLOUDFLARE_R2_BUCKET_ACCESS_KEY;
    const SECRET_KEY = process.env.CLOUDFLARE_R2_BUCKET_SECRET_KEY;
    const s3 = new S3Client({
        region: "auto",
        endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: ACCESS_KEY!,
            secretAccessKey: SECRET_KEY!,
        }
    });

    // Use the board's ID as the object key
    const objectKey = `board-${boardId}.json`;

    try {
        const command = new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: objectKey,
        });
    
        await s3.send(command);
        // Return a success response
        return new Response(JSON.stringify({ message: "Board object successfully deleted" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error deleting board object in R2 bucket:", error);
        return new Response(JSON.stringify({ error: "Failed to delete board object in R2 bucket" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};