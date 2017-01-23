export function getMode(match: any): string {
  if (match.map === 'midwars') {
    return 'Mid Wars';
  }
  if (match.map === 'riftwars') {
    return 'Rift Wars';
  }
  if (match.map === 'devowars') {
    return 'Devo Wars';
  }
  if (match.map === 'capturetheflag') {
    return 'Capture the Flag';
  }
  if (match.setup.alt_pick + match.setup.nl + match.setup.officl === 3) {
    // season
    // TODO: get season # by date
    return 'Season 1';
  }
  if (match.setup.nl + match.setup.officl === 2) {
    // season
    // TODO: get season # by date
    return 'Ranked';
  }
  return 'Unknown';
}

export function getSkillBracket(averageScore: number) {
  if (averageScore >= 31) {
    return 'Very High Skill';
  }
  if (averageScore >= 28) {
    return 'High Skill';
  }
  return 'Normal Skill';
}

export function getQuality(quailty: number) {
  if (quailty >= .7) {
    return 'Very High';
  }
  if (quailty >= .6) {
    return 'High';
  }
  return 'Normal';
}
