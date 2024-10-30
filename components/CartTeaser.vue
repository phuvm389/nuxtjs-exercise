<template lang="">
  <div>
    <div>
      {{ cart.totalProducts }} Product(s):
      {{ cart.totalPrice | dollarFormat() }}
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      // arrow functions can make the code very succinct!
      cart: (state) => state.cart,
    }),
  },
};
</script>
