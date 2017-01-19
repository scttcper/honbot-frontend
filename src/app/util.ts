export function isSeason(match: any) {
  // 'setup.alt_pick': 1
  // 'setup.nl': 1
  // 'setup.officl': 1
  return match.setup.alt_pick + match.setup.nl + match.setup.officl === 3;
}
