<template lang="">
  <div>
    <button
      class="btn mr-2"
      :disabled="currentPage == 1"
      @click="handleClick(currentPage - 1)"
    >
      {{ "<" }}
    </button>
    <template v-for="pager in pagers">
      <button
        class="btn mr-2"
        :disabled="pager == currentPage || pager == '...'"
        @click="handleClick(pager)"
      >
        {{ pager }}
      </button>
    </template>
    <button
      class="btn mr-2"
      :disabled="currentPage == totalPage"
      @click="handleClick(currentPage + 1)"
    >
      {{ ">" }}
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pagers: [],
    };
  },
  props: ["currentPage", "totalPage"],
  methods: {
    handleClick: function (pager) {
      // console.log("pager", pager);
      this.$emit("input", pager);
    },
  },
  created() {
    let pagers = [];
    const totalPage = this.totalPage;
    const currentPage = this.currentPage;
    for (let i = 1; i <= totalPage; i++) {
      const lastNum = i % 10;
      if (i == 1 || i == 10) {
        pagers.push(i);
      }
      if (currentPage < 3 && i > 1 && i <= 5) {
        pagers.push(i);
      }
      if (i == currentPage - 3) {
        pagers.push("...");
      }
      if (i >= currentPage - 2 && i < currentPage + 3 && !pagers.includes(i)) {
        pagers.push(i);
      }
      if (i == currentPage + 3) {
        pagers.push("...");
      }
      if (!pagers.includes(i) && i <= totalPage && lastNum == 0) {
        pagers.push(i);
      }
    }
    this.pagers = pagers;
  },
};
</script>
