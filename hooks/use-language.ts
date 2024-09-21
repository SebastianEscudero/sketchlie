import { Language } from "@/types/canvas";
import { usePathname } from "next/navigation";

export function getLanguageFromPath(pathname: string): Language {
    const segments = pathname.split('/');
    const languageCode = segments[1] || 'es';
    
    switch (languageCode) {
        case 'en':
            return 'en';
        case 'pt':
            return 'pt';
        default:
            return 'es'; // Default to Spanish if not English or Portuguese
    }
}

export function UseLanguage(): Language {
    const pathname = usePathname();
    return getLanguageFromPath(pathname);
}

export function getLanguageClient(): Language {
    return getLanguageFromPath(window.location.pathname);
}