'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Click event Open Modal
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// Click event Close Modal
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Keydown event Close Modal on Esc
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////

// Scroll

// Scroll to Feature when Learn More is clicked
document
  .querySelector('.btn--scroll-to')
  .addEventListener('click', () =>
    document.getElementById('section--1').scrollIntoView({ behavior: 'smooth' })
  );

// Scroll for Menu items (Event Delegation)
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});

// Scroll to Top
document.getElementById('top-scroll').addEventListener('click', function (e) {
  e.preventDefault();

  document.querySelector('body').scrollIntoView({ behavior: 'smooth' });
});

// ////////////////////////////////////////

// TAB
const btnContainer = document.querySelector('.operations__tab-container');
const tabBtns = document.querySelectorAll('.operations__tab');
const tabContents = document.querySelectorAll('.operations__content');

btnContainer.addEventListener('click', function (e) {
  // select button only out of other childs of parent container
  const btn = e.target.closest('.operations__tab');

  // Guard clause
  if (!btn) return;

  // Remove active classes from all buttons & contents
  tabBtns.forEach(b => b.classList.remove('operations__tab--active'));
  tabContents.forEach(c => c.classList.remove('operations__content--active'));

  // Add active classes to clicked button & content
  btn.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${btn.dataset.tab}`)
    .classList.add('operations__content--active');
});

// ////////////////////////////////////////////
