const initialState = { cartItems: [], total: 0 };

const cartReducer = (state = initialState, action) => {
  switch(action.type) {
    case "cart/added":
      const existingCartItem = state.cartItems.find(item => item.id === action.payload.id);
      let updatedCartItems;
      if(existingCartItem) {
        updatedCartItems = state.cartItems.map(item => 
          item.id === action.payload.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
        );
      } else {
        updatedCartItems = [...state.cartItems, { ...action.payload, quantity: 1 }];
      }
      
      
      const newTotal = updatedCartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
      return { ...state, cartItems: updatedCartItems, total: newTotal };

    case "cart/removed":
      const updatedItems = state.cartItems.filter(item => item.id !== action.payload);
      
    
      const removedTotal = updatedItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
      return { ...state, cartItems: updatedItems, total: removedTotal };

    case "cart/calculate Total":
      const total = state.cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
      return { ...state, total };

    default:
      return state;
  }
};

export default cartReducer;
