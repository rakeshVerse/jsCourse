/**
Use the BMI example from Challenge #1, and the code you already wrote, and
improve it.

Your tasks:
1. Print a nice output to the console, saying who has the higher BMI. The message
is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's
BMI (28.3) is higher than John's (23.9)!"
 */

// Mass
const markMassInKg = 95;
const JohnMassInKg = 85;

// Height
const markHeightInMeter = 1.88;
const johnHeightInMeter = 1.76;

// calculate bmi = mass / height ** 2 = mass / height * height
const markBMI = markMassInKg / markHeightInMeter ** 2;
const johnBMI = JohnMassInKg / johnHeightInMeter ** 2;

const markHigherBMI = markBMI > johnBMI;

if (markHigherBMI) {
  console.log(`Mark's BMI (${markBMI}) is heigher than John's (${johnBMI})`);
} else {
  console.log(`John's BMI (${johnBMI}) is heigher than Mark's (${markBMI})`);
}
