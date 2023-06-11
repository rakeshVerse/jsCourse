// Task - Calculate and compare bmi of Mark and John

// Mass
const markMassInKg = 95;
const JohnMassInKg = 85;

// Height
const markHeightInMeter = 1.88;
const johnHeightInMeter = 1.76;

// calculate bmi = mass / height ** 2 = mass / height * height
const markBMI = markMassInKg / markHeightInMeter ** 2;
const johnBMI = JohnMassInKg / johnHeightInMeter ** 2;
console.log(markBMI, johnBMI);

const markHigherBMI = markBMI > johnBMI;
console.log(markHigherBMI);
