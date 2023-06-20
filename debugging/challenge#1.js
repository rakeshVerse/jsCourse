/**
 * Create a function which take an array as parameter and returns a string
 */

const printForecast = (array) => {
  let forecast = `...`;
  for (let i = 0; i < array.length; i++) {
    forecast = `${forecast} ${array[i]}C in ${i + 1} Days ...`;
  }

  return forecast;
};

console.log(printForecast([17, 21, 23]));
console.log(printForecast([12, 5, -5, 0, 4]));
