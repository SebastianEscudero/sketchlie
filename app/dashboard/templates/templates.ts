import { PlantillaCustomerJourneyMap } from "./customer-journey-map";
import { PlantillaDiagrama } from "./diagrama";
import { PlantillaDiagramaDeFlujo } from "./diagrama-de-flujo";
import { PlantillaDiagramaIshikawa } from "./diagrama-ishikawa";
import { PlantillaLineaDeTiempo } from "./linea-de-tiempo";
import { PlantillaLluviaDeIdeas } from "./lluvia-de-ideas";
import { PlantillaLowFidelityWireframe } from "./low-fidelity-wireframe";
import { PlantillaMapaConceptual } from "./mapa-conceptual";
import { PlantillaMapaDeProceso } from "./mapa-de-proceso";
import { PlantillaMapaMental } from "./mapa-mental";


export const templates = [PlantillaMapaConceptual, PlantillaDiagramaDeFlujo, PlantillaCustomerJourneyMap,
    PlantillaMapaMental, PlantillaLluviaDeIdeas, PlantillaLowFidelityWireframe, PlantillaMapaDeProceso,
    PlantillaDiagrama, PlantillaLineaDeTiempo, PlantillaDiagramaIshikawa,
];