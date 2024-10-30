import Cookies from "js-cookie";

export const state = () => ({
  totalProducts: 0,
  totalPrice: 0,
  products: [],
});

export const mutations = {
  setCart(state, payload) {
    state.products = payload.products;
    state.totalPrice = payload.totalPrice;
    state.totalProducts = payload.totalProducts;
  },
  addProduct(state, payload) {
    state.products.push(payload);
    state.totalPrice += payload.price;
    state.totalProducts += 1;
    Cookies.set(
      "cart",
      JSON.stringify({
        products: state.products,
        totalPrice: state.totalPrice,
        totalProducts: state.totalProducts,
      })
    );
  },
};
