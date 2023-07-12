## Asynchronous JS

### Callback functions alone do not make code Asynchronous

Map accepts a callback function but it's Synchronous.

```js
[4, 5, 9].map(item => item * 3);
```

Callback of setTimer() is Asynchronous. Because its executing the timer in the background while lines of code after setTimer() are executing in the foreground.

```js
setTimer(function () {}, 5000);
```

### Event Listeners alone do not make code Asynchronous

Click event is not Asynchronous. Even though it's out of the normal execution flow. Because, its not doing anything until the click event happen. It's just registered & will execute when the event will happen.

```js
btn.addEventListener('click', function () {});
```

.src is Asynchronous. It will load the image in background while other lines of code are executing. JS will emmit a load event when the image loads completely. We can listen for the load event.

```js
const img = document.querySelector('.cat-img');
img.src = 'cat.png';
img.addEventListener('load', function () {
  img.classList.add('fade');
});
document.getElementById('container').style.color = '#222';
```
