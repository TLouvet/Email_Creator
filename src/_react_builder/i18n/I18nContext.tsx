import { createContext } from 'react';

type I18nContextType = {
  locale: string;
  onLocaleChange: (locale: string) => void;
  t: (key: string) => string;
};

export const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  onLocaleChange: () => {},
  t: (key: string) => key,
});
