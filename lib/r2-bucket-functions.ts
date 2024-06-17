export async function updateR2Bucket(apiEndpoint: string, boardId: string, layerIds: any, layers?: any) {
    // Define requestBody with an index signature to allow additional properties
    const requestBody: { boardId: string; layerId: any; [key: string]: any } = {
        boardId,
        layerId: layerIds,
    };

    if (layers !== undefined) {
        requestBody['layer'] = layers; // Now TypeScript knows additional properties are allowed
    }

    const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        throw new Error('Failed to add layer');
    }

    const data = await response.json();
    return data;
}