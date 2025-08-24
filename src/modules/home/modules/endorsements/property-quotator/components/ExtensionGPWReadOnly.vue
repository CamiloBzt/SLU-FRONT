<template>
  <div class="endorsement-wrapper">
    <!-- Endorsement date -->
    <div class="input-row">
      <div class="inner-title">Endorsement date</div>

      <div class="input-col">
        <v-text-field
          v-model="data.endorsementEffectiveDate"
          label="Endorsement effective date"
          readonly
        />
      </div>

      <div class="input-col">
        <v-text-field v-model="data.expiryDate" label="Expiry date" readonly />
      </div>

      <div class="input-col">
        <v-text-field :value="data.days" label="Days" readonly />
      </div>
    </div>

    <!-- Installments -->
    <div class="input-row">
      <div class="inner-title">Installments</div>

      <PremiumPaymentWarranty :readonly="true" />
    </div>

    <!-- Reason -->
    <div class="input-row">
      <div class="inner-title">Reason</div>
      <v-textarea
        v-model="data.reason"
        readonly
        auto-grow
        solo
        flat
        background-color="#EDF2F8"
        counter="500"
      />
    </div>
  </div>
</template>

<script>
import PremiumPaymentWarranty from "../modules/deductions-change/detail/components/PremiumPaymentWarranty.vue";

export default {
  name: "ExtensionGPWReadOnly",
  components: {
    PremiumPaymentWarranty,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/ExtensionGPW.less";
</style>
