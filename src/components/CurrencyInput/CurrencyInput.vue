<template>
  <v-text-field
    ref="inputRef"
    :prefix="prefix"
    :suffix="suffix"
    :error-messages="normalizedErrorMessages"
    :placeholder="placeholder"
    :class="css"
    :readonly="readonly"
    :disabled="disabled"
    :label="label"
    :hint="hint"
    :persistent-hint="persistentHint"
    @blur="onBlur()"
  />
</template>

<script>
import { watch, computed } from "@vue/composition-api";
import { useCurrencyInput } from "vue-currency-input";

export default {
  name: "CurrencyInput",
  props: {
    value: {
      type: [Number, String],
      default: null,
    },
    options: {
      type: Object,
      default: () => ({
        currency: "USD",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      }),
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
      type: [Function, Array],
      default: () => [],
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
      default: "",
    },
    hint: {
      type: String,
      default: null,
    },
    persistentHint: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const safeOptions = {
      currency: props.options?.currency || "USD",
      currencyDisplay: props.options?.currencyDisplay || "narrowSymbol",
      locale: props.options?.locale || "en-US",
    };

    const { inputRef, setOptions, setValue } = useCurrencyInput(safeOptions);

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

    //Protección contra funciones o valores inesperados
    const normalizedErrorMessages = computed(() => {
      if (Array.isArray(props.errorMessages)) {
        return props.errorMessages;
      } else if (typeof props.errorMessages === "function") {
        const result = props.errorMessages();
        return Array.isArray(result) ? result : [];
      }
      return [];
    });

    return {
      inputRef,
      normalizedErrorMessages,
    };
  },
  methods: {
    onBlur() {
      this.$emit("blur");
    },
    onChange() {
      this.$emit("change");
    },
  },
};
</script>
