"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Locale, t as translate, TranslationKey } from "./i18n";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const STORAGE_KEY = "viral-locale";

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";

  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored === "en" || stored === "ru") return stored;

  // Auto-detect from browser
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith("ru") ? "ru" : "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(detectInitialLocale());
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newLocale);
    }
  };

  const t = (key: TranslationKey) => translate(locale, key);

  // Avoid hydration mismatch — render with default locale until mounted
  if (!mounted) {
    return (
      <LocaleContext.Provider value={{ locale: "en", setLocale, t: (k) => translate("en", k) }}>
        {children}
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
