'use strict';

const oneWord = function (str) {
  return str.replace(/ /g, ' ').toLowerCase();
};
const upperCaseFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function (str, fn) {
  console.log(`Transformer string: ${fn(str)}`);
};

// transformer('sMiT MaheSHBHAI pATeL', upperCaseFirstWord);
// transformer('sMiT MaheSHBHAI pATeL', oneWord);

const greet = function (greetings) {
  return function (name) {
    console.log(`${greetings} ${name}!`);
  };
};

// const greeter = greet('Sup'); // 1
// greeter('Smit');

// greet('sup')('smit!');   //2

const greetArrow = greetings => name => console.log(`${greetings} ${name}!`);

// greetArrow('Sup')('Smit');

// const book = function (flightNumber, name) {
//   console.log(
//     `${name} has booked ticket with flightNumber ${flightNumber} in ${airline} airline!`
//   );
// };

const Emirates = {
  airline: 'Emirates',
  bookings: [],
  book(flightNumber = 'Not Specified', name = '<Name Not Specified>') {
    console.log(
      `${name} has booked ticket with flightNumber ${flightNumber} in ${this.airline} airline!`
    );
    this.bookings.push({
      flight: `${flightNumber}`,
      code: `${this.airline}`,
      name: `${name}`,
    });
  },
};
const AirIndia = {
  airline: 'AirIndia',
  bookings: [],
};

const book = Emirates.book;

// book(23, 'dfssf');    ////doesnot work

// book.call(Emirates, 773); //works
// book.call(AirIndia, 73, 're');
// book.call(Emirates, 3, 'df');
// book.call(AirIndia, 2, 'jty');

// console.log(Emirates, AirIndia);

///BIND METHOD
// const returnSomething = (a, b) => a + b * b;

// const simplifiedReturn = returnSomething.bind(null, 10.2);

// const result = simplifiedReturn(2);
// console.log(result);

const returnSomething = a => b => a + b * b; //a = tax b = income of public

// const result = returnSomething(2)(3); ///way 1
// console.log(result);

const secondReturnSomething = returnSomething(2); //way 2
const s1 = secondReturnSomething(3); //get this shit from user
// console.log(s1); // provide answer

const poll = {
  q: 'Best shit ?',
  options: ['1: JS', '2: Cpp', '3: Java', '4: Python'],
  answer: new Array(4).fill(0),
};

poll.registerNewAnswer = function () {
  let question = `${this.q}\n`;
  this.options.forEach(element => {
    question += element + '\n';
  });
  question += `Select one!`;

  const ans = Number(prompt(question));

  if (ans >= 1 && ans <= this.answer.length) {
    this.answer[ans - 1]++;
    this.displayResult();
  }
};
poll.displayResult = function (type = 'string') {
  console.log(
    type === 'array'
      ? this.answer
      : `Poll results are ${this.answer.join(', ')}`
  );
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// poll.displayResult.call({ answer: [2, 3, 3, 4, 5, 5] });

///RUN ONLY ONE TIME EVRE AND LATER IF NEEDED CALL IT 'OP'

////IIFE

// (() => console.log('only one time!!'))();

(function () {
  const agreed =
    localStorage.getItem('agreed') === 'true' ||
    confirm('Agree to our user policies?!');

  if (agreed) {
    localStorage.setItem('agreed', agreed);
  }
})();

document.querySelector('.clrstr').addEventListener('click', function () {
  localStorage.clear();
});
