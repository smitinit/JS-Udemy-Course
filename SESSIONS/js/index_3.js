'use strict';

const temperature_1 = [1, 5, 6, 7, 8, 9, 10];
const temperature_2 = [4, 5, 6, 7, 8, 9, 20];
// const max = Math.max(...temperature);

const temperature = temperature_1.concat(temperature_2);

const maxFunc = function (arr1) {
  let max = arr1[0];
  let min = arr1[0];
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] > max) max = arr1[i];
    if (arr1[i] < min) min = arr1[i];
  }
  console.log('max: ', max);
  console.log('min: ', min);
  return max - min;
};

// const difference = maxFunc(temperature);
// console.log('difference: ', difference);

const doctorTools = function () {
  const tools = {
    num: prompt('Enter value'),
    val: function () {
      return Number(this.num) + 122345;
    },
  };
  console.log(tools.val());
};

// doctorTools();
const forecast = [
  1, 2, 3, 4, 5, 56, 67, 7, 8, 9, 54, 3, 5, 56, 76, 78, 7, 5, 23,
];
function printForecast(arr) {
  let str = '';
  for (let i = 0; i < arr.length; i++) {
    str += `... ${arr[i]}\tdegree C in ${i + 1} days\n`;
  }
  return str;
}

// const answer = printForecast(forecast);
// console.log(answer);

const friend = { name: 'smit', age: 19 };
friend.name = 'vivek';
// console.log(me, friend);

let lastName = 'patel';
let oldLastName = lastName;
lastName = 'shah';

// console.log(lastName, oldLastName);

const me = {
  name: 'smit',
  age: 19,
  friends: ['x', 'y', 'z'],
};

const meNew = Object.assign({}, me);
meNew.name = 'vivek';
meNew.age = 20;
meNew.friends.push('a');
console.log(me, meNew);
