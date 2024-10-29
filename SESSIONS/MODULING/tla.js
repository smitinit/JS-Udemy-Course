// console.log('TLA');

// TOP LEVEL AWAIT WITHOUT ASYNC:: IT BLOCKS ALL OTHER PROCESS IN MODULE!!
// ! TLA BLOCKS OTHER PROCESSES

/** 
const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
const data = await res.json();

console.log(data);

const root = document.querySelector('#root');
data.map((d, i) =>
  root.insertAdjacentHTML(
    'beforebegin',
    `${i + 1}. `.padStart(5, '0') +
      d.body[0].toUpperCase() +
      d.body.slice(1) +
      '.' +
      '<br /><br />'
  )
);

const getLastPost = async function () {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
};

// THIS RETURNS A PROMISE AS IT IS ONLY FULFILLED, DATA IS NOT ARRIVED
const lastPost = getLastPost();
console.log(lastPost);

// ! NOT VERY CLEAN
// lastPost.then(last => console.log(last));

// * GOOD !
const lastPost2 = await getLastPost(); // TLA AWAIT
console.log(lastPost2);
*/
const shoppingCart = (function () {
  const cart = [];
  const shoppingCart = [];
  const totalPrice = 234;
  const quantity = 67;
  return {
    cart,
    shoppingCart,
    totalPrice,
    quantity,
  };
})();

console.log(shoppingCart.cart);
