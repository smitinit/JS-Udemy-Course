"use strict";

// BANKIST APP
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR€",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Smit Patel",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 6718,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "INR₹",
  locale: "en-US",
};

const accounts = JSON.parse(localStorage.getItem("Accounts")) ?? [
  account1,
  account2,
];

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
const btnTransac = document.querySelector(".form__btn--transac");
const btnAddAccount = document.querySelector(".form__btn--add__acc");
const btnNewAccount = document.querySelector(".btn--submit-form");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
const inputTransac = document.querySelector(".form__input--Transac");

const form = document.querySelector("#accountForm");
// GLOBALS
let newAccount = {};
let sortedState = false;
let selectedAccount, timer;

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

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const sortedmovs = sort
    ? acc.movements.slice().sort((a, z) => a - z) // .slice() is for generating a new array!
    : acc.movements;

  sortedmovs.forEach((el, i) => {
    const type = el > 0 ? "deposit" : "withdrawal";
    const date = new Date(acc.movementsDates[i]);
    const day = `${date.getDay()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    const displayDate = `${day}/${month}/${year}`;

    let html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
     <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${el.toFixed(2)}${acc.currency.slice(
      -1
    )}</div>
        </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const displayTotalBalance = (acc) => {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance} ${acc.currency
    .split("₹")
    .join()
    .replace(",", "")}`;
};

const displaySummary = (acc) => {
  const IN = acc.movements
    .filter((el) => el > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${IN.toFixed(2)}${acc.currency.slice(-1)}`;

  const OUT = acc.movements
    .filter((el) => el < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${OUT.toFixed(2)}${acc.currency.slice(-1)}`;

  let inst = acc.movements
    .filter((el) => el > 0)
    .map((el) => el * (acc.interestRate / 100))
    .filter((el) => el > 1)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumInterest.textContent = `${inst.toFixed(2)}${acc.currency.slice(-1)}`;
};

const updateUI = function (selectedAccount) {
  // console.log(selectedAccount);
  displayMovements(selectedAccount);
  displayTotalBalance(selectedAccount);
  displaySummary(selectedAccount);
};

btnNewAccount.addEventListener("click", function (e) {
  e.preventDefault();

  let formData = new FormData(form);
  for (let [key, value] of formData) {
    newAccount[key] = value;
  }
  if (newAccount.owner === "" && newAccount.pin === "") return;

  newAccount.movements = newAccount.movements
    .split(",")
    .map((mov) => +mov)
    .filter((mov) => mov !== 0);

  //Generates Dates

  if (newAccount.movementsDates === "") {
    newAccount.movementsDates = [];
    newAccount.movements.map(() => {
      const date = new Date().toISOString();
      newAccount.movementsDates.push(date);
    });
  }

  // updateUI(newAccount);
  // containerApp.style.opacity = 100;
  // Update accounts array
  accounts.push(newAccount);
  selectedAccount = newAccount;
  storeAccounts(accounts);

  formData = {};
  newAccount = {};

  document.querySelector(".add_acc_form").classList.toggle("hidden");
  labelWelcome.textContent = `Account added, Log in to get started!`;
  createUserName(accounts);
});

const setTimer = () => {
  const ti = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = "Log in to get started";
    }
    time--;
  };
  let time = 10 * 60;
  ti();
  const timer = setInterval(ti, 1000);
  return timer;
};

const stayLoggedIn = function (selectedAcc = account1) {
  selectedAccount = selectedAcc;

  const now = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  };
  labelDate.textContent = new Intl.DateTimeFormat(
    selectedAccount.locale,
    options
  ).format(now);

  inputLoginUsername.value = inputLoginPin.value = "";
  inputLoginPin.blur();

  if (timer) clearInterval(timer);
  timer = setTimer();

  updateUI(selectedAccount);
  containerApp.style.opacity = 100;
};

// stayLoggedIn(account2);

function Login(e) {
  e.preventDefault();

  selectedAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (+selectedAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      selectedAccount.owner.split(" ")[0]
    }!`;
    const now = new Date();
    // const locale = navigator.language;
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      selectedAccount.locale,
      options
    ).format(now);

    // labelDate.textContent = `${
    //   day < 10 ? "0" + day : day
    // }/${month}/${year}, ${hours}:${min}`;

    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    if (timer) clearInterval(timer);
    timer = setTimer();
    updateUI(selectedAccount);
  } else {
    labelWelcome.textContent = `Can't find, add an account to get started!`;
    inputLoginUsername.value = inputLoginPin.value = "";
    containerApp.style.opacity = 0;
  }
}

const storeAccounts = function (allAccounts) {
  localStorage.setItem("Accounts", JSON.stringify(allAccounts));
};
// -----------------------------------------------------------------EVENTS

btnLogin.addEventListener("click", (e) => Login(e));

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
    selectedAccount.movementsDates.push(new Date().toISOString());
    receiveracc.movementsDates.push(new Date().toISOString());
    updateUI(selectedAccount);
    clearInterval(timer);
    timer = setTimer();
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
    storeAccounts(accounts);
  }
  inputClosePin.value = inputCloseUsername.value = "";
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    selectedAccount.movements.some((mov) => mov >= (amount * 10) / 100)
  ) {
    setTimeout(function () {
      selectedAccount.movementsDates.push(new Date().toISOString());
      selectedAccount.movements.push(amount);
      updateUI(selectedAccount);
    }, 3000);
  }
  inputLoanAmount.value = "";
});

// btnTransac.addEventListener("click", function (e) {
//   e.preventDefault();
//   const newTransac = +inputTransac.value;
//   selectedAccount.movements.push(newTransac); // TODO
//   updateUI(selectedAccount);
// });

// SORTING MOVEMENTS

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(selectedAccount, !sortedState);
  sortedState = !sortedState;
});

btnAddAccount.addEventListener("click", function () {
  document.querySelector(".add_acc_form").classList.toggle("hidden");
});

// LECTURES

/*
console.log(0.1 + 0.2);

console.log(Number("21"));
console.log(+"21");
console.log(~~"21");
console.log(Number.parseInt("111px", 2));

//MATH

console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.round(23.3));
console.log(Math.ceil(23.3));
console.log(Math.floor(23.3));
console.log(Math.round(23.3));

console.log(+(23.2312).toFixed(2));
*/

// console.log(5 % 2);
// console.log(5 / 2); // 5 = 2 * 2 + [1 (R)]

// console.log(6 % 2);
// console.log(6 / 2); // 6 = 2 * 3 + [0 (R)]

// const isEven = (num) => num % 2 === 0;
// console.log(isEven(28));
// console.log(isEven(33));

// labelBalance.addEventListener("click", function () {
//   [...document.querySelectorAll(".movements__row")].forEach((el, i) => {
//     !isEven(i)
//       ? (el.style.backgroundColor = "pink")
//       : (el.style.backgroundColor = "yellow");
//   });
// });

const diameter = 287_460_000_000;
const diameter1 = 287_460_000_000;
// console.log(diameter);
// console.log(Number("23000"));

// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER);
// console.log(2 ** 53 + 2);

// console.log(701605496049804904904909049090490494904904904n + BigInt(1)); //BIG INT
// console.log(20n > 100);
// console.log(20n === 20);
// console.log(typeof 20n);
