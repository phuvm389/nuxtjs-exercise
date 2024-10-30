<template>
  <div class="mb-5">
    <label>{{ label }}</label>
    <textarea
      class="border border-black p-2"
      type="text"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
      rows="4"
      cols="50"
    />
  </div>
</template>

<script>
export default {
  props: ["label", "value"],
};
</script>

<style lang="scss" scoped></style>
