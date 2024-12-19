import { v4 } from 'uuid';

/**
 * Chaque bloc doit avoir un identifiant unique pour permettre les interactions.
 * uuid fournit un identifiant dont les probabilités de collision sont suffisamment faibles pour être négligeables.
 *
 * Même si un email peut grossir en taille, il est peu probable qu'on dépasse les 1000 identifiants.
 * Pour cette raison on ne prend pas la peine de vérifier si l'identifiant existe déjà et on balance une chaine brute.
 */
export function generateID() {
  return v4();
}
