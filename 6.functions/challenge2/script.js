'use strict';
(function () {
  const heading = document.querySelector('h1');
  heading.style.color = 'red';

  document.body.addEventListener('click', function () {
    heading.style.color = 'green';
  });
})();
