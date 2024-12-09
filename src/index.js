import { createStore } from "redux";
import cartReducer from "./cartReducer";

const store = createStore(cartReducer);

store.subscribe(() => {
  console.log(store.getState());
  updateCart()
});

const productList = document.querySelector("#productList");
const cartList = document.querySelector("#cartList")
const totalCost = document.querySelector("#totalCost")

const products = [
  { id: 1, name: "Product A", price: 10 },

  { id: 2, name: "Product B", price: 20 },

  { id: 3, name: "Product C", price: 15 },
];

window.addProductToCart = (productId) => {
  const product = products.find(prod => prod.id === productId)
  store.dispatch({type: "cart/added", payload: product})
  
}

const renderProduct = () => {
productList.innerHTML = products
    .map(
      (product) => `<li>${product.name} - Rs.${product.price}
         <button onClick="addProductToCart(${product.id})">Add To Cart</button></li>`
    )
    .join("");
};
renderProduct();

 window.removeItemHandler = (productId) => {
    store.dispatch({type: "cart/removed", payload: productId})
    store.dispatch({type: "cart/calculate Total"})
    updateCart()

}

const updateCart = () => {
    const state = store.getState()
    cartList.innerHTML = state.cartItems.map(item => 
        `<li>${item.name} - Rs.${item.price} - Quantity:${item.quantity} <button onClick="removeItemHandler(${item.id})">Remove</button></li>`)
        .join("")

    totalCost.textContent = `Total: ${state.total}`
}
updateCart()
