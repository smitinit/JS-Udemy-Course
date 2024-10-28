// console.log('Exporting Module');

let arr = [];

export function pushToCart(item, quantity) {
  if (arr.flatMap(itm => itm.item).includes(item)) {
    console.log(`Item ${item} already exist in cart!! `);
    return;
  }
  arr.push({ item, quantity });
  return console.log(`${item} pushed to cart with quantity of ${quantity}`);
}

export const allInCart = () => console.log('CART: ', arr);

export function updateSpecificItem(item, quantity) {
  arr.map(itm => {
    if (itm.item === item) {
      itm.quantity = quantity;
      return console.log(`Updated ${itm.item}'s quantity with ${itm.quantity}`);
    }
  });
}

export function removeItem(item) {
  arr = arr.filter(itm => itm.item !== item);
  console.log(`\n Removed ${item} and Updated Cart! \n`);
}

// EXTRA
const a = 10;
export default a; //if u default export it can be imported via any name!!

const totalPrice = 20;
const totalQuantity = 100;
export { totalPrice as tp, totalQuantity }; // use of as to change name!
