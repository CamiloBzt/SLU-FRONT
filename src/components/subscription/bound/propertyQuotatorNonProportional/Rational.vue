<template>
  <v-expansion-panels class="sub-expansion-component">
    <v-expansion-panel @change="deepDisabled">
      <v-expansion-panel-header
        @click="changeSubExpansion"
        class="expansion-title d-flex justify-start"
        expand-icon=""
      >
        <template v-slot:actions>
          <div class="sub-icon-cont d-flex justify-start align-center">
            <v-icon class="icon-expand mr-1">
              {{ iconSubExpansion }}
            </v-icon>
            <div class="sub-expansion-title">Rational</div>
          </div>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="expand-content">
          <div class="title-text-area">Offer Comments*</div>
          <textarea
            v-model.trim="rationalComments"
            @blur="updateByColumn('rational_comments', $event.target.value)"
            @input="
              $emit('rational-comments-change', rationalCommentsCompleted)
            "
          ></textarea>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { stateExpansiveManager } from "@/mixins/subscription.js";
// Tienda
import { mapGetters } from "vuex";
//Services
import {
  findBoundBySubscription,
  updateChange,
} from "./services/PremiumPaymentWarranty/premium-payment.service.js";

export default {
  name: "Rational",
  mixins: [stateExpansiveManager],
  inject: ["deepDisabled"],
  data() {
    return {
      rationalComments: "",
      id: 0,
    };
  },
  computed: {
    ...mapGetters(["subscription_id", "boundEng"]),
    rationalCommentsCompleted() {
      return this.rationalComments && this.rationalComments.trim().length > 0;
    },
  },
  watch: {
    rationalCommentsCompleted: {
      handler(newValue) {
        this.$emit("rational-comments-change", newValue);
      },
      immediate: true,
    },

    // También observar cambios directos en rationalComments
    rationalComments: {
      handler() {
        this.$nextTick(() => {
          this.$emit(
            "rational-comments-change",
            this.rationalCommentsCompleted
          );
        });
      },
    },
  },
  async mounted() {
    //Vuex Constants
    const typeBound = this.boundEng ? this.boundEng.typeBound : 1;

    //Services
    const bound = await findBoundBySubscription({
      id: this.subscription_id,
      typeBound: typeBound,
    });
    this.rationalComments = bound
      ? bound.bound.rational_comments
      : this.rationalComments;
    this.id = bound ? bound.bound.id : this.id;

    // Emitir estado inicial de validación
    this.$nextTick(() => {
      this.$emit("rational-comments-change", this.rationalCommentsCompleted);
    });
  },
  methods: {
    async updateByColumn(column, data) {
      const res = await updateChange({
        id: this.id,
        tableName: "bound",
        column,
        dataValue: data.toString(),
      });
      this.rationalComments = data;

      // Forzar re-evaluación de la validación
      this.$forceUpdate();
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyleRefactored.less";
@import "~@/assets/style/Subscription/BoundRefactored.less";
</style>
