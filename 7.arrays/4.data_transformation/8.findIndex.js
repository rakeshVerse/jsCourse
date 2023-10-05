/**
 * findIndex() returns the index of array element that satisfies given condition
 *
 * It loops over the array and calls a Callback function for each element
 *
 * It is similar to indexOf(). The difference is, in indexOf(element) we have to pass element as attribute
 * While in findIndex(), we pass a Callback that checks for given condition
 *
 * Syntax: array.findIndex(function(item, index){})
 */

const nums = [23, 3, -3, 0, -7];

const index = nums.findIndex(num => num < 0);
console.log(index);
