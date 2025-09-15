export function reverseArray(arr) {
  if (!Array.isArray(arr)) return [];
  return [...arr].reverse();
}

export function filterByCategory(items, category) {
  if (!Array.isArray(items)) return [];
  return items.filter(item => item.categoria === category);
}