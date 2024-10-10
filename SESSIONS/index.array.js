'use strict';
const symbols = ['\\', '|', '/', '--'];
let i = 0,
  N = 350;
setInterval(() => {
  document.querySelector('span').textContent = symbols.at(i++);
  i === 4 && (i = 0);
}, 500);

function mouseXY(Event) {
  let x = Event.pageX;
  let y = Event.pageY;
  let MAX = 30;

  // console.log(window.visualViewport.width, window.visualViewport.height);
  document.querySelector('#xfield').value = x;
  document.querySelector('#yfield').value = y;
  if (
    x >= window.visualViewport.width - MAX ||
    y >= window.visualViewport.height - MAX ||
    x <= MAX ||
    y <= MAX
  ) {
    document.querySelector('#xfield').value = '';
    document.querySelector('#yfield').value = '';
    document.querySelector('.withmouse').classList.add('visible');
  } else {
    document.querySelector('.withmouse').classList.remove('visible');
  }
  document.querySelector('.withmouse').style.top = `${y}px`;
  document.querySelector('.withmouse').style.left = `${x}px`;
}
document.querySelector('body').addEventListener('mousemove', mouseXY);

//////////////////////////////////ARRAYS///////////////////

// let arr = ['a', 'b', 'c', 'd', 'e', 'f'];

// console.log(arr.slice(2, -1));
// console.log(arr);

// console.log(arr.splice(-1));
// console.log(arr);

// console.log(arr.at(1));

// console.log(arr.at(-1)); //returns specific element like arr[i] and does not changes the original array
// console.log(arr.slice(-1)); //returns array and does not changes the original array
// console.log(arr[arr.length - 1]); //returns specific element like arr[i] and does not changes the original array
// console.log(arr.splice(-1)); //returns array and DOES changes the original array

// const movements = [43, -45, -56, -57, 85];
// console.log(`\n----FOR OF----\n`);

// for (const [i, movement] of movements.entries()) {
//   console.log(
//     movement > 0
//       ? `${movement} at position ${i} is positive`
//       : `${Math.abs(movement)} at position ${i} is negative`
//   );
// }
// console.log(`\n----FOR EACH----\n`);
// movements.forEach((el, i, arr) => {
//   // arr passes whole array //i = key //el = each values
//   console.log(
//     el > 0
//       ? `${el} at position ${i} is positive`
//       : `${Math.abs(el)} at position ${i} is negative`
//   );
// });

// ARRAY PRACTICE

//example
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Smit Patel',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const allArr = accounts ///method -1 flat+map
  .map((acc, _) => acc.movements)
  .flat()
  .reduce((acc, cur) => acc + cur, 0);
console.log(allArr);

const total = accounts ///method 2 flatmap
  .flatMap((acc, _) => acc.movements)
  .reduce((acc, cur) => acc + cur, 0);
console.log(total);

const allDepositesW1000 = accounts
  .flatMap((els, _) => els.movements)
  .filter(els => els >= 1000);
console.log(allDepositesW1000);

const allDepositesWReduceAndG1000 = accounts //W reduce
  .flatMap((els, _) => els.movements)
  .reduce((acc, cur) => (cur >= 1000 ? ++acc : acc), 0); /// acc=>count in this case
console.log(allDepositesWReduceAndG1000);

const allTransferW1000 = accounts
  .flatMap((els, _) => els.movements)
  .filter(els => els <= -1000);
console.log(allTransferW1000);

const allTransferWReduceAndG1000 = accounts //W reduce
  .flatMap((els, _) => els.movements)
  .reduce((acc, cur) => (cur <= -1000 ? ++acc : acc), 0); /// acc=>count in this case
console.log(allTransferWReduceAndG1000);

// -------------------------------------------------------

const { deposits, transfers } = accounts //REDUCE IS FKING AWSOMEEEEEEEE
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.transfers += cur); //method 1
      sums[cur > 0 ? 'deposits' : 'transfers'] += cur; //method 2
      return sums;
    },
    { deposits: 0, transfers: 0 }
  );

console.log(deposits, transfers);

const convertString = function (title) {
  const capatilize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = [
    'a',
    'an',
    'the',
    'but',
    'or',
    'on',
    'in',
    'with',
    'is',
    'and',
    'here',
    'at',
    'by',
    'for',
    'from',
    'of',
    'to',
    'up',
    'down',
    'out',
    'over',
    'under',
    'into',
    'onto',
    'about',
    'as',
    'if',
    'than',
    'then',
    'that',
    'which',
    'because',
    'while',
    'so',
    'yet',
    'nor',
    'before',
    'after',
    'since',
    'through',
    'during',
    'between',
    'among',
    'beside',
    'beyond',
    'within',
    'without',
  ];

  const arr = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capatilize(word)))
    .join(' ');
  console.log(capatilize(arr));
};

convertString('Hello, my name is smit !');
convertString('The quick brown fox jumps over the lazy dog.');
convertString('I am learning how to code in JavaScript.');
convertString('This is a random sentence for testing.');
convertString('Here is another example of a simple string.');
convertString('The weather today is really nice!');

// CHALLENGE;

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

console.log(dogs.map(dog => (dog.rF = Math.trunc(dog.weight ** 0.75 * 28))));
// console.log(dogs);

const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(sarahDog);
console.log(sarahDog.curFood > sarahDog.rF ? `Eats too much` : `Eats little`);

const dogCopy = dogs.slice().sort((a, b) => a.rF - b.rF);
console.log(dogCopy);

// const numbers = [1, 2, 3, 5, 4, 75, 785, 67, 563, 85, 68, 8, 647, 8];
// // console.log(numbers.sort((a, b) => (a > b ? -1 : 1)));
// // console.log(numbers.sort((a, b) => a - b));
// // console.log(numbers.sort((a, b) => -a + b));

// const arrs = new Array(10); //declares empty array of 10 eles
// arrs.fill(1); // fill with, start, end similar to slice||splice
// console.log(arrs);

// console.log(Array.from({ length: 7 }, (_, i) => i + 1));

// console.log(
//   Array.from({ length: 100 }, () => Math.trunc(Math.random() * 6) + 1)
// );

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const deposits = movements.filter((mov) => mov > 0);
// const withdrawals = movements.filter((mov) => mov < 0);
// // console.log(deposits, withdrawals);
// const reduceMovements = account2.movements.reduce((acc, curr, i, arr) => {
//   console.log(`iteration at ${i}: acc: ${acc} curr: ${curr}`);
//   return acc + curr;
// }, 0);
// // console.log(reduceMovements);

// const INR = 83.94;
// const movementsINR = movements
//   .map((mov, _, arr) => mov * INR)
//   .reduce((acc, cur, _, arr) => acc + cur, 0);
// // console.log(movementsINR);

// //FIND MAX
// const maximum = movements.reduce(
//   (acc, cur) => (acc > cur ? acc : cur),
//   movements[0]
// );
// // console.log(maximum);
