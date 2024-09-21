import { Language } from '@/types/canvas';
import { BlogStructure } from './blog-structure';
import landingHeroTranslations from '@/public/locales/landing-hero';

export const LandingHero = ({ lang }: { lang: Language }) => {
    // Add a fallback language in case the provided lang doesn't exist
    const fallbackLang: Language = 'en';
    const translations = landingHeroTranslations[lang] || landingHeroTranslations[fallbackLang];

    const { title, description, cta } = translations;

    return (
        <BlogStructure 
            title={title}
            description={description}
            cta={cta}
            img="/placeholders/modelo-canvas.png"
            alt="Modelo Canvas"
        />
    )
}