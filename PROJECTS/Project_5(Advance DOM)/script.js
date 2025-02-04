'use strict';
//dom selectors

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header');
const navbar = document.querySelector('.nav');

// Modal window
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

btnScrollTo.addEventListener('click', _ => {
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

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   // hard advance!!
//   if (e.target.classList.contains('nav__link')) {
//     e.preventDefault();
//     const id = e.target.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   }
// });

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

navbar.addEventListener('mouseover', e => handleFade(e, 0.5));
navbar.addEventListener('mouseout', e => handleFade(e, 1));

//intersection API

const navHeight = navbar.getBoundingClientRect().height;
const stickNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) navbar.classList.add('sticky');
  else navbar.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

const allSections = document.querySelectorAll('.section');
const revealSecrion = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSecrion, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
});

//image blur
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));

const slider = function () {
  // dom selection
  const slides = document.querySelectorAll('.slide');
  const btnlft = document.querySelector('.slider__btn--left');
  const btnrgt = document.querySelector('.slider__btn--right');
  const dots = document.querySelector('.dots');

  //global variables
  let currentSlide = 0;
  const maxSlide = slides.length;

  //base functions
  const createDots = function () {
    slides.forEach((_, i) =>
      dots.insertAdjacentHTML(
        'beforeend',
        `<button class= "dots__dot" data-slide="${i}"></button>`
      )
    );
  };
  const activateDots = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  const nextSlide = function () {
    currentSlide === maxSlide - 1 ? (currentSlide = 0) : currentSlide++;
    goToSlide(currentSlide);
    activateDots(currentSlide);
  };
  const preSlide = function () {
    currentSlide === 0 ? (currentSlide = maxSlide - 1) : currentSlide--;
    goToSlide(currentSlide);
    activateDots(currentSlide);
  };

  //starting funtion
  const init = function () {
    goToSlide(0);
    createDots();
    activateDots(0);
  };
  init();

  //listeners
  btnrgt.addEventListener('click', nextSlide);
  btnlft.addEventListener('click', preSlide);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') preSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dots.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDots(slide);
    }
  });
};
slider();

// ------------------------------------------------
//lecture

// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('ss');
// });

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = 'message';
// });

//snippets

// function(e){}
// function
// const  = function(){}
// console.log();
// document.querySelector('')
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
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (this.window.scrollY > initialCoords.top) navbar.classList.add('sticky');
//   else navbar.classList.remove('sticky');
// });
// const obsCallBack = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);
