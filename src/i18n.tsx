import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import pt from "./i18n/pt.json";
import en from "./i18n/en.json";
import { langFromPath, type Lang } from "./lib/routes";

const dictionaries = { pt, en } as const;
export type MessageKey = keyof typeof pt;

type I18nValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

const detectLang = (): Lang => {
  if (typeof window === "undefined") return "pt";
  const initial = (window as Window & { __INITIAL_LANG__?: string }).__INITIAL_LANG__;
  if (initial === "pt" || initial === "en") return initial;
  return langFromPath(window.location.pathname);
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem("lang", next);
    } catch {
      /* ignore storage failures */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang,
      t: (key: string) =>
        (dictionaries[lang] as Record<string, string>)[key] ||
        (dictionaries.pt as Record<string, string>)[key] ||
        key,
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used within I18nProvider");
  return value;
};
