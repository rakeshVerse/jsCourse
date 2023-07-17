// Exporting Module
console.log('Exporting module');

// Blocking code
console.log('Start fetching users...');

// Getting Fake users from an External API
const usersFetch = await fetch('https://jsonplaceholder.typicode.com/users');
const usersJson = await usersFetch.json();
console.log(usersJson);

console.log('Finished fetching users...');
/** -> 
Start fetching users... 
Array(10) [ {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…} ]
Finished fetching users... 
*/

// Since, exported modules are executed first and Top-level Await is blocking in nature,
// it will block the execution of importing module.
// The importing module will have to wait until fetch API above returns a settled promise
// This is why, Top-level Await should be used with CAUTION.
