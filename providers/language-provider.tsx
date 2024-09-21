import React from 'react';
import { Language } from "@/types/canvas";

export const LanguageContext = React.createContext<Language>('es');

export function LanguageProvider({ children, lang }: { children: React.ReactNode, lang: Language }) {
  return (
    <LanguageContext.Provider value={lang}>
      {children}
    </LanguageContext.Provider>
  );
}