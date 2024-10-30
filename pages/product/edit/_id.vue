<template>
  <div class="container mx-auto">
    <NuxtLink to="/product-list"> Back to List </NuxtLink>
    <h1 class="text-2xl font-bold mb-3">Edit Product {{ id }}</h1>
    <div class="product-edit">
      <div class="mb-5">
        <FormInput label="Title" v-model="title" />
      </div>
      <div class="mb-5">
        <!-- <FormInput label="price" v-model="price" /> -->
        <FormCurrencyInput label="price" v-model="price" />
        {{ price }}
      </div>
      <div class="mb-5">
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          ref="thumb"
          @change="onThumbnailChange()"
        />
      </div>
      <div class="mb-5">
        <!-- <FormTextarea label="description" v-model="description" /> -->
        <FormCustomCkeditor v-model="description" />
        <div v-html="description"></div>
      </div>

      <button v-if="id == 0" class="btn" @click="handleSubmit('create')">
        Create
      </button>
      <button v-else class="btn" @click="handleSubmit('update')">Update</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      title: "",
      price: "",
      thumb: {},
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
      this.description = res.data.description;
    }
  },
  methods: {
    handleSubmit: function (type) {
      const formData = new FormData();
      const router = this.$router;
      formData.append("title", this.title);
      formData.append("price", this.price);
      if (this.thumb) {
        formData.append("thumb", this.thumb);
      }
      formData.append("description", this.description);

      switch (type) {
        case "create":
          this.$axios.$post(`/product`, formData).then((res) => {
            router.push(`/product/edit/${res.data.productId}`);
          });
          break;
        case "update":
          this.$axios.$put(`/product/${this.id}`, formData).then((res) => {
            console.log(res);
            // router.push(`/product/${this.id}`);
          });
          break;
      }
    },

    onThumbnailChange: function () {
      this.thumb = this.$refs.thumb.files[0];
    },
  },
};
</script>
