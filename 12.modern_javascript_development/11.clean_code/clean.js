'use strict';

// CLEAN CODE
// Using Modern JS Guidelines and Declarative paradigm (Functional Code)

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// Note: Object.freeze() only freezes first level of the Object.
// It's not a Deep Freeze. So, we can still mutate Objects inside of the Object.
// E.g.:
// budget[0].value = 10; // Works
// budget[8] = { value: 200 }; // Error

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const getLimit = (user, limits) => limits?.[user] ?? 0;

// Pure Function
// prettier-ignore
const addExpense = function (state, limits, value, description, user = 'jonas') {
  const cleanUser = user.toLowerCase();
  return value <= getLimit(cleanUser, limits)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
// prettier-ignore
const newBudget2 = addExpense(newBudget1, spendingLimits, 100, 'Going to movies 🍿', 'Matilda');
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

// Pure Function
// prettier-ignore
const checkExpenses = (state, limits) =>
  state.map(entry => entry.value < -getLimit(entry.user, limits) ? {...entry, flag: 'limit'} : entry);
const finalBudget = checkExpenses(newBudget3, spendingLimits);

const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  // .reduce((str, curr) => `  ${str} / ${curr.description.slice(-2)}`, '');

  console.log(bigExpenses);
};
logBigExpenses(finalBudget, 1000);
