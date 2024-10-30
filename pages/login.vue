<template>
  <div>
    <FormInput label="email" v-model="login.email" />
    <FormInput label="password" v-model="login.password" />
    <button class="btn" @click="handleLogin()">Login</button>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async handleLogin() {
      const res = await this.$axios.$post("login-refresh-token", this.login);
      Cookies.set("token", res.token);
      Cookies.set("refresh_token", res.refresh_token);
      this.$store.commit("auth/setLogin");
    },
  },
};
</script>

<style lang="scss" scoped></style>
