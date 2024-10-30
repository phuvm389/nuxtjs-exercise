<template lang="">
  <div class="product-detail mx-auto container py-5">
    <NuxtLink to="/product-list"> Back to List </NuxtLink>
    <CartTeaser />
    <div class="flex flex-wrap">
      <div class="w-4/12">
        <img :src="`http://localhost:5000/${thumb}`" />
      </div>
      <div class="w-8/12 pl-8">
        <h1 class="mb-4">{{ title }}</h1>
        <div class="my-4">{{ price | dollarFormat() }}</div>
        <div class="my-4">
          <CartButton :theme="`btn`" :id="id" :title="title" :price="price">
            <span>Add To Cart</span>
          </CartButton>
        </div>
        <div class="my-4" v-html="description"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["id", "title", "price", "description", "thumb"],
};
</script>
