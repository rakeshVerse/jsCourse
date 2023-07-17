// CommonJS is 3rd party Module System
// CommonJS is mainly used in server-side JS apps with Node, as browsers don't support the use of CommonJS.
// Node used to only support CommonJS to implement modules,
// but nowadays it also supports ESmodules which is a more modern approach.

// Importing Module
const { area } = require('./circle.js');
console.log(`The area of a circle of radius 4 is ${area(4).toFixed(1)}`); // -> The area of a circle of radius 4 is 50.3
