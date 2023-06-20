/**
 * Debug using browser debugger
 *
 * Convert temperature from Celsius to Kelvin
 * Formula = 0°C + 273 = 273 K
 */

const celsiusToKelvin = () => {
  const mesurement = {
    type: `temperature`,
    unit: `celsius`,
    value: prompt(`Please enter temperature in Celsius`),
  };

  debugger;
  // return mesurement.value + 273; // runtime error cause adding stirng to number will concatinate the numbers instead of adding
  return Number(mesurement.value) + 273;
};

console.log(`${celsiusToKelvin()} K`);
