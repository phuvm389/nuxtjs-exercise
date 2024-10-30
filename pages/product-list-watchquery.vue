<template>
  <div class="product-list container mx-auto">
    <div class="product-list__top m-5 flex flex-wrap">
      <div class="w-8/12">
        <h1 class="mb-4">Product List</h1>
        <div class="product-list__search flex flex-wrap">
          <span class="py-2">Search:</span>
          <div>
            <input
              type="text"
              v-model="query.search"
              placeholder="Search Product name"
            />
          </div>
          <span class="py-2">Price From:</span>
          <FormCurrencyInput v-model="query.priceFrom" />
          <span class="py-2">To:</span>
          <FormCurrencyInput v-model="query.priceTo" />
        </div>
      </div>
      <div class="w-4/12">
        <CartTeaser />
        <div>
          <NuxtLink to="/product/edit/0"> Add new product </NuxtLink>
        </div>
      </div>
    </div>
    <div v-if="items.length > 0" className="product-list__list m-5">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>
              <button
                @click="
                  handleQuery({
                    orderBy: 'title',
                    isAscending: query.isAscending == 'true' ? 'false' : 'true',
                  })
                "
              >
                Name
                <span v-if="query.orderBy == 'title'" v-html="arrowAsc"></span>
              </button>
            </th>
            <th>
              <button
                @click="
                  handleQuery({
                    orderBy: 'price',
                    isAscending: query.isAscending == 'true' ? 'false' : 'true',
                  })
                "
              >
                Price
                <span v-if="query.orderBy == 'price'" v-html="arrowAsc"></span>
              </button>
            </th>
            <th>
              <button
                @click="
                  handleQuery({
                    orderBy: 'date',
                    isAscending: query.isAscending == 'true' ? 'false' : 'true',
                  })
                "
              >
                Updated At
                <span v-if="query.orderBy == 'date'" v-html="arrowAsc"></span>
              </button>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.productId">
            <td>{{ item.productId }}</td>
            <td class="w-52">
              <img :src="`http://localhost:5000/${item.thumb}`" />
            </td>
            <td>
              <NuxtLink :to="`/product/${item.productId}`">
                {{ item.title }}
              </NuxtLink>
            </td>
            <td>{{ item.price | dollarFormat() }}</td>
            <td>{{ item.date | dateFormat() }}</td>
            <td>
              <CartButton
                :theme="`link`"
                :id="item.id"
                :title="item.title"
                :price="item.price"
              >
                <font-awesome-icon icon="fa-cart-plus" />
              </CartButton>

              <NuxtLink :to="`/product/edit/${item.productId}`">
                <font-awesome-icon icon="fa-pencil-alt" />
              </NuxtLink>

              <button class="link" @click="handleOpenModal(item.productId)">
                <font-awesome-icon icon="fa-trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="product-list__pager m-5">
        Pager{{ totalPage }}
        <Pager
          :totalPage="totalPage"
          :currentPage="currentPage"
          v-model="query.page"
        />
        {{ query.page }}
      </div>
    </div>

    <modal name="my-modal">
      <div class="modal-content text-center p-5">
        <h2>It work's!</h2>

        <button class="btn ml-2" @click="$modal.hide('my-modal')">
          Cancel
        </button>
        <button class="btn" @click="handleDelete(deleteId)">Delete</button>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  data() {
    return {
      deleteId: 0,
      // items: [],
      // totalPage: 0,
      // currentPage: 0,
    };
  },
  // async asyncData({ query }) {
  //   query = {
  //     search: query.search ? query.search : "",
  //     priceFrom: query.priceFrom ? query.priceFrom : "",
  //     priceTo: query.priceTo ? query.priceTo : "",
  //     orderBy: query.orderBy ? query.orderBy : "",
  //     isAscending: query.isAscending ? query.isAscending : "true",
  //     page: query.page ? query.page : 1,
  //   };
  //   console.log("asyncData", query);
  //   return { query };
  // },
  // async fetch() {
  //   console.log("fetch", this.query);
  //   const result = "?" + new URLSearchParams(this.query).toString();
  //   const payload = await this.$axios.$get(`/product${result}`);
  //   // console.log(payload);
  //   this.items = payload.data;
  //   this.totalPage = Math.ceil(payload.total / payload.perPage);
  //   this.currentPage = this.query.page;
  // },
  async asyncData({ query, $axios }) {
    query = {
      search: query.search ? query.search : "",
      priceFrom: query.priceFrom ? query.priceFrom : "",
      priceTo: query.priceTo ? query.priceTo : "",
      orderBy: query.orderBy ? query.orderBy : "",
      isAscending: query.isAscending ? query.isAscending : "true",
      page: query.page ? query.page : 1,
    };
    console.log("asyncData", query);

    const result = "?" + new URLSearchParams(query).toString();
    const payload = await $axios.$get(`/product${result}`);
    // console.log(payload);
    const items = payload.data;
    const totalPage = Math.ceil(payload.total / payload.perPage);
    const currentPage = query.page;
    return { query, totalPage, currentPage, items };
  },
  methods: {
    handleQuery: function (property) {
      console.log(typeof this.query.isAscending);
      console.log("property", property);
      this.query = { ...this.query, ...property };
    },
    handleOpenModal: function (productId) {
      this.deleteId = productId;
      this.$modal.show("my-modal");
    },
    handleDelete: function (productId) {
      console.log(productId);
      const nuxtContext = this;
      if (productId != 0) {
        this.$axios.$delete(`/product/${productId}`).then((res) => {
          nuxtContext.$modal.hide("my-modal");
          nuxtContext.$nuxt.refresh();
        });
      }
    },
  },
  watchQuery: [
    "search",
    "priceFrom",
    "priceTo",
    "orderBy",
    "isAscending",
    "page",
  ],
  watch: {
    query: {
      handler: function (val, oldVal) {
        this.$router.replace({ query: { ...this.query } });
      },
      deep: true,
    },
    // "$route.query": "$fetch",
  },
  computed: {
    arrowAsc: function () {
      return this.query.isAscending == "true"
        ? "&#160;&#8593;"
        : "&#160;&#8595;";
    },
  },
};
</script>
