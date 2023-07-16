'use strict';

const imageContainer = document.querySelector('.images');

///////////////////////////////////////

const wait = function (secs) {
  return new Promise(function (resolve) {
    setTimeout(resolve, secs * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    // resolve on load
    img.addEventListener('load', function () {
      imageContainer.append(img);
      resolve(img);
    });

    // reject on error
    img.addEventListener('error', function () {
      reject(new Error(`Image not found.`));
    });
  });
};

// Show hide using then()
// let currImg;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currImg = img;
//     return wait(2);
//   })
//   .then(() => (currImg.style.display = 'none'))
//   .catch(err => console.error(err));

/* 
PART I
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.
*/
// Show hide using Async/Await
const loadNPause = async function () {
  try {
    // Show hide img 1
    let img = await createImage('img/img-1.jpg');
    await wait(2);
    img.style.display = 'none';

    // Show hide img 2
    img = await createImage('img/img-2.jpg');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err.message);
  }
};

// loadNPause();

/* PART II
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'parallel' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.
*/

// Version 1: without using Async/Await inside .map()
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(img => createImage(img)); // returns an array of Promises
    console.log(imgs);

    const images = await Promise.all(imgs);
    console.log(images);
    images.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err.message);
  }
};

// Version 2: with using Async/Await inside .map()
// const loadAll = async function (imgArr) {
//   try {
//     const imgs = imgArr.map(async img => await createImage(img)); // returns an array of Promises
//     console.log(imgs);

//     const images = await Promise.all(imgs);
//     console.log(images);
//     images.forEach(img => img.classList.add('parallel'));
//   } catch (err) {
//     console.error(err.message);
//   }
// };

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

/**
In both versions of the code, the map() method is synchronous, and it will indeed wait for each iteration to complete before moving on to the next element in the array. The use of async/await inside the map() function in the second version does not make the code load the images in parallel.

The main difference between the two versions is how the promises are handled after the map() operation. In the first version, Promise.all() is used to wait for all the promises returned by createImage() to resolve. This ensures that all images are loaded before proceeding with the forEach() loop.

In the second version, each iteration of the map() function returns a promise directly using async/await. However, the Promise.all() call is still used after the map() operation to wait for all the promises to resolve before proceeding with the forEach() loop. The use of async/await inside the map() function in the second version does not introduce parallelism or improve performance.

To clarify, the first version is sufficient and efficient for loading the images. The second version, with the unnecessary use of async/await inside the map() function, does not offer any performance advantage in this case.
 */
