import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from '../../locales/en.json';
import ru from '../../locales/ru.json';
import es from '../../locales/es.json';

export type Lang = 'en' | 'ru' | 'es';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  get: <T = any>(key: string) => T | undefined;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'gtn-site-lang';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // По умолчанию используем русский, если ничего не сохранено и нет явного параметра
  const [lang, setLangState] = useState<Lang>('ru');
  const bundles = useMemo(() => ({ en, ru, es }) as const, []);

  useEffect(() => {
    // 1) Параметр URL имеет наивысший приоритет и сохраняется
    try {
      const url = new URL(window.location.href);
      const qp = url.searchParams.get('lang');
      if (qp && (qp === 'en' || qp === 'ru' || qp === 'es')) {
        setLangState(qp);
        try { localStorage.setItem(STORAGE_KEY, qp); } catch {}
        return;
      }
    } catch {}

    // 2) Сохраненный выбор из localStorage
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved && (saved === 'en' || saved === 'ru' || saved === 'es')) {
        setLangState(saved);
        return;
      }
    } catch {}

    // 3) Fallback: язык браузера
    const nlang = (navigator?.language || 'ru').toLowerCase();
    if (nlang.startsWith('ru')) setLangState('ru');
    else if (nlang.startsWith('es')) setLangState('es');
    else setLangState('en');
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  };

  const getValue = (obj: any, path: string): any => {
    return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
  };

  const get = useMemo(() => {
    return <T = any>(key: string): T | undefined => {
      const dict = (bundles as any)[lang] || (bundles as any).en;
      const val = getValue(dict, key);
      if (val !== undefined) return val as T;
      const fallback = getValue((bundles as any).en, key);
      return fallback as T | undefined;
    };
  }, [lang, bundles]);

  const t = useMemo(() => {
    return (key: string) => {
      const val = get<string>(key);
      return (typeof val === 'string' ? val : undefined) ?? key;
    };
  }, [get]);

  const value = useMemo(() => ({ lang, setLang, t, get }), [lang, t, get]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
