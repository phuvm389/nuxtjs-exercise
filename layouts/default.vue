<template>
  <div class="page">
    <header>
      <div v-if="isLoggedIn == true">
        <NuxtLink to="/product-list"> Product </NuxtLink>
        <button class="btn" @click="handleLogout()">Logout</button>
      </div>
      <div v-else>
        <NuxtLink to="/login"> Login</NuxtLink>
      </div>
    </header>
    <Nuxt />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookies from "js-cookie";

export default {
  methods: {
    handleLogout() {
      Cookies.remove("token");
      Cookies.remove("refresh_token");
      this.$store.commit("auth/setLogout");
    },
  },

  computed: {
    ...mapState({
      // arrow functions can make the code very succinct!
      isLoggedIn: (state) => state.auth.isLoggedIn,
    }),
  },
};
</script>
