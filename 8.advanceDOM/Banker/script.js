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

// MENU ANIMATION

const menuHoverEffect = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const menu = e.target;
    const menuSiblings = menu.closest('.nav').querySelectorAll('.nav__link');
    const logo = menu.closest('.nav').querySelector('img');

    menuSiblings.forEach(m => {
      if (m !== menu) m.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', menuHoverEffect.bind(0.4));
nav.addEventListener('mouseout', menuHoverEffect.bind(1));

// ///////////////////////////////////////////////

// STICKY NAV

// Old inefficient way: Using window Scroll
// const section1 = document
//   .querySelector('#section--1')
//   .getBoundingClientRect().top;

// window.addEventListener('scroll', function () {
//   if (this.window.scrollY > section1) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// -------------------------------------

// New efficient way: Intersection Observer API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

// callback
const stickyCB = function (entries) {
  const [entry] = entries;

  entry.isIntersecting
    ? nav.classList.remove('sticky')
    : nav.classList.add('sticky');
};

// options
const stickyOps = {
  root: null,
  rootMargin: `-${navHeight}px`,
  threshold: 0,
};

// observer
const stickyObs = new IntersectionObserver(stickyCB, stickyOps);
stickyObs.observe(header);

//////////////////////////////////////////////////////

// REVEAL SECTIONS

const revealSec = function (entries, observer) {
  const [entry] = entries;

  // Guard clause
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden'); // remove hidden class
  observer.unobserve(entry.target);
};

const secObserver = new IntersectionObserver(revealSec, {
  root: null,
  threshold: 0.2,
});

const allSections = document.querySelectorAll('.section');
allSections.forEach(sec => {
  secObserver.observe(sec); // add target
  sec.classList.add('section--hidden'); // hide section
});

// ///////////////////////////////////////////////////////////

// LAZY IMAGE LOADING

const lazyLoad = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  // replace blur when image loads
  entry.target.addEventListener('load', function () {
    this.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(lazyLoad, {
  root: null,
  threshold: 0,
});

const featureImgs = document.querySelectorAll('.features__img');
featureImgs.forEach(img => imgObserver.observe(img));

// ///////////////////////////////////////////////////////////

// SLIDER
const slider = () => {
  // const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dots = document.getElementById('dots');

  // align slides side by side
  // slider.style.transform = 'scale(0.3) translateX(-1000px)';
  // slider.style.overflow = 'visible';

  const totalSlides = slides.length - 1; // total slides
  let currSlide = 0; // current slide starts from 0

  // Functions
  const createDots = () => {
    slides.forEach((_, i) => {
      dots.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = slide => {
    // remove active dot from other dots & add to slide
    const preDot = dots.querySelector('.dots__dot--active');
    preDot?.classList.remove('dots__dot--active');

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const slide = currSlide => {
    // formula: 100 * (i - currentSlide)

    // for right button
    // 1. 0 100 200 300
    // 2. -100 0 100 200
    // 3. -200 -100 0 100
    // 4. -300 -200 -100 0
    slides.forEach(
      (slide, i) =>
        (slide.style.transform = `translateX(${100 * (i - currSlide)}%)`)
    );
  };

  const slideRight = () => {
    if (totalSlides === currSlide) {
      currSlide = 0;
    } else {
      currSlide++;
    }

    slide(currSlide);
    activateDot(currSlide);
  };

  const slideLeft = () => {
    if (currSlide === 0) {
      currSlide = totalSlides;
    } else {
      currSlide--;
    }
    slide(currSlide);
    activateDot(currSlide);
  };

  const init = () => {
    slide(currSlide); // initial 0 100 200 300
    createDots();
    activateDot(currSlide);
  };

  init(); // initializer

  // Event handlerss
  // Slide on button click
  btnRight.addEventListener('click', slideRight);
  btnLeft.addEventListener('click', slideLeft);

  // Slide on arrow keys
  window.addEventListener('keydown', function (e) {
    e.key === 'ArrowRight' && slideRight();
    e.key === 'ArrowLeft' && slideLeft();
  });

  // Slide on dots click
  dots.addEventListener('click', function (e) {
    if (!e.target.matches('#dots button')) return;
    const currSlide = e.target.dataset.slide;
    slide(currSlide);
    activateDot(currSlide);
  });
};
slider();

// ///////////////////////////////////////////////////////////
