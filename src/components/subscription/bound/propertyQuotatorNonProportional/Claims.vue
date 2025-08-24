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
            <div class="sub-expansion-title">Claims</div>
          </div>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="expand-content justify-center">
          <div class="wrapper horizontal-scroll">
            <div class="claims-cont">
              <div class="line border-bottom">
                <div class="input-row small bold-text">Year</div>
                <div class="input-row medium bold-text">Amount In USD</div>
                <div class="input-row large bold-text">Notes</div>
              </div>

              <div class="line" v-for="(item, key) in ClaimsArray" :key="key">
                <div class="input-row small light">{{ item.date }}*</div>
                <div class="input-row medium">
                <currency-input
                  v-model="item.amount"
                  :options="currencyOptions"
                  @blur="updateByColumn('amount', item.amount, item.sub)"
                  @input="$emit('bound-claims-change', boundClaimsCompleted)"
                  :error-messages="requiredNestedInputParent('amount', 'ClaimsArray', key)"
                  hint="Required field"
                  persistent-hint
                />
                </div>
                <div class="input-row large">
                  <v-text-field
                    v-model="item.select"
                    @blur="updateByColumn('select', item.select, item.sub)"
                    @input="$emit('bound-claims-change', boundClaimsCompleted)"
                    clearable
                  />
                </div>
              </div>

              <div class="separator" />

              <div class="line">
                <div class="input-row small bold-text blue-clr">Total</div>
                <div class="input-row medium bold-text justify-start">
                  <currency-input v-model="total" :options="currencyOptions" />
                </div>
                <div class="input-row large justify-space-between bold-text">
                  <span> $ 0 </span>
                  <!-- <span>
                    It does not present claims for being a new project
                  </span> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { getClaims } from "./services/mock-claims.service.js";
import { stateExpansiveManager } from "@/mixins/subscription.js";
/* Components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
/* Tienda */
import { mapGetters } from "vuex";
/* validations */
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { formValidations } from "@/mixins/formValidations";
// Services
import {
  getBoundClaims,
  updateBoundClaim,
} from "./services/Claims/claims.service.js";
import { getCatalog } from "@/constants/catalogs/services/catalogs.service.js";

export default {
  name: "Claims",
  components: { CurrencyInput },
  mixins: [stateExpansiveManager, validationMixin, formValidations],
  inject: ["deepDisabled"],
  data() {
    return {
      ClaimsArray: [],
      catalogRazonClaim: [],
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
      total: 0,
      id: 0,
    };
  },
  async beforeMount() {
    //Catalogs
    const catalogRazonClaim = await getCatalog({ name: "razon_claim" });
    this.catalogRazonClaim = catalogRazonClaim ? catalogRazonClaim : [];

    //Services
    const boundClaims = await getBoundClaims(this.subscription_id, "property");

    //Convert to array
    if (boundClaims) {
      this.id = boundClaims.id;
      this.ClaimsArray = [
        {
          id: 1,
          sub: "six",
          amount: parseFloat(boundClaims.amount_six) || 0,
          date: boundClaims.date_six,
          select: boundClaims.select_six,
        },
        {
          id: 2,
          sub: "five",
          amount: parseFloat(boundClaims.amount_five) || 0,
          date: boundClaims.date_five,
          select: boundClaims.select_five,
        },
        {
          id: 3,
          sub: "four",
          amount: parseFloat(boundClaims.amount_four) || 0,
          date: boundClaims.date_four,
          select: boundClaims.select_four,
        },
        {
          id: 4,
          sub: "three",
          amount: parseFloat(boundClaims.amount_three) || 0,
          date: boundClaims.date_three,
          select: boundClaims.select_three,
        },
        {
          id: 5,
          sub: "two",
          amount: parseFloat(boundClaims.amount_two) || 0,
          date: boundClaims.date_two,
          select: boundClaims.select_two,
        },
        {
          id: 6,
          sub: "one",
          amount: parseFloat(boundClaims.amount_one) || 0,
          date: boundClaims.date_one,
          select: boundClaims.select_one,
        },
      ];
      this.total = this.ClaimsArray.reduce((a, b) => a + (b["amount"] || 0), 0);
    }
  },
  computed: {
    ...mapGetters(["subscription_id"]),
    boundClaimsCompleted() {
      return this.ClaimsArray.every((item) => {
        const amountComplete = !!(
          item.amount !== null &&
          item.amount !== undefined &&
          Number(item.amount) >= 0 &&
          !isNaN(Number(item.amount))
        );
        return amountComplete;
      });
    },
  },
  validations: {
    ClaimsArray: {
      $each: {
        amount: { required },
      },
    },
  },
  watch: {
    boundClaimsCompleted: {
      handler(newValue) {
        this.$emit("bound-claims-change", newValue);
      },
      immediate: true,
    },

    // También observar cambios en ClaimsArray
    ClaimsArray: {
      handler() {
        this.$nextTick(() => {
          this.$emit("bound-claims-change", this.boundClaimsCompleted);
        });
      },
      deep: true,
    },

    // Observar cambios en el total
    total: {
      handler() {
        this.$nextTick(() => {
          this.$emit("bound-claims-change", this.boundClaimsCompleted);
        });
      },
    },
  },
  methods: {
    async updateByColumn(column, data, sub) {
      const id = this.id;
      const total = this.ClaimsArray.reduce(
        (a, b) => a + (b["amount"] || 0),
        0
      );
      const count = this.ClaimsArray.filter((a) => a.amount !== null).length;
      const avg = total / count;
      this.total = total;
      const columna = column + "_" + sub;
      await updateBoundClaim(
        this.id,
        columna.toString(),
        data.toString(),
        "property"
      );
      await updateBoundClaim(
        this.id,
        "total_amount_usd",
        total.toString(),
        "property"
      );
      await updateBoundClaim(
        this.id,
        "average_amount_usd",
        avg.toString(),
        "property"
      );
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyleRefactored.less";
@import "~@/assets/style/Subscription/BoundRefactored.less";
.wrapper {
  margin: auto;
  width: 70%;
  padding: 20px 0;
  .claims-cont {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;

    .line {
      .flex();
      width: 100%;
      height: 50px;
      justify-content: space-between;

      .input-row {
        .flex();
        height: 100%;
      }

      /*Largo de los contenedores*/
      .small {
        width: 15%;
      }
      .large {
        width: 55%;
      }
      .medium {
        width: 25%;
      }

      .bold-text {
        justify-content: center;
        font-weight: 600;
        font-size: 16px;
      }

      .light {
        color: #547fa9;
        font-size: 14px;
      }
      .blue-clr {
        color: #547fa9;
      }
    }

    .border-bottom {
      height: 70px;
      border-bottom: solid 1px #a8bfd9;
      margin-bottom: 15px;
    }
    .separator {
      width: 100%;
      border-bottom: solid 1px #a8bfd9;
      margin-top: 20px;
    }
  }
}
@media (max-width: 900px) {
  .wrapper {
    width: 85%;
    overflow-x: scroll;
    overflow-y: hidden;
    .claims-cont {
      width: 700px;
    }
  }
}
</style>
