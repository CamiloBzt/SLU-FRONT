<template>
  <v-text-field
    ref="inputRef"
    :prefix="prefix"
    :suffix="suffix"
    :error-messages="errorMessages"
    :placeholder="placeholder"
    :class="css"
    :readonly="readonly"
    :disabled="disabled"
    :label="label"
    @blur="onBlur()"
  />
</template>

<script>
import { watch } from '@vue/composition-api';
import { useCurrencyInput } from 'vue-currency-input';

export default {
  name: 'CurrencyInput',
  props: {
    value: {
      type: Number | String,
      default: null,
    },
    options: {
      type: Object,
      default: () => {},
    },
    prefix: {
      type: String,
      default: null,
    },
    suffix: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    errorMessages: {
      type: Function | Array,
      default: () => {},
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    css: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { inputRef, setOptions, setValue } = useCurrencyInput(
      props.options
    );

    watch(
      () => props.value,
      (value) => {
        setValue(value);
      }
    );

    watch(
      () => props.options,
      (options) => {
        setOptions(options);
      }
    );

    return { inputRef };
  },
  methods: {
    onBlur() {
      this.$emit('blur');
    },
    onChange() {
      this.$emit('change');
    },
  },
};
</script>