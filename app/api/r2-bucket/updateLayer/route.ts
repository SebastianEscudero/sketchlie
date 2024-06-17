import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { bodyToString } from "../[boardId]/route";

async function fetchBoardData(boardId: string): Promise<any> {
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
            const bodyText = await bodyToString(Body); // Use the existing bodyToString function
            return JSON.parse(bodyText); // Parse and return the board data
        } else {
            throw new Error("No content found for the specified board ID");
        }
    } catch (error) {
        console.error("Error fetching board data:", error);
        throw error; // Rethrow to handle in the calling function
    }
}

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

    let serializedBoard: string;
    const existingBoardData = await fetchBoardData(boardId);

    const layerIds = Array.isArray(layerId) ? layerId : [layerId];
    const layersUpdates = Array.isArray(layer) ? layer : [layer];

    layerIds.forEach((layerId, index) => {
      if (!existingBoardData.layers[layerId]) {
        throw new Error(`Layer ${layerId} not found`);
      }
      existingBoardData.layers[layerId] = { ...existingBoardData.layers[layerId], ...layersUpdates[index] };
    });

    serializedBoard = JSON.stringify(existingBoardData);

    console.log(serializedBoard)

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