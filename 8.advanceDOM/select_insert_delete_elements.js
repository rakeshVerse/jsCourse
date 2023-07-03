/**
 * Select, Insert & Delete elements
 */

// SELECTING ELEMENTS
console.log(document.documentElement); // selects entire document
console.log(document.head);
console.log(document.body);

// 1. querySelector - select elements using id, calss, or element name.

// selects 1 element, in case of class it selects the 1st element
const header = document.querySelector('.heading');

// selects multiple elements that has similar classes or name. It returns an array like
// Node List that contians all the elements selected by querySelectorAll
// We can then loop over the Node List to access each item just like arrays
const allSections = document.querySelectorAll('.feature-section');
console.log(allSections);

document.getElementById('section--1'); // selects element by specified ID

// selects all element by specified tag name
// unlike querySelectorAll it returns HTMLCollection object
const allButtons = document.getElementsByTagName('button'); // selects all buttons
console.log(allButtons);

// selects al the elements that shares specified class name
// it also returns an HTMLCollection object
console.log(document.getElementsByClassName('btn')); // selects all the buttons

// CREATING AND INSERTING ELEMENTS
const message = document.createElement('div'); // creates a div element
message.classList.add('cookie-message'); // adds css class

// insert
document
  .querySelector('.sub-txt')
  .insertAdjacentHTML('afterbegin', `<h2>This is a sub heading</h2>`);

// message.textContent =
//   'We use cookied for improved functionality and analytics.';

message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// inserts at the top inside the element
// e.g. < h1 > <div class='cookie-message'></div> Heading</ >
// header.prepend(message);

// inserts at the bottom inside the element
// header.append(message); // inserts after header text

// there will be only 1 'message' on the page
// To have duplicate 'message' we need to create its clone
// header.append(message.cloneNode(true)); // creates clone of element 'message' & appends it

// header.before(message); // adds element before header e.g. <div class='cookie-message'></div> < h1 > Heading</ >
header.after(message); // adds element after header

// DELETE ELEMENTS
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove(); // new method - directly remove element
    // message.parentElement.removeChild(message); // old way - traverse to parent then remove child
  });

// ///////////////////////////////////////////////////////

/**
 * Manipulating Styles, Attribues & Classes
 */

// STYLE

// Adding styles dynamically (inline)
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// Reading styles
// reading dynamically added styles
console.log(message.style.backgroundColor);
console.log(message.style.width);

// reading static styles
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

// read existing height to set new height
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// manupulate css root variables
// Syntax: document.documentElement.style.setProperty(variable, value);
document.documentElement.style.setProperty('--color-primary', 'orangered');

// ATTRIBUTES

const img = document.querySelector('.head-img');

// Read/Get attributes
console.log(img.alt); // -> grow
console.log(img.className); // -> head-img

// Add/change attribute
img.alt = 'Beautiful Plant';

// Reading Non-standard
console.log(img.designer); // doesn't work
console.log(img.getAttribute('designer')); // rr

console.log(img.src); // returns absolute path -> http://127.0.0.1:8080/grow.jpg
console.log(img.getAttribute('src')); // returns value of src -> grow.jpg

const link = document.querySelector('.link');
console.log(link.href); // returns absolute path -> http://127.0.0.1:8080/grow.jpg
console.log(link.getAttribute('href')); // returns value of href -> grow.jpg

// Setting attributes
img.setAttribute('company', 'Banker');

// Data attributes
console.log(img.dataset.versionNumber);

// CLASSES

// add class
img.className = 'greenplant'; // adds specified class by overwriting all the existing classes
img.classList.add('class1', 'class2'); // append new class comma sepreated
img.classList.remove('class1', 'class2'); // remove classes comma sepreated
img.classList.toggle('class1'); // add class if not exist, remove if exist
console.log(img.classList.contains('class1')); // check if element contains specified class, returns true/false

// //////////////////////////////////
