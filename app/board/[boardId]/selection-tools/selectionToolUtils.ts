import { Roboto, Lobster, Pacifico, Permanent_Marker, Comfortaa, Bangers, Kalam, Dancing_Script, Shadows_Into_Light, Indie_Flower, Architects_Daughter } from "next/font/google";

export const getSelectorPositionClass = (expandUp: boolean) => {
    return expandUp ? 'bottom-[100%] mb-2' : 'top-[100%] mt-2';
}

// Default font is Kalam 
export const defaultFont = Roboto({ subsets: ['latin'], weight: ['400'] });

const kalamFont = Kalam({ subsets: ['latin'], weight: ['400'] });
const roboto = Roboto({ subsets: ['latin'], weight: ['400'] });
const lobster = Lobster({ subsets: ['latin'], weight: ['400'] });
const pacifico = Pacifico({ subsets: ['latin'], weight: ['400'] });
const permanentMarker = Permanent_Marker({ subsets: ['latin'], weight: ['400'] });
const comfortaa = Comfortaa({ subsets: ['latin'], weight: ['400'] });
const bangers = Bangers({ subsets: ['latin'], weight: ['400'] });
const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400'] });
const shadowsIntoLight = Shadows_Into_Light({ subsets: ['latin'], weight: ['400'] });
const indieFlower = Indie_Flower({ subsets: ['latin'], weight: ['400'] });
const architectsDaughter = Architects_Daughter({ subsets: ['latin'], weight: ['400'] });

export const DEFAULT_FONT = defaultFont.style.fontFamily;

export const standardFonts = [
    { value: 'Arial', label: 'Arial' },
    { value: roboto.style.fontFamily, label: 'Roboto' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Courier New', label: 'Courier New' },
];

export const exoticFonts = [
    { value: kalamFont.style.fontFamily, label: 'Kalam' },
    { value: lobster.style.fontFamily, label: 'Lobster' },
    { value: pacifico.style.fontFamily, label: 'Pacifico' },
    { value: permanentMarker.style.fontFamily, label: 'Permanent Marker' },
    { value: comfortaa.style.fontFamily, label: 'Comfortaa' },
    { value: bangers.style.fontFamily, label: 'Bangers' },
    { value: dancingScript.style.fontFamily, label: 'Dancing Script' },
    { value: shadowsIntoLight.style.fontFamily, label: 'Shadows Into Light' },
    { value: indieFlower.style.fontFamily, label: 'Indie Flower' },
    { value: architectsDaughter.style.fontFamily, label: 'Architects Daughter' },
];

export const fontFamilies = [...standardFonts, ...exoticFonts];