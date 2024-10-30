export const state = () => ({
  isLoggedIn: false,
  userName: "",
});

export const mutations = {
  setLogin(state) {
    state.isLoggedIn = true;
  },

  setLogout(state) {
    state.isLoggedIn = false;
  },
};
