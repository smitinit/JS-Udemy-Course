"use strict";

// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// create username
const createUserName = (accounts) =>
  accounts.forEach(
    (subaccount) =>
      (subaccount.username = subaccount.owner
        .toLowerCase()
        .trim()
        .replace(/\s\s+/g, " ") //390ms speed
        .split(" ")
        .map((name) => name[0])
        .join(""))
  );
createUserName(accounts);

//display total
const displayMovements = function (movement) {
  containerMovements.innerHTML = "";
  movement.forEach((el, i) => {
    const type = el > 0 ? "deposit" : "withdrawal";
    let html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${el}$</div>
        </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
displayMovements(account4.movements);

const calcBalance = (movements) => {
  const balance = movements.reduce((acc, cur, _, arr) => acc + cur, 0);
  console.log(balance);
  labelBalance.textContent = `${balance} USD`;
};
calcBalance(account4.movements);

const moneyINTotal = (movements) => {
  const IN = movements
    .filter((el) => el > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${IN}$`;
};
moneyINTotal(account4.movements);

const moneyOUTTotal = (movements) => {
  const OUT = movements
    .filter((el) => el < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(OUT)}$`;
};
moneyOUTTotal(account4.movements);

const interest = (movements) => {
  const inst = movements
    .filter((el) => el > 0)
    .map((el) => el * 0.012)
    .filter((el) => el > 1)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumInterest.textContent = `${inst}$`;
};
interest(account4.movements);

// LECTURES

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
