// CREATE A DATE

//1.

// setInterval(() => {
//   const now = new Date();

//   console.log(now);
// }, 1000);

//2.
// console.log(new Date('jan 24, 2024'));

// console.log(new Date(3 * 24 * 60 * 60 * 1000));

const future = new Date();
console.log(future);

console.log(future.getFullYear());
console.log(future.getDay());
console.log(future.getSeconds());
console.log(future.getHours());
console.log(future.getMilliseconds());
console.log(future.getTime());
console.log(future.getMonth());
console.log(future.getTimezoneOffset());
console.log(future.toISOString());
