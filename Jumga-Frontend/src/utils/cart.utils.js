export const addItemToCart = (cart, itemToAdd) => {
  let newCart;
  const existingCartItem = cart.find((item) => item.id === itemToAdd.id);
  if (existingCartItem) {
    newCart = cart.map((item) =>
      item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem(
      "inCart",
      JSON.stringify([...cart, { ...itemToAdd, quantity: 1 }])
    );
    return newCart;
  }

  localStorage.setItem(
    "inCart",
    JSON.stringify([...cart, { ...itemToAdd, quantity: 1 }])
  );
  return [...cart, { ...itemToAdd, quantity: 1 }];
};

export const decreaseItem = (cart, itemToRemove) => {
  let decreasedCart;
  const existingCartItem = cart.find((item) => item.id === itemToRemove.id);
  if (existingCartItem.quantity === 1) {
    decreasedCart = cart.filter((item) => item.id !== itemToRemove.id);
    localStorage.setItem("inCart", JSON.stringify(decreasedCart));
    return decreasedCart;
  }
  decreasedCart = cart.map((item) =>
    item.id === itemToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
  localStorage.setItem("inCart", JSON.stringify(decreasedCart));
  return decreasedCart;
};

export const filterItemFromCart = (cart, itemToAdd) => {
  let deletedCart;
  deletedCart = cart.filter((item) => item.id !== itemToAdd.id);
  localStorage.setItem("inCart", JSON.stringify(deletedCart));
};

export const getCartLength = (cart) =>
  cart.reduce((allQty, item) => allQty + item.quantity, 0);

export const getAmountToPay = (cart) => {
  let total;
  cart.reduce(
    (allQty, item) => (total = allQty + item.quantity * item.price),
    0
  );
  // console.log(total);
  localStorage.setItem("total", total);
};
