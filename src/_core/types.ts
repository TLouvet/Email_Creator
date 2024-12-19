export interface Data<T> {
  data: T;
}

export interface WithLabel {
  label: string;
}

export type SelectOption = Readonly<{
  label: string;
  value: string;
}>;

/**
 * Dans l'éditeur de l'application, l'utilisateur peut choisir entre deux vues pour ses blocs de contenu.
 * Soit ceux qui sont disponibles par défaut, soit ceux qu'il a personnalisés.
 */
export enum BlockSelectionViewType {
  DEFAULT = 'DEFAULT',
  CUSTOM = 'CUSTOM',
}

export enum MailDisplayType {
  DESKTOP = 'DESKTOP',
  MOBILE = 'MOBILE',
}

/**
 * Valeurs conseillées pour la taille de l'email en fonction de l'appareil sur lequel il est consulté.
 * Certains emails peuvent aller jusqu'à 640px mais 600px semble être un consensus plus répandu.
 */
export enum MailDisplaySize {
  DESKTOP = 600,
  MOBILE = 320,
}
