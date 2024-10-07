'use strict';

const modal = document.querySelector('.modal');
const showbtn = document.querySelectorAll('.show');
const closebtn = document.querySelector('.close');
const overlay = document.querySelector('.overlay');

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
function openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

for (let i = 0; i < showbtn.length; i++) {
  showbtn[i].addEventListener('click', openModal);
}

closebtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
