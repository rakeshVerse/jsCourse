// Numbers are represented as Float/Decimal in JS
console.log(24 === 24.0); // -> true

// Nubers are stored in 64 BIT Binary format (base 2)
// And this might yield unexpected output
console.log(0.1 + 0.2); // -> 0.30000000000000004

// CONVERTING

// String to Number
console.log(Number('20')); // -> 20
console.log(+'20'); // -> 20

// Parsing
console.log(Number.parseInt('20', 10)); // -> 20
console.log(Number.parseInt('20px', 10)); // -> 20
console.log(Number.parseInt('er20', 10)); // -> NaN
console.log(Number.parseInt('20.5rem', 10)); // -> 20
console.log(Number.parseFloat('20.5rem')); // -> 20.5

// CHECKING
console.log(Number.isNaN(20)); // -> false
console.log(Number.isNaN('20')); // -> false
console.log(Number.isNaN(+'20')); // -> false
console.log(Number.isNaN(28 / 0)); // -> false

console.log(Number.isFinite(20)); // -> true
console.log(Number.isFinite('20')); // -> false
console.log(Number.isFinite(+'20')); // -> true
console.log(Number.isFinite(28 / 0)); // -> false

console.log(Number.isInteger(20)); // -> true
console.log(Number.isInteger('20')); // -> false
console.log(Number.isInteger(+'20')); // -> true
console.log(Number.isInteger(28 / 0)); // -> false
