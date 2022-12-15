const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_SESSION":
      return {
        ...state,
        sessionData: action.payload,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [ ...state.cart,{...action.payload, qty:1}],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(c=>c.id !== action.payload.id),
      };
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.filter(c=>c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty),
      };
    default:
      return state;
  }
};

export default Reducer;
