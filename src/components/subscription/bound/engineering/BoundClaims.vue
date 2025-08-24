<template>
  <v-expansion-panels class="SubExpansionComponent">
    <v-expansion-panel @change="deepDisabled">
      <v-expansion-panel-header
        @click="changeSubExpansion"
        class="ExpansionTitle d-flex justify-start"
        expand-icon=""
      >
        <template v-slot:actions>
          <div class="subIconCont d-flex justify-start align-center">
            <v-icon class="iconExpand mr-1">
              {{ iconSubExpansion }}
            </v-icon>
            <div class="SubExpansionTitle">Claims</div>
          </div>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent justify-center">
          <div class="ClaimsCont d-flex justify-center align-start flex-wrap">
            <div class="Line BorderBottom">
              <div class="Row Small Bold">Year</div>
              <div class="Row Medium Bold">Amount In USD</div>
              <div class="Row Large Bold">Notes</div>
            </div>

            <div class="Line" v-for="(item, key) in computedYears" :key="key">
              <div class="Row Small Light">{{ item.year }}*</div>
              <div class="Row Medium">
                <currency-input
                  v-model="item.model"
                  :options="currencyOptions"
                  @input="update(key, item.model)"
                  @blur="
                    $v.computedYears.$each[key].model.$touch();
                    saveData(key, 'columnModel', item.model);
                  "
                  :error-messages="requiredNestedInputParent('model', 'computedYears', key)"
                  hint="Required field"
                  persistent-hint
                />
              </div>
              <div class="Row Large">
                <v-text-field
                  v-model="item.razonClaim"
                  @blur="saveData(key, 'columnRazon', item.razonClaim)"
                  :disabled="razon_claim.length === 0"
                  clearable
                />
              </div>
            </div>

            <div class="Separator" />

            <div class="Line">
              <div class="Row Small Bold Blue">Total</div>
              <div class="Row Medium Bold justify-start">
                {{ formatNumber(computedSumYears) }}
              </div>
              <div class="Row Large justify-space-between Bold">
                <span> $ 0 </span>
                <!-- <span>
                  It does not present claims for being a new project
                </span> -->
              </div>
            </div>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { stateExpansiveManager } from "@/mixins/subscription.js";
/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
/* libs */
import Decimal from "decimal.js";
import { mapActions, mapGetters } from "vuex";
/* validations */
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { formValidations } from "@/mixins/formValidations";
/* lodash */
import { debounce } from "lodash";

export default {
  name: "BoundClaims",
  components: { CurrencyInput },
  mixins: [stateExpansiveManager, validationMixin, formValidations],
  inject: ["deepDisabled"],
  data() {
    return {
      uno: null,
      dos: null,
      currentYear: new Date().getFullYear(),
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
      formatter: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }),
      sumYears: 0,
      computedYears: [],
    };
  },
  async mounted() {
    await this.getCatalogByName({ name: "razon_claim" });
    const type = this.propEng ? "property" : "engineering";
    await this.getBoundClaims(type);

    const current = this.boundClaims;
    const years = [current.dateTwo, current.dateOne];
    const models = ["Two", "One"];
    if (this.propEng)
      years.unshift(
        current.dateSix,
        current.dateFive,
        current.dateFour,
        current.dateThree
      ) && models.unshift("Six", "Five", "Four", "Three");

    this.computedYears = years.map((value, index) => {
      const modelIndex = models[index];
      return {
        id: current.id,
        year: value,
        model: current[`amount${modelIndex}`],
        razonClaim: current[`select${modelIndex}`],
        columnModel: `amount${modelIndex}`,
        columnRazon: `select${modelIndex}`,
      };
    });
  },
  computed: {
    ...mapGetters([
      "accountInformation",
      "risk_type",
      "razon_claim",
      "boundClaims",
      "quotation",
    ]),
    // type of risk
    selectedRisk: {
      get() {
        if (
          this.accountInformation.typeOfRisk &&
          this.risk_type &&
          this.risk_type.length > 0
        ) {
          const typeObj = this.risk_type.find(
            (v) => v.id === this.accountInformation.typeOfRisk
          );
          return typeObj;
        }
        return 0;
      },
    },
    selectedRiskKey() {
      return this.selectedRisk.key || "";
    },
    propEng() {
      const valid = ["PRO", "CPE", "CECR"];
      if (valid.includes(this.selectedRiskKey)) return true;
      return false;
    },
    // filtered by risk
    claimsItems() {
      /** @type {Array} */
      const items = this.razon_claim;
      if (this.propEng && this.razon_claim.length > 0) return items;
      return items.splice(0, 2);
    },
    computedYears() {
      const current = this.boundClaims;
      const years = [current.dateTwo, current.dateOne];
      const models = ["Two", "One"];
      if (this.propEng)
        years.unshift(
          current.dateSix,
          current.dateFive,
          current.dateFour,
          current.dateThree
        ) && models.unshift("Six", "Five", "Four", "Three");

      const data = years.map((value, index) => {
        const modelIndex = models[index];
        return {
          id: current.id,
          year: value,
          model: current[`amount${modelIndex}`],
          razonClaim: current[`select${modelIndex}`],
          columnModel: `amount${modelIndex}`,
          columnRazon: `select${modelIndex}`,
        };
      });
      return data;
    },
    computedSumYears: {
      get() {
        return this.sumYears;
      },
      set(value) {
        this.sumYears = value;
      },
    },
    boundClaimsCompleted() {
      return this.computedYears.every((item) => {
        const amountComplete = !!(
          item.model &&
          Number(item.model) >= 0 &&
          !isNaN(Number(item.model))
        );
        return amountComplete;
      });
    },
  },
  methods: {
    ...mapActions(["getCatalogByName", "getBoundClaims", "updateBoundClaim"]),
    update(key, value) {
      /** @type {Array} */
      this.computedYears[key].model = value;

      this.$forceUpdate();

      const data = this.computedYears;
      const total = data.reduce((previous, current) => {
        const sum = new Decimal(previous || 0)
          .add(current.model || 0)
          .toDecimalPlaces(4);

        return sum.toNumber();
      }, 0);

      this.computedSumYears = total;
    },
    async saveData(key, column, value) {
      const type = this.propEng ? "property" : "engineering";
      await this.updateBoundClaim({
        id: this.computedYears[key].id,
        column: this.computedYears[key][column],
        value,
        type,
      });
    },
    formatNumber(value) {
      const formatted = this.formatter.format(value);
      return formatted;
    },
  },
  validations: {
    computedYears: {
      $each: {
        model: { required },
      },
    },
  },
  watch: {
    computedSumYears: debounce(async function (value) {
      const type = this.propEng ? "property" : "engineering";
      await this.updateBoundClaim({
        id: this.boundClaims.id,
        column: "totalAmountUsd",
        value,
        type,
      });
      await this.updateBoundClaim({
        id: this.boundClaims.id,
        column: "averageAmountUsd",
        value,
        type,
      });
    }, 1000),

    boundClaimsCompleted: {
      handler(newValue) {
        this.$emit("bound-claims-change", newValue);
      },
      immediate: true,
    },

    // También observar cambios en computedYears
    computedYears: {
      handler() {
        this.$nextTick(() => {
          this.$emit("bound-claims-change", this.boundClaimsCompleted);
        });
      },
      deep: true,
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";
@import "~@/assets/style/Subscription/Bound.less";
.ClaimsCont {
  width: 70%;
  height: auto;

  .Line {
    .flex();
    width: 100%;
    height: 50px;
    justify-content: space-between;

    .Row {
      .flex();
      height: 100%;
    }

    /*Largo de los contenedores*/
    .Small {
      width: 15%;
    }
    .Large {
      width: 55%;
    }
    .Medium {
      width: 25%;
    }

    .Bold {
      justify-content: center;
      font-weight: 600;
      font-size: 15px;
    }

    .Light {
      color: #547fa9;
      font-size: 14px;
    }
    .Blue {
      color: #547fa9;
    }
  }

  .BorderBottom {
    height: 70px;
    border-bottom: solid 1px #a8bfd9;
    margin-bottom: 15px;
  }
  .Separator {
    width: 100%;
    border-bottom: solid 1px #a8bfd9;
    margin-top: 20px;
  }
}
</style>
