<template lang="">
  <button :class="theme" @click="handleAddToCart">
    <slot></slot>
  </button>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: ["theme", "id", "title", "price"],
  methods: {
    ...mapMutations({
      addProduct: "cart/addProduct",
    }),
    handleAddToCart: function (type) {
      this.addProduct({
        productId: this.id,
        title: this.title,
        price: this.price,
      });
    },
  },
};
</script>
