import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type Language = 'pt' | 'en';
const storageKey = 'samuel-studio-language';
const metadata = {
  pt: {
    language: 'Idioma do site',
    description: 'Samuel Santos: Segurança da Informação, desenvolvimento web e projetos. Experiência com o SaaS BarberAg, laboratório Sentinel e formação em segurança em andamento.',
    title: 'Samuel Santos | Segurança da Informação e Desenvolvimento',
    summary: 'Projetos, experiência em desenvolvimento web e prática em Segurança da Informação de Samuel Santos.',
  },
  en: {
    language: 'Site language',
    description: 'Samuel Santos: Information Security, web development and projects. Experience with BarberAg SaaS, the Sentinel lab and ongoing security training.',
    title: 'Samuel Santos | Information Security and Development',
    summary: 'Projects, web development experience and Information Security practice by Samuel Santos.',
  },
} as const;
const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void } | null>(null);

function initialLanguage(): Language {
  try { return localStorage.getItem(storageKey) === 'en' ? 'en' : 'pt'; }
  catch { return 'pt'; }
}

/** Keep the active site independent from the archived portfolio's translations. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const changeLanguage = useCallback((next: Language) => setLanguage(next), []);

  useEffect(() => {
    const text = metadata[language];
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    document.title = 'Samuel Santos';
    for (const [selector, value] of [
      ['meta[name="description"]', text.description],
      ['meta[property="og:title"]', text.title],
      ['meta[property="og:description"]', text.summary],
      ['meta[property="og:locale"]', language === 'pt' ? 'pt_BR' : 'en_US'],
    ]) document.querySelector(selector)?.setAttribute('content', value);
    try { localStorage.setItem(storageKey, language); } catch { /* Language still works in memory. */ }
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage: changeLanguage }), [language, changeLanguage]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage requires LanguageProvider');
  return context;
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  return <div className="language-switcher" role="group" aria-label={metadata[language].language}>
    <button type="button" lang="pt-BR" title="Português" aria-label="Português" aria-pressed={language === 'pt'} onClick={() => setLanguage('pt')}>PT</button>
    <button type="button" lang="en" title="English" aria-label="English" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
  </div>;
}
