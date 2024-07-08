import { Mission, Permit } from "./frame";

/**
 * Vérifie si les titres de séjour d'un candidat couvrent bien l'ensemble de la période d'un contrat.
 *
 * @param mission - Un objet représentant une mission avec des dates de début (since) et de fin (until).
 * @param permits - Un tableau de titres de séjour, chacun ayant des dates de début (since) et de fin (until).
 * @returns boolean - Retourne true si la période de la mission est couverte par les titres de séjour, false sinon.
 */
export const verify = (mission: Mission, permits: Permit[]): boolean => {
  // Trier les permis par date de début
  permits.sort((a, b) => a.since.getTime() - b.since.getTime());
  console.log("Permits sorted by start date:", permits);

  // Initialiser les variables pour suivre la couverture
  let currentStart = mission.since;
  console.log(
    "Mission starts on:",
    currentStart,
    "and ends on:",
    mission.until
  );

  for (const permit of permits) {
    console.log("Checking permit:", permit);

    // Si le permis commence après la date de début actuelle de la mission, il y a une interruption
    if (permit.since > currentStart) {
      console.log("Gap detected. Permit starts after current coverage ends.");
      return false;
    }

    // Si le permis couvre une partie de la mission, mettre à jour la date de début actuelle
    if (permit.until >= currentStart) {
      console.log("Permit covers from", permit.since, "to", permit.until);
      currentStart = new Date(permit.until.getTime() + 86400000); // Passer au jour suivant
      console.log("Current coverage extended to:", currentStart);
    }

    // Si la date actuelle dépasse ou atteint la fin de la mission, la mission est couverte
    if (currentStart > mission.until) {
      console.log("Mission is fully covered.");
      return true;
    }
  }

  // Si la boucle se termine sans couvrir la mission, retourner false
  const isCovered = currentStart > mission.until;
  if (!isCovered) {
    console.log(
      "Mission is not fully covered. Current coverage ends at:",
      currentStart
    );
  }
  return isCovered;
};
