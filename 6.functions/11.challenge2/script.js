/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

*/

'use strict';
(function () {
  const heading = document.querySelector('h1');
  heading.style.color = 'red';

  document.body.addEventListener('click', function () {
    heading.style.color = 'green';
  });
})();
