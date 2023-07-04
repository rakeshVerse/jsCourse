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

// Scroll to Feature when Learn More is clicked
document
  .querySelector('.btn--scroll-to')
  .addEventListener('click', () =>
    document.getElementById('section--1').scrollIntoView({ behavior: 'smooth' })
  );

// ////////////////////////////////////////
