'use strict';

//ES6 CLASSES SUMMARY END -> SECTION 14 227 7:00

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

/*
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
*/
// ---------------------------------GETTER SETTER----------------------------
/*
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
*/

// console.log(accc.latest); //getter

// accc.latest = 50; //setter

// console.log(accc.latest); //getter

// accc.latestAdd(3249); //normal set

// console.log(accc.latest); //getter

// console.log(accc.latestGet()); //normal get

//challenge 1

/*
class Carr {
  constructor(type, speed) {
    this.type = type;
    this.speed = speed;
  }
  get speedUS() {
    console.log(this.speed / 1.6 + 'mi/h');
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
    console.log(this.speed + 'km/h');
  }
  accelerate() {
    this.speed += 10;
    console.log(this.speed + 'km/h');
  }
  brake() {
    this.speed -= 5;
    console.log(this.speed + 'km/h');
  }
}

const zen = new Carr('Ciaz', 100);
// zen.speedUS;
// zen.speedUS = 100;
// zen.accelerate();
*/
/*
const PersonDetails = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const Student = function (firstName, birthYear, course) {
  // this.firstname = firstname;
  // this.birthYear = birthYear;
  PersonDetails.call(this, firstName, birthYear);
  this.course = course;
};

//linking prototype
Student.prototype = Object.create(PersonDetails.prototype);

Student.prototype.intruduce = function () {
  console.log(`My name is ${this.firstName} and i study ${this.course}`);
};

const alice = new Student('Alice', 19, 'BSC-IT');
console.log(alice);
alice.intruduce();
console.log(alice.__proto__);
console.log(alice.__proto__.__proto__);
*/
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`Speed is ${this.speed}`);
};
Car.prototype.brake = function () {
  this.speed -= 10;
  console.log(`Speed is ${this.speed}`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype); //linking prototype w car

EV.prototype.chargeBattery = function (charge) {
  this.charge = charge;
};
EV.prototype.accelerate = function () {
  //this is used as it comes first in chain
  this.speed++;
  this.charge--;
  console.log(`Speed is ${this.speed} and charge is ${this.charge}`);
};
const bmw = new EV('BMW', 120, 90);
bmw.chargeBattery(100);
bmw.brake();
bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
console.log(bmw);
*/

//with classes and this is ez af

/** 
class Car {
  make = '';
  speed = 0;
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate = function () {
    this.speed += 10;
    console.log(`Speed is ${this.speed}`);
  };
  brake = function () {
    this.speed -= 10;
    console.log(`Speed is ${this.speed}`);
  };
}

class EV extends Car {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed); // *always need to happens first
    this.charge = charge;
  }

  chargeBattery = function (charge) {
    this.charge = charge;
    return this;
  };

  accelerate = function () {
    this.speed++;
    this.charge--;
    console.log(
      `Speed accelerated and is ${this.speed} ${
        this.charge ? `with charge of ${this.charge}` : ''
      }`
    );
    return this;
  };
  brake = function () {
    this.speed++;
    console.log(
      `Speed decelerated and is ${this.speed} ${
        this.charge ? `with charge of ${this.charge}` : ''
      }`
    );
    return this;
  };
}

const bmw = new EV('BMW', 120, 40);
bmw.accelerate().brake().chargeBattery(60).accelerate();
*/

/*
class Amount {
  // Public fields (instances)
  locale = navigator.language;

  //Private Fields
  #movements = []; // # makes it private (syntax)
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    //protected property
    this.#pin = pin;
    console.log(`Thanks for opening an account, ${this.owner}! `);
  }

  //public methods !
  getMovements() {
    return this.#movements;
  }
  deposit(val) {
    this.#movements.push(val);
    return this; //this is for chaining methods
  }
  withdraw(val) {
    this.deposit(-val);
    return this; //this is for chaining methods
  }
  requestLoan(val) {
    if (this.#approveLoan) {
      this.deposit(val);
      console.log(`Loan approved of ${val}`);
    }
  }

  /// private methods not implemented in chrome i think so
  #approveLoan(val) {
    return true;
  }

  ///similarly static works only on Account not  instances!
}

const acc1 = new Amount('Smit', 'INR', 5555);

/// all of them can be used out side of class including approveLoan and pin etc b ut it should be not so we use '_' to know it is private not the actual method just notation...

acc1.deposit(100);

acc1.withdraw(140);

acc1.requestLoan(1800);

console.log(acc1.getMovements());

console.log(acc1);

//ENCAPSULATION
//private class fields and methods up all above

//chaining methods

acc1.deposit(323).deposit(32).withdraw(323); //return this addition in methods

// EXAMPLE ON GETTER AND CHAINIG
/*
class F {
  constructor(n, a) {
    this.n = n;
    this.a = a;
  }
  calcBD() {
    console.log(`Born in ${2023 - this.a}`);
    return this;
  }
  get greet() { //  static can be used here 
    console.log(`Hello, ${this.n}`);
    return this;
  }
}

const jack = new F('Jack', 40);
jack.greet.calcBD(); // chaning example
*/
