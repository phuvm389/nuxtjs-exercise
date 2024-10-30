<template>
  <ProductDetail
    :id="id"
    :title="title"
    :price="price"
    :thumb="thumb"
    :description="description"
  />
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      title: "",
      price: "",
      thumb: "",
      description: "",
    };
  },
  async asyncData({ params }) {
    const id = params.id;
    return { id };
  },
  async fetch() {
    if (this.id != 0) {
      const res = await this.$axios.$get(`/product/${this.id}`);
      this.title = res.data.title;
      this.price = res.data.price;
      this.thumb = res.data.thumb;
      this.description = res.data.description;
    }
  },

  head() {
    return {
      title: this.title,
    };
  },
};
</script>
