'use strict';
//                     OOP                         //
// THIS HAPPENS BEHIND THE SCENES //
//1. new {} is created
//2. function is called, this ={}
//3. {} linked to prototype
//4. funtion auto returns {}

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
