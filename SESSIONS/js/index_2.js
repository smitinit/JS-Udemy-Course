/*
"use strict";

const passTest = true;
let hasDriversLicense = false;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("u have driving license");
*/

//---------------------------------------------------------

/*
function cl(val, vals) {
  console.log(val, vals);
}
function fruits(apple, orange) {
  // cl(apple, orange);
  const s1 = `${apple} apple ${orange} orange `;
  return s1;
}
const supply = fruits(0, 6);
// cl(supply);
*/

// -----------------------------------------------------
// let tempp = ["smit", "smit", "smit"];
// let arr = tempp ? ret(tempp) : [];

// arr[0].checked = true;
// console.log(arr);

function ret(t) {
  // let obs = [];
  t.map((_, i) => {
    obs.push({ value: tempp[i], index: i, checked: false });
  });
  tempp = obs;
  return tempp;
}

//======================FUNCTIONS====================

/* 
const currentYear = 2024;

//type 1
function calculateAge_1(age) {
  return currentYear - age;
}
const age = calculateAge_1(19);
console.log(age);

//type 2
const calculateAge_2 = function (age) {
  return currentYear - age;
};
console.log(calculateAge_2(19));
// const age = calculateAge_2(19);
// console.log(age);

//type 3 arrowFunctions
const calculateAge_3 = (age) => currentYear - age;
console.log(calculateAge_3(19));
// const age = calculateAge_3(19);
// console.log(age);

//egSS

const calculateAge_wName = (firstName, born) => {
  return `${firstName}, you are ${currentYear - born} years old!`;
};
console.log(calculateAge_wName("smit", 2005));
 
*/

//eg
function cutFruit(fruit, n) {
  return fruit * n;
}
function fruitJuice(apple, mango) {
  const applePieces = cutFruit(apple, 2);
  const mangoPieces = cutFruit(mango, 3);
  return `${applePieces} of apples and ${mangoPieces} of mangoes are required!`;
}

// console.log(fruitJuice(14, 6));

const Smit = {
  firstName: "Smit",
  lastName: "Patel",
  hasDrivingLicense: true,
  birthYear: 2005,
  calcAge: function () {
    this.age = -this.birthYear + 2024;
    return this.age;
  },
  Summary: function () {
    return `${this.firstName} is ${this.calcAge()} year old, and he has ${
      this.hasDrivingLicense ? "a" : "no"
    } Driving License.`;
  },
};

// console.log(Smit.Summary());

let dice = Math.trunc(Math.random() * 6) + 1;
while (dice !== 6) {
  console.log(dice);
  dice = Math.trunc(Math.random() * 6) + 1;
}
console.log(dice);
