const years = [1991, 1980, 1995, 2000, 2005];

const calcAge = (birthYear) => 2037 - birthYear;

const age = [];
for (let i = 0; i < years.length; i++) {
  // console.log(calcAge(years[i]));
  // age.push(calcAge(years[i]));
  age[i] = calcAge(years[i]);
}

console.log(age);
