'use strict';
//                     OOP                         //
// THIS HAPPENS BEHIND THE SCENES //
//1. new {} is created
//2. function is called, this ={}
//3. {} linked to prototype
//4. funtion auto returns {}
/*
const Person = function (f, b) {
  this.f = f;
  this.b = b;

  //NEVER DO THIS
  // this.a = function () {
  //   console.log(2024 - this.b);
  // };
};

const smit = new Person('Smit', 2005);
const alice = new Person('Alice', 1990);
const jack = new Person('Jack', 2000);

console.log(smit, alice, jack); //instances of Person
console.log(smit instanceof Person); //true

//prototype inheritance
//method
Person.prototype.calcAge = function () {
  console.log(2024 - this.b);
};

smit.calcAge();
alice.calcAge();
jack.calcAge();

console.log(smit.__proto__);
console.log(smit.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(smit));
console.log(Person.prototype.isPrototypeOf(Person));

//properties

Person.prototype.ishuman = true;
console.log(smit.ishuman, alice.ishuman, jack.ishuman);
// console.log(smit.hasOwnProperty('calcAge'));

//object prototype(top chain  )
console.log(smit.__proto__.__proto__);
console.log(smit.__proto__.__proto__.__proto__);

const arr2 = [1, 2, 3, 4, 5, 6, 6];
const sun = arr2.reduce((acc, cur) => acc + cur, 0);
console.log(sun);

console.log(arr2.__proto__ === Array.prototype); // true

//behind the scenes automatic
const arr = new Array(1, 2, 3, 4, 5, 6, 6, 6, 3, 2, 2);
// .filter(a => a < 5)
// // .reduce((acc, cur) => acc + cur, 0)
// .join(' ')
// .split(' ');

Array.prototype.setit = function () {
  return [...new Set(this)];
};
console.log(arr.setit());

Array.prototype.addAll = function () {
  return this.reduce((acc, cur) => acc + cur, 0);
};
console.log(arr.addAll());
console.log(Array(10).fill(100).addAll());

Array.prototype.mergeAllWith = function (operator = '-') {
  return this.setit().join(` ${operator} `).split('  ');
};
console.log(arr.mergeAllWith('>'));

Array.prototype.findDepositAndWithdrawal = function () {
  return this.reduce(
    (sums, cur) => {
      sums[cur > 0 ? 'deposit' : 'withdraw'] += cur;
      return sums;
    },
    {
      deposit: 0,
      withdraw: 0,
    }
  );
};

const movements = [4535, -325, 326, -25, 632, -434, -642, -624, 652];
console.log(movements.findDepositAndWithdrawal());
console.log(movements.findDepositAndWithdrawal().deposit);
console.log(movements.findDepositAndWithdrawal().withdraw);

*/

const Car = function (make, speed) {
  this.speed = speed;
  this.make = make;
};

const bmw = new Car('BMW', 120);
const ciaz = new Car('Ciaz', 100);

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} has speed of ${this.speed}`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} has speed of ${this.speed}`);
};

//class expression
const PersonEG = class {};
//class declaration
class Person {
  constructor(firstname, birthYear) {
    this.firstname = firstname;
    this.birthYear = birthYear;
  }
  //methods wil be added to prototype
  get calcAge() {
    console.log(2024 - this.birthYear);
  }
  static hey() {
    console.log(`hey !`);
  }
}
const smit = new Person('Smit', 2005);
// Person.hey(); //works
// smit.hey(); //error
//manual addition of method to class also works
Person.prototype.greet = function () {
  console.log(`Hello, ${this.firstname}!!`);
};

// smit.calcAge;
// console.log(smit);
// smit.greet();

// ---------------------------------GETTER SETTER----------------------------
const accc = {
  movements: [234, 354, 64576, 567],
  owner: 'smit',
  get latest() {
    return this.movements.slice(-1).pop();
  },
  latestGet() {
    return this.movements.slice(-1).pop();
  },
  set latest(movement) {
    this.movements.push(movement);
  },
  latestAdd(movement) {
    this.movements.push(movement);
  },
};

// console.log(accc.latest); //getter

// accc.latest = 50; //setter

// console.log(accc.latest); //getter

// accc.latestAdd(3249); //normal set

// console.log(accc.latest); //getter

// console.log(accc.latestGet()); //normal get
