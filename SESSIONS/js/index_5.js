'use strict';
function toggleTheme() {
  document.querySelector('body').classList.toggle('lightTheme');
}
document.querySelector('.toggle-btn').addEventListener('click', toggleTheme);

const bookings = [];

const createBooking = function (
  flightNumber = 'Not Provided',
  numPassengers = 0,
  price = 199 * numPassengers
) {
  const booking = {
    flightNumber,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
  console.log(bookings);
};

// createBooking('f567', 656);
// createBooking('f567');
// createBooking(null, 32);

const matches = document.querySelectorAll('span');
function hack() {
  document.querySelector('#start').textContent = 'Double Click To Stop!';
  matches.forEach(item => {
    setInterval(() => {
      item.textContent = `${Math.trunc(Math.random() * 100000000000000)}`;

      item.style.color = `rgb(${Math.trunc(Math.random() * 200) + 1}, ${
        Math.trunc(Math.random() * 255) + 1
      }, ${Math.trunc(Math.random() * 255) + 1})`;

      const x = 2 - (Math.trunc(Math.random() * 2) + 1) === 1 ? 255 : 0;
      document.querySelector(
        'body'
      ).style.backgroundColor = `rgb(${x}, ${x}, ${x})`;
    }, 50);
  });
}

document.getElementById('start').addEventListener('click', hack);
document.getElementById('start').addEventListener('dblclick', function () {
  document.location.reload();
});

function updateDisplay(event) {
  let x = event.pageX;
  let y = event.pageY;
  document.querySelector('.circle').style.top = `${y}px`;
  document.querySelector('.circle').style.left = `${x}px`;
  // console.log(x, y);
}

// document
//   .querySelector('.container')
//   .addEventListener('mousemove', updateDisplay, false);
// document
//   .querySelector('.container')
//   .addEventListener('mouseenter', updateDisplay, false);
// document
//   .querySelector('.container')
//   .addEventListener('mouseleave', updateDisplay, false);

const dots = document.querySelectorAll('.circle');
document.querySelector('#dont').addEventListener('click', function () {
  dots.forEach(item => {
    setInterval(() => {
      let x = Math.trunc(Math.random() * window.screen.width);
      let y = Math.trunc(Math.random() * window.screen.availHeight);
      item.style.top = `${y}px`;
      item.style.left = `${x}px`;
    }, 1);
  });
});
