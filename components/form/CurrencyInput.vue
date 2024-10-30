<template>
  <div class="mb-5">
    <label v-if="label">{{ label }}</label>
    <input ref="inputRef" type="text" />
  </div>
</template>

<script>
import { watch } from "vue";
import { useCurrencyInput } from "vue-currency-input";

export default {
  name: "CurrencyInput",
  props: ["label", "value"],
  setup(props) {
    const { inputRef, setValue } = useCurrencyInput({
      currency: "USD",
      hideCurrencySymbolOnFocus: false,
      hideGroupingSeparatorOnFocus: false,
      hideNegligibleDecimalDigitsOnFocus: false,
    });

    watch(
      () => props.modelValue, // Vue 2: props.value
      (value) => {
        setValue(value);
      }
    );

    return { inputRef };
  },
  mounted() {
    this.$refs.inputRef.value = this.value;
  },
};
</script>
