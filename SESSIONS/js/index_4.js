'use strict';

function toggleTheme() {
  document.querySelector('body').classList.toggle('lightTheme');
}
document.querySelector('.toggle-btn').addEventListener('click', toggleTheme);

// WWWWWWWWWWWWWWWWWWWWWWW
const menu = {
  prices: [120, 150, 200, 250],
  food: { chinese: 'manchao Soup', indian: 'Pav bhaji' },
};

// let [first, second] = menu.prices;
// console.log(first, second);
// [first, second] = [second, first];
// console.log(first, second);

const [a, b, r, d, e = 1849320840] = menu.prices;
// console.log(a, b, c, d, e);

const {
  food: { chinese: c, indian: i },
} = menu;

// console.log(c, i);

const allNumbers = [9, 4, 5, 6, 5];

const addAll = function (...allNumbers) {
  let sum = 0;
  for (let i = 0; i < allNumbers.length; i++) {
    sum += allNumbers[i];
  }
  return { answer: sum };
};

const { answer } = addAll(...allNumbers);
// console.log(answer);

// console.log(3 || 'smit');
// console.log('smit' && 5);

// console.log('' || 'smit');
// console.log(Boolean(undefined));
// console.log(Boolean(null));
// console.log(Boolean(''));
// console.log(Boolean(NaN));
// console.log(Boolean(0));
// console.log(Boolean(menu.prices));

const g = {
  a: 1,
};

const result = g.a;

g.b = 0;

const result2 = g.b || 3; // || ma zero falsy value che!!
const result3 = g.b ?? 3;

// console.log(result, result2, result3);

const rest1 = {
  name: 'lapinoz',
  numGuest: 10,
};
const rest2 = {
  name: 'lapinoz',
  owner: 'krishna suthar',
  numGuest: 0,
};

rest2.numGuest ||= 'No guest available';
rest1.numGuest ??= 10;

// console.log(rest1.numGuest, rest2.numGuest);

let credit = 10;

credit ||= -1;

if (credit === -1) {
  console.log('dd');
}

// form of opening a portal for a restorent

const ownerDetails = {
  userData: [
    ['smit', 20],
    ['', 25],
  ],
  ownerHas: {
    income: 12345,
    family: 3,
    asd: {
      asdf: null,
    },
  },
};

const data = ownerDetails.ownerHas.asd?.asdf ?? '<not available>';
// console.log(data);

let [d1, d2] = ownerDetails.userData;
let {
  ownerHas: { income, family },
} = ownerDetails;
let [name1, age1] = d1;
let [name2, age2] = d2;

name2 ||= '<Anonymous>';
name1 ||= '<Anonymous>';
// console.log(name1, age1);
// console.log(name2, age2);
// console.log(family);

const arrayofRandom = Array(10).fill(parseInt(Math.random() * 10 + 1));

for (const [i, el] of arrayofRandom.entries()) {
  if (el % 2 === 0) {
    // console.log(i, el);
  }
}

const user = [
  {
    name: 'Smit' || 'Not Specified',
    email: 'smit0900305@gmail.com' || 'Not Specified',
  },
];

// console.log(user[0]?.name ?? 'Field does not Exist!!');
// console.log(user[0]?.email ?? 'Field does not Exist!!');

for (const key of Object.keys(ownerDetails)) {
  // console.log(key);
}
for (const [key1, key2] of Object.entries(ownerDetails)) {
  // console.log(key1, key2);
}

const string = 'ssssmit';

const resultOfString = string.split('');
// console.log(resultOfString);

const setOfString = new Set(string);
// console.log(setOfString.add('m'));
// console.log(setOfString.entries());

const arr = [...setOfString];
// console.log(arr.toLocaleString());

const map = new Map();
map.set('name', 'dfgd');
map.set(1, 'sdfs');
map.set(2, 'fgdhfss');
// console.log(map);

const familyName =
  'sMit MAHeshbhai paTEL fd gb kjdfhigofd fhsdofg hipsda hfgaifgosado fgosuguosfo fsdg  ofuos khfdo sfusd ofiugs uicf siifgd sgfiyucfs ifciy sd gaos fusdhsg gaugsuo ofgsauo g gfa gueuao f  ';

let z = familyName.trim().toLowerCase().split(' ');
let str = '';
for (let i = 0; i < z.length; i++) {
  str += z[i][0]?.toUpperCase() + z[i].slice(1) + ' ';
}
// console.log(str);

const creditCardNumber = 70165345164685646n;
const mobileNumber = 9265875407;

// handleProtectedDisplay(creditCardNumber);
// handleProtectedDisplay(mobileNumber);
// handleProtectedDisplay(4404960489049494090494949n);
// handleProtectedDisplay('4404960489049494090494949');

function handleProtectedDisplay(number) {
  let stringOfAuth = number + '';
  let tobeDisplayedNumber = stringOfAuth.slice(-4);
  console.log(tobeDisplayedNumber.padStart(stringOfAuth.length, '*'));
}
