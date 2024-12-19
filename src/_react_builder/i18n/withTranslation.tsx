import React from 'react';
import { useTranslation } from './useTranslation';

export type WithTranslation = {
  t: (key: string) => string;
};

/**
 * Ce HOC permet de passer automatiquement la fonction de traduction `t` à un composant sans avoir à appeler
 * useTranslation à chaque fois.
 *
 * Le type WithTranslation est utilisé pour définir les props qui seront passées au composant.
 * Pour être utilisé, le composant doit avoir au contexte I18nContext
 *
 * @example
 * ```tsx
 * import { withTranslation } from 'chemin/vers/withTranslation';
 *
 * function Component({ t }: WithTranslation) {
 *  return <div>{t('key')}</div>;
 * }
 *
 * export const TranslatedComponent = withTranslation(Component);
 */
export function withTranslation<T>(Component: React.ComponentType<T & WithTranslation>): React.FC<T> {
  return function TranslatedComponent(props: T) {
    const { t } = useTranslation();
    return <Component {...props} t={t} />;
  };
}
