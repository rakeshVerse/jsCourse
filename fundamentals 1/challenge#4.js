/* Calculate total bill after adding tip */

const bill = 430;
// 15% tip if bill is between 50 to 300, else 20% tip
const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

console.log(
  `The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`
);
