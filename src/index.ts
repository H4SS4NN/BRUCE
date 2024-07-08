import { Mission, Permit } from "./frame";

export const verify = (mission: Mission, permits: Permit[]): boolean => {
  permits.sort((a, b) => a.since.getTime() - b.since.getTime());
  console.log("Permits sorted by start date:", permits);

  let currentStart = mission.since;
  console.log(
    "Mission starts on:",
    currentStart,
    "and ends on:",
    mission.until
  );

  for (const permit of permits) {
    console.log("Checking permit:", permit);

    if (permit.since > currentStart) {
      console.log("Gap detected. Permit starts after current coverage ends.");
      return false;
    }

    if (permit.until >= currentStart) {
      console.log("Permit covers from", permit.since, "to", permit.until);
      currentStart = new Date(permit.until.getTime() + 86400000); // Passer au jour suivant
      console.log("Current coverage extended to:", currentStart);
    }

    if (currentStart > mission.until) {
      console.log("Mission is fully covered.");
      return true;
    }
  }

  const isCovered = currentStart > mission.until;
  if (!isCovered) {
    console.log(
      "Mission is not fully covered. Current coverage ends at:",
      currentStart
    );
  }
  return isCovered;
};
