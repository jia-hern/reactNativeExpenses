export function getFormattedDate(date) {
  // input is a Date
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  return [
    pad(date.getDate()),
    pad(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
