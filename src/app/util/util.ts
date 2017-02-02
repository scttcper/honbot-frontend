import { Pipe, PipeTransform } from '@angular/core';

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
    // seasons
    if (match.version > '4.0.1.4') {
      return 'Season 2';
    }
    // "4.0.0.1", "4.0.0.2", "4.0.0.3", "4.0.1.3", "4.0.1.4"
    return 'Season 1';
  }
  if (match.setup.nl + match.setup.officl === 2) {
    // season
    // TODO: get season # by date
    return 'Ranked';
  }
  return 'Unknown';
}

@Pipe({ name: 'matchMode' })
export class MatchModePipe implements PipeTransform {
  transform(match: any) {
    if (!match || !match.setup || !match.map) {
      return '';
    }
    return getMode(match);
  }
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

@Pipe({ name: 'skillBracket' })
export class SkillBracketPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) {
      return '';
    }
    return getSkillBracket(value);
  }
}

export function getQuality(quailty: number) {
  if (quailty >= .7) {
    return 'Very High';
  }
  if (quailty >= .6) {
    return 'High';
  }
  if (quailty >= .5) {
    return 'Normal';
  }
  return 'Low';
}
