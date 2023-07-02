/**
 * Nullish operator (??) only considers null and undefined as falsy. Empty string and 0 as are considered truthy.
 */

const dishes = 0;

// OR - 0 is falsy
console.log(dishes || 45); // -> 45

// Null coalescing -0 is truthy
console.log(dishes ?? 45); // -> 0
