export function percentDifference(a, b) {
  // Return percentage difference between a and b, rounded to 2 decimals
  if (typeof a !== 'number' || typeof b !== 'number') return 0;
  const diff = 100 * Math.abs((a - b) / ((a + b) / 2));
  return Number(diff.toFixed(2));
}

export function capitalize(str) {
  if (!str) return '';
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}