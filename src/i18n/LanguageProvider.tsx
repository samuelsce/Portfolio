import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { en, pt } from "./translations";
import type { Translation } from "./translations";

type Language = "pt" | "en";
const storageKey = "samuel-studio-language";
export const languageChangeEvent = "portfolio:languagechange";
const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
} | null>(null);

function initialLanguage(): Language {
  try {
    return localStorage.getItem(storageKey) === "en" ? "en" : "pt";
  } catch {
    return "pt";
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const selectedLanguage = useRef(language);
  const t = language === "pt" ? pt : en;
  const changeLanguage = useCallback((next: Language) => {
    if (next === selectedLanguage.current) return;
    selectedLanguage.current = next;
    setLanguage(next);
    window.dispatchEvent(new Event(languageChangeEvent));
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    document.title = t.title;
    for (const [selector, content] of [
      ['meta[name="description"]', t.metaDescription],
      ['meta[property="og:title"]', t.ogTitle],
      ['meta[property="og:description"]', t.ogDescription],
      ['meta[property="og:locale"]', language === "pt" ? "pt_BR" : "en_US"],
    ]) {
      document.querySelector(selector)?.setAttribute("content", content);
    }
    try {
      localStorage.setItem(storageKey, language);
    } catch {
      // The switch still works when the browser disallows persistent storage.
    }
  }, [language, t]);

  const value = useMemo(
    () => ({ language, setLanguage: changeLanguage, t }),
    [language, changeLanguage, t],
  );
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage requires LanguageProvider");
  return context;
}

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div className="language-switcher" role="group" aria-label={t.language}>
      <button
        type="button"
        lang="pt-BR"
        title="Português"
        aria-label="Português"
        aria-pressed={language === "pt"}
        onClick={() => setLanguage("pt")}
      >
        PT
      </button>
      <button
        type="button"
        lang="en"
        title="English"
        aria-label="English"
        aria-pressed={language === "en"}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}
