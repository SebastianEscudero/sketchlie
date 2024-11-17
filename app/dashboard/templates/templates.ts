import { Layers } from "@/types/canvas";
import { PlantillaCustomerJourneyMap } from "./customer-journey-map";
import { PlantillaDiagrama } from "./diagrama";
import { PlantillaDiagramaDeFlujo } from "./diagrama-de-flujo";
import { PlantillaDiagramaDeVenn } from "./diagrama-de-venn";
import { PlantillaDiagramaIshikawa } from "./diagrama-ishikawa";
import { PlantillaLineaDeTiempo } from "./linea-de-tiempo";
import { PlantillaLluviaDeIdeas } from "./lluvia-de-ideas";
import { PlantillaLowFidelityWireframe } from "./low-fidelity-wireframe";
import { PlantillaMapaConceptual } from "./mapa-conceptual";
import { PlantillaMapaDeProceso } from "./mapa-de-proceso";
import { PlantillaMapaMental } from "./mapa-mental";
import { PlantillaModeloCanvas } from "./modelo-canvas";

interface Template {
    name: string;
    image: string;
    layerIds: string[];
    layers: Layers;
}

export const templates: Template[] = [
    PlantillaMapaConceptual,
    PlantillaDiagramaDeFlujo,
    PlantillaModeloCanvas,
    PlantillaCustomerJourneyMap,
    PlantillaLluviaDeIdeas,
    PlantillaDiagramaDeVenn,
    PlantillaLowFidelityWireframe,
    PlantillaMapaDeProceso,
    PlantillaDiagrama, 
    PlantillaLineaDeTiempo, 
    PlantillaMapaMental, 
    PlantillaDiagramaIshikawa,
];