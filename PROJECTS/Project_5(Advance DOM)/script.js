'use strict';

///////////////////////////////////////

// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', e => {
  // const slcords = section1.getBoundingClientRect();
  // console.log(e.target.getBoundingClientRect());

  // window.scrollTo(
  //   slcords.left + window.pageXOffset,
  //   slcords.top + window.pageYOffset
  // );
  // window.scrollTo({ ///old school
  //   left: slcords.left + window.pageXOffset,
  //   top: slcords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' }); //new
});

// document.querySelectorAll('.nav__link').forEach(el => { // // /  / // / / // not a good method
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' }); //new
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // hard advance!!
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  // console.log(clicked);

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
const handleFade = (e, opacity) => {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

const navbar = document.querySelector('.nav');
navbar.addEventListener('mouseover', e => handleFade(e, 0.5));
navbar.addEventListener('mouseout', e => handleFade(e, 1));
/*
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);
// console.log(document.getElementsByTagName('button'));

const message = document.createElement('div');
const header = document.querySelector('.header');

message.classList.add('cookie-message');
// message.textContent = `We use cookies for improvements!` //method 1
message.innerHTML = `We use cookies for improvements!. <button class = 'btn btn--close-cookie'>Got it!</button>`; //method 2

header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.parentElement.removeChild(message)); //old school
// .addEventListener('click', () => message.remove()); //new method ez one

message.style.backgroundColor = '#37383d';

// document.documentElement.style.setProperty('--color-primary', 'orangered');
*/

// const h1 = document.querySelector('h1');
// h1.closest('.header').style.background = 'var( --gradient-secondary)';
// h1.ne;
