// console.log('Importing Module');

//EXPORTING AND IMPORTING SESSION (USE OF AS/*/DEFAULT...)

/** 
import {
  pushToCart,
  allInCart,
  updateSpecificItem,
  removeItem,
  tp,
  totalQuantity as tq,
} from './module_1.js';

// OR
import * as fm from './module_1.js'; // everything

// example
console.log(fm.totalQuantity, tp, tq, fm.tp);

//-------------------
import asdf from './module_1.js'; // importing default export via any name!!
console.log(asdf);
//-------------------

//--------------------
pushToCart('Apple', 10);
fm.pushToCart('Mango', 10); // /* example

allInCart();

updateSpecificItem('Apple', 1);
updateSpecificItem('Mango', 15);

allInCart();

pushToCart('Apple', 10);
pushToCart('Banana', 10);
pushToCart('Guava', 10);
pushToCart('Orange', 10);
pushToCart('Grapes', 10);
pushToCart('Dragon Fruit', 10);

allInCart();

updateSpecificItem('Banana', 102);
updateSpecificItem('Guava', 92);

allInCart();

removeItem('Apple');
removeItem('Banana');
removeItem('Grapes');

allInCart();
//--------------------

*/
