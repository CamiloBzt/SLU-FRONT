<template>
  <div class="Cont d-flex justify-center align-start flex-wrap">
    <div class="TitleCont d-flex justify-start align-center">
      <h5>Net Premium (USD)</h5>
    </div>
    <!--TABLA-->
    <div class="table horizontal-scroll">
      <!-- Labels -->
      <div class="table__column table__column--label">
        <div class="input input--title"></div>
        <div class="divider" />
        <div class="input input--label">Damage</div>
        <div class="input input--label">BI</div>
        <div class="input input--label">Stock</div>
        <div class="input input--label">Total</div>
      </div>

      <!-- SLU Share -->
      <div class="table__column">
        <div class="input input--title">SLU Share</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.damageSluShare()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.biSluShare()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.stocksSluShare()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">
          {{ calculates.sluShareTotal() }}
        </div>
      </div>

      <!-- Brokerage -->
      <div class="table__column">
        <div class="input input--title">Brokerage</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.damageBrokerage()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.biBrokerage()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.stocksBrokerage()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">
          {{ calculates.brokerageTotal() }}
        </div>
      </div>

      <!-- Taxes -->
      <div class="table__column">
        <div class="input input--title">Taxes</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.damageTaxes()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.biTaxes()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.stocksTaxes()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">
          {{ calculates.taxesTotal() }}
        </div>
      </div>

      <!-- Engineering Fees -->
      <div class="table__column">
        <div class="input input--title">Engineering Fees</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.damageEng()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.biEng()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.stocksEng()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">
          {{ calculates.engTotal() }}
        </div>
      </div>

      <!-- Fronting Fee -->
      <div class="table__column">
        <div class="input input--title">Fronting Fee</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.damageFronting()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.biFronting()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.stocksFronting()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">
          {{ calculates.frontingTotal() }}
        </div>
      </div>

      <!-- Premium Reserve -->
      <div class="table__column">
        <div class="input input--title">Premium Reserve</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.damageColombia()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.biColombia()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.stocksColombia()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">
          {{ calculates.colombiaTotal() }}
        </div>
      </div>
      <!-- LTA -->
      <div class="table__column">
        <div class="input input--title">LTA</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.damageLTA()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.biLTA()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.stocksLTA()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">{{ calculates.LTATotal() }}</div>
      </div>

      <!-- Others -->
      <div class="table__column">
        <div class="input input--title">Others</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.damageOther()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.biOther()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.stocksOther()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">{{ calculates.otherTotal() }}</div>
      </div>

      <!-- Net premium -->
      <div class="table__column">
        <div class="input input--title">Net premium</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.damageNet()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.biNet()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.stocksNet()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">{{ calculates.netTotal() }}</div>
      </div>

      <div class="table__column">
        <div class="input input--title">Net premium excluding fronting</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.damageNetPremiumExcludingFronting()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.businessInterNetPremiumExcludingFronting()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.stockNetPremiumExcludingFronting()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">{{ calculates.totalNetPremiumExcludingFronting() }}</div>
      </div>

      <div class="table__column">
        <div class="input input--title">SLU Premium to be invoiced</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.damageSluPremiumToBeInvoiced()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.businessInterSluPremiumToBeInvoiced()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.stockSluPremiumToBeInvoiced()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">{{ calculates.totalSluPremiumToBeInvoiced() }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";

/**services */
import NetPremiumService from "@/modules/home/services/net-premium.service";

/**strategies */
import netPremiumStrategy from "../class/NetPremiumPRO";

export default {
  name: "NetPremiumUsdProperty",
  components: { CurrencyInput },
  data() {
    return {
      subscriptionId: this.$route.params.subscriptionId,
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
      formatter: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }),
    };
  },
  async beforeMount() {
    await Promise.all([this.getCatalogByName({ name: "type_coverages" }), this.getCatalogByName({ name: "apply_sir" })]);
  },
  computed: {
    ...mapGetters(["deductions", "tiv", "premium", "boundInsurable", "boundInsurableProp", "accountInformation", "risk_type", "quotation"]),
    ...mapState({
      boundInsurableProp(state) {
        if (this.propEng) return state.boundInsurableProp;
        return state.boundInsurable;
      },
      tiv(state) {
        if (this.isNonProportional) return state.tivNon;
        return state.tiv;
      },
    }),
    isNonProportional() {
      const valids = [2, "2"];
      if (valids.includes(this.quotation.typeQuotation)) {
        return true;
      }
      return false;
    },
    // tipo de riesgo
    selectedRisk: {
      get() {
        if (this.accountInformation.typeOfRisk && this.risk_type && this.risk_type.length > 0) {
          const typeObj = this.risk_type.find((v) => v.id === this.accountInformation.typeOfRisk);
          return typeObj;
        }
        return 0;
      },
    },
    selectedRiskKey() {
      return this.selectedRisk.key || "";
    },
    typeSelect() {
      const valid = ["PRO", "CPE", "CECR"];
      if (valid.includes(this.selectedRiskKey)) return 1;
      return 2;
    },
    propEng() {
      const valid = ["PRO", "CPE", "CECR"];
      if (valid.includes(this.selectedRiskKey)) return true;
      return false;
    },
    // country
    isColombia() {
      const country = this.accountInformation.country;
      const valids = [13, "13"];
      if (valids.includes(country)) return true;
      return false;
    },
    /**
     * @template T {typeof import '../class/NetPremiumPRO' }
     * @returns {T}
     */
    calculates() {
      return new netPremiumStrategy(this.premium, this.deductions, this.boundInsurableProp, true);
    },
    // vuex aliases
    premiumDamage: {
      get() {
        return this.premium.propertyDamageUsd || 0;
      },
    },
    premiumBi: {
      get() {
        return this.premium.businessInterruptionUsd || 0;
      },
    },
    premiumStocks: {
      get() {
        return this.premium.stockUsd || 0;
      },
    },
  },
  methods: {
    ...mapActions(["getCatalogByName"]),
  },
  async updated() {
    const data = this.calculates.getData();
    await NetPremiumService.addOrUpdateNetPremium(this.subscriptionId, data, true);
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/Subscription/Bound.less";
.back {
  background: red;
}
.Cont {
  width: 100%;
  height: auto;
  .TitleCont {
    h5 {
      font-size: 20px;
      font-weight: 600;
    }
  }

  .table {
    width: 100%;
    height: auto;
    display: flex;
    overflow: auto;
    padding-bottom: 10px;

    &__column {
      min-height: min-content;
      flex: 0 0 18%;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      align-content: flex-start;
      flex-wrap: wrap;

      &--label {
        width: 150px;
        flex: initial;
        * {
          color: #547fa9;
        }
      }

      .input {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: left;
        padding: 0px 15px;
        margin-bottom: 5px;
        margin-top: 5px;
        &--title {
          font-weight: 600;
        }
        &--label {
          justify-content: flex-end;
        }
        &--total {
          font-weight: 600;
        }
      }

      .divider {
        width: 100%;
        height: 1px;
        background: #d2deed;
      }
    }
  }

  //Inputs
  .InputsCont {
    width: 100%;
    height: auto;
    margin-top: 20px;
    .InputCont {
      width: 19%;
      height: 50px;
      margin-right: 1%;
      margin-top: 10px;
    }
    .MiniInputCont {
      width: 10%;
      height: 50px;
      margin-right: 1%;
      margin-top: 10px;
    }
    .ExtraLarge {
      width: 47%;
      height: 50px;
      margin-top: 10px;
    }
    .ml {
      margin-right: 6%;
    }
  }

  //Comentarios
  .CommentsCont {
    width: 100%;
    height: auto;
    margin-top: 40px;

    .OfferTitle {
      width: 100%;
      height: auto;
      font-size: 14px;
      color: #547fa9;
    }
    .OfferText {
      width: 100%;
      height: 90px;
      border: solid 1px #547fa9;
      border-radius: 10px;
      padding: 7px 12px;
    }
    .OfferText:focus {
      outline: none;
    }
  }
}

@media (max-width: 650px) {
  .Cont {
    .InputsCont {
      .InputCont,
      .MiniInputCont {
        width: 100%;
        margin-top: 7px;
      }
    }
  }
}
</style>
