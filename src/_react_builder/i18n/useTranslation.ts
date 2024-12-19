import { useContext } from 'react';
import { I18nContext } from './I18nContext';

export const useTranslation = () => useContext(I18nContext);
