export const parseDate = (str) => {
  if (!str) return null;
  const datePart = str.split(" / ")[0];
  const [day, month, year] = datePart.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const isSameDay = (date1, date2) => {
  return (
        date1.getDate() === date2.getDate() &&
		    date1.getMonth() === date2.getMonth() &&
		    date1.getFullYear() === date2.getFullYear()
  )};

export const sortedEventsRecentlyToOldest = (events) => { 
  events.sort((a, b) => parseDate(b.date) - parseDate(a.date)); 
  return events;
}