const cookieparser = process.server ? require("cookieparser") : undefined;

export const actions = {
  actionIncrement(context, payload) {
    console.log("context", context);
    // Api
    context.commit("increment");
  },

  nuxtServerInit(storeContext, nuxtContext) {
    const parsered = cookieparser.parse(nuxtContext.req.headers.cookie);
    if (parsered.token) {
      storeContext.commit("auth/setLogin");
    }
    if (parsered.cart) {
      storeContext.commit("cart/setCart", JSON.parse(parsered.cart));
    }
  },
};
