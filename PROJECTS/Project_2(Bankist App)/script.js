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
  owner: "Smit Patel",
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

const displayTotalBalance = (acc) => {
  acc.balance = acc.movements.reduce((acc, cur, _, arr) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance} USD`;
};

const displaySummary = (acc, n) => {
  const IN = acc.movements
    .filter((el) => el > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${IN}$`;

  const OUT = acc.movements
    .filter((el) => el < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(OUT)}$`;

  let inst = acc.movements
    .filter((el) => el > 0)
    .map((el) => el * (acc.interestRate / 100))
    .filter((el) => el > 1)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumInterest.textContent = `${inst.toPrecision(5)}$`;
};

const updateUI = function (selectedAccount) {
  displayMovements(selectedAccount.movements);
  displayTotalBalance(selectedAccount);
  displaySummary(selectedAccount);
};

let selectedAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  selectedAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (selectedAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      selectedAccount.owner.split(" ")[0]
    }!`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    updateUI(selectedAccount);
  } else {
    inputLoginUsername.value = inputLoginPin.value = "";
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to get started`;
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiveracc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferTo.value = inputTransferAmount.value = "";
  inputTransferAmount.blur();
  if (
    amount > 0 &&
    receiveracc &&
    selectedAccount.balance >= amount &&
    receiveracc?.username !== selectedAccount.username
  ) {
    selectedAccount.movements.push(-amount);
    receiveracc.movements.push(amount);

    updateUI(selectedAccount);
  }
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    selectedAccount &&
    Number(inputClosePin.value) === selectedAccount.pin &&
    inputCloseUsername.value == selectedAccount.username
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === selectedAccount.username
    );

    accounts.slice(index, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to get started`;
  }
  inputClosePin.value = inputCloseUsername.value = "";
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    selectedAccount.movements.some((mov) => mov >= (amount * 10) / 100)
  ) {
    selectedAccount.movements.push(amount);
    updateUI(selectedAccount);
  }
  inputLoanAmount.value = "";
});

const numbers = [1, 2, 3, , 5, 4, 75, 785, 67, 563, 85, 68, 8, 647, 8];
console.log(numbers.sort());
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
