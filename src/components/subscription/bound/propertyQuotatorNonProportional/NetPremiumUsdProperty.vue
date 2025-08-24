<template>
  <div class="net-premium-cont">
    <div class="title-cont">
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
      <div class="table__column" v-if="isColombia">
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
        <div class="input input--total">
          {{ calculates.LTATotal() }}
        </div>
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
        <div class="input input--total">
          {{ calculates.otherTotal() }}
        </div>
      </div>

      <!-- Net premium -->
      <div class="table__column">
        <div class="input input--title">Net Premium</div>
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
        <div class="input input--total">
          <div class="input input--total">
            {{ calculates.netTotal() }}
          </div>
        </div>
      </div>

      <!-- Net premium excluding fronting -->
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
        <div class="input input--total">
          <div class="input input--total">
            {{ calculates.totalNetPremiumExcludingFronting() }}
          </div>
        </div>
      </div>

      <!-- SLU Premium to be invoiced -->
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
        <div class="input input--total">
          <div class="input input--total">
            {{ calculates.totalSluPremiumToBeInvoiced() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";

// Tienda
import { mapGetters } from "vuex";

//utils
import Decimal from "@/lib/decimal";

//Services
import { getNetPremiumOriginalCurrencyById } from "./services/NetPremiunProperty/net-premiun-property.service.js";
import NetPremiumService from "@/modules/home/services/net-premium.service";

//clase
import NetPremiumNonPro from "@/application/class/NetPremiumNONPRO";

export default {
  name: "NetPremiumUsdProperty",
  components: { CurrencyInput },
  props: {
    netPremiumProperty: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      subscriptionId: this.$route.params.subscriptionId,
      sluLine: 0,
      premium: {},
      deductions: {},
      isColombia: true,
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
    };
  },
  computed: {
    ...mapGetters(["subscription_id"]),
    calculates() {
      return new NetPremiumNonPro(this.premium, this.deductions, this.sluLine, true);
    },
  },
  methods: {
    async getInitialValues() {
      //Services
      const netPremium = await getNetPremiumOriginalCurrencyById({ id_subscription: this.subscription_id });

      //Calc
      if (netPremium !== undefined) {
        this.netPremium = { ...this.netPremium, ...netPremium };
        const selectedLayer = netPremium.Layers[0] ? netPremium.Layers[0] : {};
        //Need parseFloat
        const sluLine = selectedLayer.slu_share ? parseFloat(selectedLayer.slu_share.replace(/[^0-9.]/g, "")) : 0;
        this.sluLine = sluLine;

        const premium = selectedLayer.premium ? parseFloat(selectedLayer.premium.replace(/[^0-9.]/g, "")) : 0;
        const total = netPremium.QuotationInsured ? parseFloat(netPremium.QuotationInsured.total.replace(/[^0-9.]/g, "")) : 0;
        const propertyDamage = netPremium.QuotationInsured ? parseFloat(netPremium.QuotationInsured.property_damage.replace(/[^0-9.]/g, "")) : 0;
        const businessInterruption = netPremium.QuotationInsured ? parseFloat(netPremium.QuotationInsured.business_interruption.replace(/[^0-9.]/g, "")) : 0;
        const stock = netPremium.QuotationInsured ? parseFloat(netPremium.QuotationInsured.stock.replace(/[^0-9.]/g, "")) : 0;
        const porcentaje = netPremium.QuotationInsured && netPremium.QuotationInsured.stock_percentaje ? parseFloat(netPremium.QuotationInsured.stock_percentaje.replace(/[^0-9.]/g, "")) : 0;
        //Not need parseFloat
        const brokerage = netPremium.Quotation ? netPremium.Quotation.brokerage : 0;
        const taxes = netPremium.Quotation ? netPremium.Quotation.taxes : 0;
        const eng = netPremium.Quotation ? netPremium.Quotation.eng : 0;
        const fronting = netPremium.Quotation ? netPremium.Quotation.fronting : 0;
        const premiumReserve = netPremium.Quotation ? netPremium.Quotation.premium_reserve : 0;
        const lta = netPremium.Quotation ? netPremium.Quotation.lta : 0;
        const others = netPremium.Quotation ? netPremium.Quotation.others : 0;
        const deductionType = netPremium.Quotation ? netPremium.Quotation.deduction_type : "As Incurred";

        const rate = !isNaN((premium / total) * 1000) ? (premium / total) * 1000 : 0;
        const rateStock = !isNaN((premium / total) * 10 * porcentaje) ? (premium / total) * 10 * porcentaje : 0;

        //premium en original currency

        const premiumDamage = Decimal.mul(propertyDamage, rate).div(1000).toNumber() || 0;
        const premiumBI = !isNaN((businessInterruption * rate) / 1000) ? (businessInterruption * rate) / 1000 : 0;
        const premiumStock = Decimal.mul(stock, rateStock).div(1000).toNumber() || 0;
        const exchange = netPremium.Quotation ? parseFloat(netPremium.Quotation.exchange_rate.replace(/[^0-9.]/g, "")) : 0;

        this.deductions = {
          brokerage,
          taxes,
          eng,
          fronting,
          premiumReserve,
          lta,
          others,
          deductionType,
        };

        this.premium = {
          propertyDamage: premiumDamage,
          businessInterruption: premiumBI,
          stock: premiumStock,
          propertyDamageUsd: Decimal.div(premiumDamage, exchange).toNumber(),
          businessInterruptionUsd: Decimal.div(premiumBI, exchange).toNumber(),
          stockUsd: Decimal.div(premiumStock, exchange).toNumber(),
        };
      }
    },
  },
  async beforeMount() {
    await this.getInitialValues();
  },
  async updated() {
    const data = this.calculates.getData();
    await NetPremiumService.addOrUpdateNetPremium(this.subscriptionId, data, true);
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/Subscription/BoundRefactored.less";
.back {
  background: red;
}
.net-premium-cont {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  .title-cont {
    display: flex;
    justify-content: flex-start;
    align-items: center;
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
}

@media (max-width: 650px) {
}
</style>
