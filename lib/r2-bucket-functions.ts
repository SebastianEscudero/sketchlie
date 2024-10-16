let isUpdating = false;

export async function updateR2Bucket(apiEndpoint: string, boardId: string, layerIds: any, layers?: any) {
    isUpdating = true;
    
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        if (isUpdating) {
            e.preventDefault();
        }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    try {
        const requestBody: { boardId: string; layerId: any; [key: string]: any } = {
            boardId,
            layerId: layerIds,
        };

        if (layers !== undefined) {
            requestBody['layer'] = layers;
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
    } finally {
        isUpdating = false;
        window.removeEventListener('beforeunload', handleBeforeUnload);
    }
}