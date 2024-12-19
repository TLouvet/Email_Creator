import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { I18nContext } from './I18nContext';
import { getLocale, getValueFromTranslationData, isAcceptedLocale } from '../../_i18n/utils';

type I18nProviderProps = PropsWithChildren<{
  defaultLang?: string;
}>;

function getCurrentLocaleData(locale: string) {
  if (!locale) {
    return Promise.resolve({});
  }

  return import(`../../_i18n/locales/${locale}.json`).then((module) => module.default);
}

/**
 * Provider to handle the locale of the app
 * Uses local storage to store the locale
 */
export function I18nProvider({ children, defaultLang = 'en' }: I18nProviderProps) {
  const [locale, setLocale] = useState<string>(() => getLocale(defaultLang));
  const [data, setData] = useState<Record<string, string>>({});

  function onLocaleChange(locale: string) {
    if (!isAcceptedLocale(locale)) {
      return;
    }

    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale;
    setLocale(locale);
  }

  useEffect(() => {
    getCurrentLocaleData(locale).then((data) => {
      setData(data);
    });
  }, [locale]);

  const t = useCallback((key: string): string => getValueFromTranslationData(data, key), [data]);

  const initialValues = useMemo(() => ({ locale, onLocaleChange, t }), [locale, t]);

  return <I18nContext.Provider value={initialValues}>{children}</I18nContext.Provider>;
}
