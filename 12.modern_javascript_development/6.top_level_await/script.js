// Importing Module
import './shoppingCart.js';
console.log('Importing module');

// TOP-LEVEL AWAIT (ES2022)
// ES2022 has introduced Top-level Await. Meaning, we can use Await without Async function,
// only in Modules as it doesn't work in normal scripts.

// EXAMPLE I. Blocking behaviour of Await without Async Function

// Since, we are using Await without Async function, it will block the execution of statements written after Await.
// So, all the statements below will execute in sequential way one by one.

console.log('Start fetching posts...');

// Getting Fake posts from an External API
const postsFetch = await fetch('https://jsonplaceholder.typicode.com/posts');
const postsJson = await postsFetch.json();
console.log(postsJson);

console.log('Finished fetching posts...');
/** -> 
Start fetching... 
Array(100) [ {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, … ]
script.js:17:9
Finished fetching... 
*/

// EXAMPLE II. Cosuming Async function using Top-level Await
const getLastPost = async function () {
  const postsFetch = await fetch('https://jsonplaceholder.typicode.com/posts');
  const lastPostJson = (await postsFetch.json()).at(-1);
  return { title: lastPostJson.title, body: lastPostJson.body };
};

// Since, Async functions return a Promise, we have to consume it by chaining .then()
// getLastPost().then(post => console.log(post));

// Alternatively, we can use Top-level Await instead of promise chaining, for clean code
const lastPost = await getLastPost();
console.log(lastPost);
