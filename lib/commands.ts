import { Layers } from "@/types/canvas";
import { Socket } from "socket.io-client";
import { updateR2Bucket } from "./r2-bucket-functions";
import { getMaxCapas } from "./planLimits";

export interface Command {
    execute(liveLayerIds: string[], liveLayers: Layers): void;
    undo(liveLayerIds: string[], liveLayers: Layers): void;
}

export class InsertLayerCommand implements Command {
    constructor(
        private layerIds: any[],
        private layers: any[],
        private prevLayers: Layers,
        private prevLayerIds: string[],
        private setLiveLayers: (layers: Layers | any) => void,
        private setLiveLayerIds: (layerIds: string[]) => void,
        private boardId: string,
        private socket: Socket | null,
        private org: any,
        private proModal: any,
        private imported: boolean = false,
    ) { }

    execute(liveLayerIds: string[], liveLayers: Layers) {

        if (this.imported) {
            const layers = this.layers.reduce((acc, layer, index) => ({ ...acc, [this.layerIds[index]]: layer }), {})
            this.setLiveLayerIds(this.layerIds);
            this.setLiveLayers(layers);
            updateR2Bucket('/api/r2-bucket/addLayer', this.boardId, this.layerIds, layers);
            return;
        }

        this.layerIds.forEach((layerId, index) => {
            liveLayers = { ...liveLayers, [layerId]: this.layers[index] };
            liveLayerIds = [...liveLayerIds, layerId];
        });

        if (liveLayerIds.length > getMaxCapas(this.org)) {
            this.proModal.onOpen();
            return;
        }

        this.setLiveLayers(liveLayers);
        this.setLiveLayerIds(liveLayerIds);

        if (this.socket) {
            this.socket.emit('layer-update', this.layerIds, this.layers);
        }

        // overwrite r2 bucket

        updateR2Bucket('/api/r2-bucket/addLayer', this.boardId, liveLayerIds, liveLayers);
    }

    undo(liveLayerIds: string[], liveLayers: Layers) {
        this.layerIds.forEach((layerId) => {
            const { [layerId]: _, ...remaining } = liveLayers;
            liveLayers = remaining;
            liveLayerIds = liveLayerIds.filter(id => id !== layerId);
        });

        this.setLiveLayers(liveLayers);
        this.setLiveLayerIds(liveLayerIds);

        if (this.socket) {
            this.socket.emit('layer-delete', this.layerIds);
        }

        //overwrite r2 bucket
        updateR2Bucket('/api/r2-bucket/deleteLayer', this.boardId, liveLayerIds, liveLayers);
    }
}

export class DeleteLayerCommand implements Command {
    constructor(private layerIds: string[],
        private prevLayers: Layers,
        private prevLayerIds: string[],
        private setLiveLayers: (layers: Layers) => void,
        private setLiveLayerIds: (layerIds: string[]) => void,
        private boardId: string,
        private socket: Socket | null) { }

    execute() {
        const remainingLayers = { ...this.prevLayers };
        const remainingLayerIds = [...this.prevLayerIds];

        this.layerIds.forEach(id => {
            if (!remainingLayers[id]) {
                // Layer doesn't exist, skip deletion
                return;
            }
            delete remainingLayers[id];
            const index = remainingLayerIds.indexOf(id);
            if (index > -1) {
                remainingLayerIds.splice(index, 1);
            }
        });

        // Call the deleteLayer API mutation to delete all the layers in the database

        if (this.socket) {
            this.socket.emit('layer-delete', this.layerIds);
        }

        this.setLiveLayers(remainingLayers);
        this.setLiveLayerIds(remainingLayerIds);

        //overwrite r2 bucket
        updateR2Bucket('/api/r2-bucket/deleteLayer', this.boardId, remainingLayerIds, remainingLayers);
    }

    undo() {
        const newLayers = { ...this.prevLayers };
        const newLayerIds = [...this.prevLayerIds];

        const layersToAdd = this.layerIds.map(id => {
            newLayers[id] = this.prevLayers[id];
            if (!newLayerIds.includes(id)) {
                newLayerIds.push(id);
            }
            return this.prevLayers[id];
        });

        // Call the addLayer API mutation to add all the layers back in the database
        updateR2Bucket('/api/r2-bucket/addLayer', this.boardId, newLayerIds, newLayers);

        if (this.socket) {
            this.socket.emit('layer-update', this.layerIds, layersToAdd);
        }

        this.setLiveLayers(newLayers);
        this.setLiveLayerIds(newLayerIds);
    }
}

export class TranslateLayersCommand implements Command {
    constructor(
        private layerIds: string[],
        private initialLayers: any,
        public finalLayers: any,
        private setLiveLayers: (layers: any) => void,
        private boardId: string,
        private socket: Socket | null) { }

    execute() {
        this.setLiveLayers({ ...this.finalLayers });

        // Prepare layer updates
        const layerUpdates = this.layerIds.map(layerId => this.finalLayers[layerId]);

        // Call the updateLayer API mutation to update the layers in the database
        updateR2Bucket('/api/r2-bucket/updateLayer', this.boardId, this.layerIds, layerUpdates);

        // Emit socket message
        if (this.socket) {
            this.socket.emit('layer-update', this.layerIds, layerUpdates);
        }
    }

    undo() {
        this.setLiveLayers({ ...this.initialLayers });

        // Prepare layer updates
        const layerUpdates = this.layerIds.map(layerId => this.initialLayers[layerId]);

        // Call the updateLayer API mutation to revert the layers in the database
        updateR2Bucket('/api/r2-bucket/updateLayer', this.boardId, this.layerIds, layerUpdates);

        // Emit socket message
        if (this.socket) {
            this.socket.emit('layer-update', this.layerIds, layerUpdates);
        }
    }
}