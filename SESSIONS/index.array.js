'use strict';
const symbols = ['\\', '|', '/', '--'];
let i = 0,
  N = 350;
setInterval(() => {
  document.querySelector('span').textContent = symbols.at(i++);
  i === 4 && (i = 0);
}, N);

function mouseXY(Event) {
  let x = Event.pageX;
  let y = Event.pageY;
  let MAX = 30;
  document.querySelector('#xfield').value = x;
  document.querySelector('#yfield').value = y;
  // console.log(window.visualViewport.width, window.visualViewport.height);
  x >= window.visualViewport.width - MAX ||
  y >= window.visualViewport.height - MAX ||
  x <= MAX ||
  y <= MAX
    ? document.querySelector('.withmouse').classList.add('visible')
    : document.querySelector('.withmouse').classList.remove('visible');

  document.querySelector('.withmouse').style.top = `${y}px`;
  document.querySelector('.withmouse').style.left = `${x}px`;
}
document.querySelector('body').addEventListener('mousemove', mouseXY);
//////////////////////////////////ARRAYS///////////////////

let arr = ['a', 'b', 'c', 'd', 'e', 'f'];

// console.log(arr.slice(2, -1));
// console.log(arr);

// console.log(arr.splice(-1));
// console.log(arr);

// console.log(arr.at(1));

console.log(arr.at(-1)); //returns specific element like arr[i] and does not changes the original array
console.log(arr.slice(-1)); //returns array and does not changes the original array
console.log(arr[arr.length - 1]); //returns specific element like arr[i] and does not changes the original array
console.log(arr.splice(-1)); //returns array and DOES changes the original array

const movements = [43, -45, -56, -57, 85];
console.log(`\n----FOR OF----\n`);

for (const [i, movement] of movements.entries()) {
  console.log(
    movement > 0
      ? `${movement} at position ${i} is positive`
      : `${Math.abs(movement)} at position ${i} is negative`
  );
}
console.log(`\n----FOR EACH----\n`);
movements.forEach((el, i, arr) => {
  // arr passes whole array //i = key //el = each values
  console.log(
    el > 0
      ? `${el} at position ${i} is positive`
      : `${Math.abs(el)} at position ${i} is negative`
  );
});
