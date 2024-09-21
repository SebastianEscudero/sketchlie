import { Metadata } from 'next';
import { LandingContent } from "@/components/landing-content";
import { LandingHero } from "@/components/landing-hero";

type LanguageMetadata = {
  [key: string]: Metadata
}

const metadataByLanguage: LanguageMetadata = {
  en: {
    title: "The Collaborative Workspace | Sketchlie",
    description: "Transform your ideas into reality with Sketchlie, the ultimate collaborative platform for teams to design, innovate, and build the future together.",
    keywords: ['sketchlie', 'collaboration', 'workspace', 'design', 'innovation', 'teamwork', 'productivity'],
  },
  es: {
    title: "El Espacio de Trabajo para Colaborar | Sketchlie",
    description: "Transforma tus ideas en realidad con Sketchlie, la plataforma colaborativa definitiva para que los equipos diseñen, innoven y construyan el futuro juntos.",
    keywords: ['sketchlie', 'colaboración', 'espacio de trabajo', 'diseño', 'innovación', 'trabajo en equipo', 'productividad'],
  },
  pt: {
    title: "O Espaço de Trabalho Colaborativo | Sketchlie",
    description: "Transforme suas ideias em realidade com o Sketchlie, a plataforma colaborativa definitiva para equipes projetarem, inovarem e construírem o futuro juntas.",
    keywords: ['sketchlie', 'colaboração', 'espaço de trabalho', 'design', 'inovação', 'trabalho em equipe', 'produtividade'],
  },
};

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as keyof typeof metadataByLanguage;
  return metadataByLanguage[lang] || metadataByLanguage['es']; // Fallback to English if language not found
}

const LandingPage = ({ params }: { params: { lang: string } }) => {
    const lang = params.lang;

    return (
        <div>
            <LandingHero lang={lang} />
            <LandingContent lang={lang} />
        </div>
    );
}

export default LandingPage;