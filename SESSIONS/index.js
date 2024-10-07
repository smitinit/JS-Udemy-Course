//All =======================================

// let strinG = "Hello i m 👇";
// let firstName = "Smit";

// console.dir(strinG);
// console.dir(firstName);

// let age = 19;
// let man = true;

// let undifined;
// console.log(undifined);
// console.log(typeof undifined);

// let name = "smit";

// console.log(typeof null);

// let ageLet = 19;
// ageLet += ageLet;
// console.log(ageLet);

// const ageConst = 1;
//  ageConst += 1;

// var job = "programmer";
// job = 90;
// console.log(job);
// console.log(2 ** 2); //  2^2

//STRING CONCATE ==========================================

// let firstName = "smit";
// let lastName = " patel";
// console.log(firstName.concat(lastName));

//TEMPLETE STRING ======================================

// const now = 2024;
// const firstName = "Smit";
// const job = "Web Developer";
// const birthDate = 2009;
// const age = now - birthDate;

// const smit = "i'm " + firstName + ", " + "a " + age + " year old " + job + "!";
// const smit = `i'm ${firstName}, a ${age} year old ${job}!`;
// console.log(smit);

//IF ELSE =========================================

// const now = 2024;
// const birthDate = 2009;
// const age = now - birthDate;

// const isNotMinor = age >= 18;
// const yearLeft = 18 - age;
// let year = yearLeft > 1 ? "years" : "year";

// if (isNotMinor) {
//   console.log("valid for driving license, you are above 18 years.");
// } else {
//   console.log(
//     `Ineligible for driving license, wait another ${yearLeft} ${year}`
//   );
// }

// TYPE CONVERSION ================IMPPP=======================

// console.log(String(NaN), typeof NaN)
// console.log(Number(NaN))
// console.log(22 + 22); // number + number = number   (only for '+')
// console.log("22" + 22); // string + number = string
// console.log("22" + "22"); // string + string = string

// console.log(22 - 22); // number - number = number   ('-' or '*' or '/')
// console.log("22" - 22); // string - number = number
// console.log("22" - "22"); // string - string = number

// console.log(22 + "22" - 22); // example ans=>2200

// FALSY VALUES  ================================================

// 0,undefined,null,NaN,'' =>false values

// console.log(Boolean(NaN));
// console.log(Boolean(0));
// console.log(Boolean(undefined));
// console.log(Boolean(null));
// console.log(Boolean(""));

//'filled' {}   //truthyss
// console.log(Boolean("smit"));
// console.log(Boolean({}));

// [[[==]]]&[[[===]]]============================================

// console.log("18" == 18); //true (loose)
// console.log("18" === 18); //false (strict)

// const firstName = prompt("Write yr first name");

// console.log(`Hello ${firstName},`);
// if (firstName == "smit") {
//   console.log(`!cool u r the choosen one!`);
// } else if (firstName === "smp") {
//   console.log(`legend..`);
// } else {
//   console.log(`u suck!!`);
// }

//LOGICs ==================[&& || true and false]==============

// const hasDrivinglicense = true;

// const hasGoodVision = true;
// const isTired = false;
// // const firstName = prompt("whats yr name?");
// const firstName = `Smit`;
// if (hasGoodVision && hasDrivinglicense && !isTired) {
//   console.log(`${firstName} is able is drive without any problem!!`);
// } else if ((!hasGoodVision || isTired) && hasDrivinglicense) {
//   console.log(`${firstName} , u can drive but can't be trusted :)`);
// } else {
//   console.log(`Someone else should take over!`);
// }

//SWITCH CASE =================================================

// const day = "friday";
// switch (day) {
//   case "monday":
//     console.log("its monday😀");
//     break;
//   case "tuesday":
//     console.log("due");
//     break;
//   case "wednesday":
//     console.log("lunch outside at windis");
//     break;
//   case "thursday":
//     console.log("dinner outside at mcdonalds");
//     break;
//   case "friday":
//     console.log("skip");
//   case "saturday":
//     console.log("a holiday probably");
//     break;
//   case "sunday":
//     console.log("Funday");
//     break;
//   default:
//   console.log("invalid day");
// }                          //[if else w switch case]

// if (day === "monday") console.log("its monday😀");
// else if (day === "tuesday") console.log("due");
// else if (day === "wednesday") console.log("lunch outside at windis");
// else if (day === "thursday") console.log("dinner outside at mcdonalds");
// else if (day === "friday" || day === "saturday") {
//   console.log("skip for friday");
//   console.log("a holiday probably");
// } else if (day === "sunday") console.log("Funday");
// else console.log("Invalid day");

// TERNARY OPERATOR    =================================================

// const age = 20;
// const legal = age >= 18 ? " drink vine" : " drink water";

// // console.log(legal);
// console.log(`u can ${age >= 18 ? "drink vine" : "drink water"}`);

// const bill = 275;
// const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
// const finalString = `The bill was ${bill}, the tip was ${tip}, and the total value ${
//   bill + tip
// }`;
// console.log(finalString);

//===========================================
// console.log("Hello World");
