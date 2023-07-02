// 1. Get all the deposite
// 2. Convert USD to INR
// 3. Calculate total balance

const currUSD = [120, 457, -99, 487, -58, -97, 855, -9, 897];
const convertToINR = 82.01;

const balanceINR = (transac, conversionRate) =>
  transac
    .filter(amt => amt > 0)
    .map(amt => amt * conversionRate)
    .reduce((acc, amt) => acc + amt, 0);

console.log(balanceINR(currUSD, convertToINR));
