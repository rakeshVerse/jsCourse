// Calculate difference between two dates
const date1 = new Date(2023, 6, 26);
const date2 = new Date(2023, 6, 25);

const calcDaysPassed = (date1, date2) =>
  Math.round(Math.abs((date1 - date2) / 86400000));

console.log(calcDaysPassed(date2, date1));
