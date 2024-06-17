import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const POST = async (request: Request): Promise<Response> => {
    // Parse the request body
    const { boardId, layer, layerId } = await request.json();

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

    // Ensure layerId and layer are arrays

    // Serialize the updated board object
    const serializedBoard = JSON.stringify({
        layers: layer,
        layerIds: layerId,
    });

    // Use the board's ID as the object key
    const objectKey = `board-${boardId}.json`;

    try {
        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: objectKey,
            Body: serializedBoard,
        });

        await s3.send(command);
    } catch (error) {
        console.error("Error updating board layers in R2 bucket:", error);
        return new Response(JSON.stringify({ error: "Failed to update board layers in R2 bucket" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Return the updated board object as a response
    return new Response(serializedBoard, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};