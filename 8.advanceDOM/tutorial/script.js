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
// img.className = 'greenplant'; // adds specified class by overwriting all the existing classes. Don't use it
img.classList.add('class1', 'class2'); // append new class comma sepreated
img.classList.remove('class1', 'class2'); // remove classes comma sepreated
img.classList.toggle('class1'); // add class if not exist, remove if exist
console.log(img.classList.contains('class1')); // check if element contains specified class, returns true/false

// //////////////////////////////////

/**
 * SCROLL
 */

// getBoundingClientRect()
// eturns the size and position of an element relative to the viewport (the visible area of a web page).
// It provides information about the element's dimensions (width and height) and its position (top, right, bottom, and left)
// with respect to the top - left corner of the viewport.
const rect = img.getBoundingClientRect();
console.log(rect);
console.log(rect.width); // Width of the element
console.log(rect.height); // Height of the element
console.log(rect.top); // Distance from the top edge of the viewport to the top edge of the element
console.log(rect.right); // Distance from the left edge of the viewport to the right edge of the element
console.log(rect.bottom); // Distance from the top edge of the viewport to the bottom edge of the element
console.log(rect.left); // Distance from the left edge of the viewport to the left edge of the element

// Get how much pixels have been scrolled
// scroll from left to right - window.scrollX
// scroll from top to bottom - window.scrollY

// Get current x & y scroll
// window.addEventListener('scroll', () => {
//   const x = window.scrollX;
//   const y = window.scrollY;
//   console.log({ x, y });
// });

// How to Scroll to specific section?

// Old way:
//  - Get position of element where you want to scroll to using getBoundingClientRect()
//  - Get scroll coordinates
//  - Use scrollTo() on window object -
//  - window.scrollTo(left-position + left-scroll, top-position + top-scroll)
//  - For smooth scroll: window.scrollTo({left: left + left-scroll, top: top + top-scroll, behavior: 'smooth'})

// New way:
// No need to calculate coordinates just use scrollIntoView() on element where you want to scroll to
// element.scrollIntoView({ behavior: 'smooth' })
// Scroll to feature
const featureSec = document.querySelectorAll('.sec-head')[0];
allButtons[1].addEventListener('click', function (e) {
  // old way
  // const secRect = featureSec.getBoundingClientRect();
  // console.log(`Before scroll: x-${window.scrollX}, y-${window.scrollY}`);
  // console.log(`left: ${secRect.left}, top: ${secRect.top}`);

  // // window.scrollTo(secRect.left + window.scrollX, secRect.top + window.scrollY); // Scroll without effect

  // window.scrollTo({
  //   left: secRect.left + window.scrollX,
  //   top: secRect.top + window.scrollY,
  //   behavior: 'smooth',
  // }); // Scroll with effect
  // console.log(`After scroll: x-${window.scrollX}, y-${window.scrollY}`);

  // new way
  featureSec.scrollIntoView({ behavior: 'smooth' });
});

// Scroll to premium
const premiumSec = document.querySelectorAll('.sec-head')[1];
allButtons[2].addEventListener('click', () =>
  premiumSec.scrollIntoView({ behavior: 'smooth' })
);

// Scroll to team
const teamSec = document.querySelectorAll('.sec-head')[2];
allButtons[3].addEventListener('click', () =>
  teamSec.scrollIntoView({ behavior: 'smooth' })
);

// Scroll to top
const scrollTop = document.getElementById('top-scroll');
scrollTop.addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('nav').scrollIntoView({ behavior: 'smooth' });
});

// ////////////////////////////////////////

/**
 * EVENTS
 *
 * Listener vs Handler:
 * The event listener listens out for the event happening, and the event handler
 * is the code that is run in response to it happening.
 */

// REGISTERING EVENTS

// 3 ways of registering events
// 1. calling addEventListener on the element
// 2. using element property e.g. button.onclick = function(){}
// 3. injecting JS directly in HTML e.g. <h1 onclick = "alert('hi')">Heading</h1>

// Registering an Event
const heading = document.querySelector('.heading');

const showAlert = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};

// event mouseenter (similar to CSS hover)
heading.addEventListener('mouseenter', showAlert);

// Remove Event after 3 sec
setTimeout(() => heading.removeEventListener('mouseenter', showAlert), 3000);

// EVENT PROPOGATION - Propogating from Parent to Child (Target) & vice-versa

// When we attach an event to an element it goes through three phases:
// I. Capturing Phase - event doesn't gets attached to targe element directly.
// It traverses from Parent element to target element
// II. Target Phase - element where event is attached to.
// III. Bubbling Phase - bubbles up from Target to Parent. When we attach an event to an element,
// JS attaches same event to all its parents . This is the default phase
// of addEventListener().

// Example of Event Propogation
// When click on 1st list item: event fires for all three elements
// When click on list container (ul): event fires for container and navbar
// When click on nav bar: event fires for nav bar only

// // Generate random colors
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// // 1st link
// document
//   .querySelectorAll('.nav-link')[0]
//   .addEventListener('click', function (e) {
//     console.log(`from 1st link item`);
//     this.style.backgroundColor = randomColor();
//     console.log(e.target); // get target element
//     console.log(e.currentTarget); // get current target element
//   });

// // ul (link container)
// document.querySelector('.nav-links').addEventListener('click', function (e) {
//   console.log(`link container`);
//   this.style.backgroundColor = randomColor();
//   console.log(e.target);
//   console.log(e.currentTarget);
// });

// // nav
// document.querySelector('nav').addEventListener('click', function (e) {
//   console.log(`navbar`);
//   this.style.backgroundColor = randomColor();
//   console.log(e.target);
//   console.log(e.currentTarget);
// });

// EVENT DELEGATION

// // Add scroll to menus using forEach() [Inefficient Way]
// document.querySelectorAll('.nav-link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Event Delegation:
// In case of thousands of Node items, above way of attching event to individual Node item using forEach() is inefficient
// For efficiency, we use Event Delegation

// How to apply Event Delegation?
// 1. Add event listner to common parent element
// 2. Determine what element originated the event (e.target)

// Implementaion:
// Apply event listener to 'ul'
// Now, event listener listens to all the items inside 'ul'
document.querySelector('.nav-links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching Strategy (scroll only when clicked on the link, exclude the parent)
  if (e.target.classList.contains('nav-link')) {
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});

// ////////////////////////////////////////////

// DOM TRAVERSING

const h1 = document.querySelector('.h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight')); // returns NodeList of all child elements of h1 that have specified selector (class/id/tag)
console.log(h1.childNodes); // returns  NodeList of all the childs (elements, text & comments)
console.log(h1.children); // returns HTMLCollection of all the child elements (ignore text & comments)
console.log(h1.firstElementChild); // returns first child element
// h1.firstElementChild.style.color = 'green';
// h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode); // returns first parent element
console.log(h1.parentElement); // returns first parent element

// h1.closest('.header').style.background = 'orangered'; // returns closest parent that matches specified selector
// h1.closest('h1').style.background = 'blue'; // selects itself

// Going sideways: siblings
console.log(h1.previousElementSibling); // returns previous sibling element
console.log(h1.nextElementSibling); // returns next sibling element

console.log(h1.previousSibling); // returns previous sibling text/comment
console.log(h1.nextSibling); // returns next sibling text/comment

// Get all the siblings
// Go to the parent, then select all the child elements
console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   // console.log(el);
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

///////////////////////////////////////////

// TABS

const tabBtnContainer = document.querySelector('.tab-btn-container');
const tabContents = document.querySelectorAll('.tab-content');
const tabBtns = document.querySelectorAll('.tab-btn');

tabBtnContainer.addEventListener('click', function (e) {
  // console.log(e.target); // returns all the child elements
  // console.log(e.target.closest('.tab-btn')); // returns only buttons

  const btn = e.target.closest('.tab-btn');

  // Guard clause - if any other subling is clicked, don't proceed
  if (!btn) return;

  // Tab logic:
  // 1. Remove active classes from all the buttons & content areas
  // 2. Add active calsses to clicked button & respective content area

  // 1. remove active classes
  // on button click, remove active & set active for clicked button
  tabBtns.forEach(b => b.classList.remove('tab-btn--active'));
  tabContents.forEach(c => c.classList.remove('tab-content--active'));

  // 2. add active classes
  btn.classList.add('tab-btn--active');
  document
    .querySelector(`.tab-content--${btn.dataset.tab}`)
    .classList.add('tab-content--active');
});

// ///////////////////////////////////////
