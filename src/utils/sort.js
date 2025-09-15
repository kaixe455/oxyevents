export function reverseArray(arr) {
  if (!Array.isArray(arr)) return [];
  return [...arr].reverse();
}