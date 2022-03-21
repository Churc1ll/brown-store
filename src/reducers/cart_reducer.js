import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempItem = state.cart.find((i) => i.id === id + color);
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = amount + cartItem.amount;
          newAmount > cartItem.max && (newAmount = cartItem.max);
          return {
            ...cartItem,
            amount: newAmount,
          };
        } else return cartItem;
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    let tempCart = state.cart.filter((i) => {
      return i.id !== action.payload;
    });

    return { ...state, cart: tempCart };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { value, id } = action.payload;
    let tempCart = state.cart;

    tempCart = tempCart.map((item) => {
      if (item.id === id) {
        let oldAmount = item.amount;
        let newAmount;

        if (value === 'inc') {
          oldAmount >= item.max
            ? (newAmount = item.max)
            : (newAmount = oldAmount + 1);
        }

        if (value === 'dec') {
          oldAmount <= 1 ? (newAmount = 1) : (newAmount = oldAmount - 1);
        }
        return { ...item, amount: newAmount };
      } else {
        return item;
      }
    });
    return { ...state, cart: tempCart };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;
        total.total_items += amount;
        total.total_amount += price * amount;
        return total;
      },
      { total_amount: 0, total_items: 0 }
    );
    return { ...state, total_items, total_amount };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
