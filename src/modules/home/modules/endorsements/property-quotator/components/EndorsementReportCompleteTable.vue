<template>
  <table class="table-container">
    <thead>
      <tr class="header-row">
        <th class="title-table" colspan="30">Admitted premium</th>
      </tr>
      <tr class="sub-header">
        <th class="subtitle-table">Original Currency</th>
        <th colspan="7"></th>
        <th class="table-header">Share</th>
        <th class="table-header">Brokerage</th>
        <th class="table-header">tax</th>
        <th class="table-header">fronting</th>
        <th class="table-header" colspan="2">ENG fee</th>
        <th
          v-if="formatPercentage(deductibles.premiumReserve)"
          class="table-header"
        >
          Reserve
        </th>
        <th class="table-header">LTA</th>
        <th class="table-header">Others</th>
      </tr>
    </thead>
    <tbody>
      <tr class="data-row">
        <td colspan="8"></td>
        <td class="table-info">
          {{ formatPercentage(boundInsurableProp.sluLine) }}
        </td>
        <td class="table-info">
          {{ formatPercentage(deductibles.brokerage) }}
        </td>
        <td class="table-info">{{ formatPercentage(deductibles.taxes) }}</td>
        <td class="table-info">{{ formatPercentage(deductibles.fronting) }}</td>
        <td class="table-info" colspan="2">
          {{ formatPercentage(deductibles.eng) }}
        </td>
        <td
          v-if="formatPercentage(deductibles.premiumReserve)"
          class="table-info"
        >
          {{ formatPercentage(deductibles.premiumReserve) }}
        </td>
        <td class="table-info">{{ formatPercentage(deductibles.lta) }}</td>
        <td class="table-info">{{ formatPercentage(deductibles.others) }}</td>
      </tr>
      <tr class="data-row">
        <td colspan="30"></td>
      </tr>
    </tbody>
    <thead>
      <tr class="sub-header">
        <th rowspan="2"></th>
        <th colspan="2">TIV MOVEMENT</th>
        <th colspan="2">TIV TOTAL</th>
        <th colspan="2">Rate</th>
        <th class="table-header" colspan="2">Total Premium</th>
        <th class="table-header" colspan="2">Premium SLU</th>
        <th class="table-header" colspan="2">Brokerage</th>
        <th class="table-header" colspan="2">tax</th>
        <th class="table-header" colspan="2">fronting</th>
        <th class="table-header" colspan="2">ENG</th>
        <th
          v-if="formatCurrency(netPremium.colombiaTotal)"
          class="table-header"
          colspan="2"
        >
          Reserve
        </th>
        <th class="table-header" colspan="2">LTA</th>
        <th class="table-header" colspan="2">Others</th>
        <th class="table-header" colspan="2">Net Premium</th>
        <th class="table-header" colspan="2">SLU Premium to be invoiced</th>
        <th class="table-header" colspan="2">Net premium excluding fronting</th>
      </tr>
    </thead>
    <tbody>
      <tr class="data-row highlight">
        <td class="table-header currency">Damage</td>
        <td colspan="2">{{ formatCurrency(movementValues.damage) }}</td>
        <td colspan="2">{{ formatCurrency(totalValues.damage) }}</td>
        <td colspan="2">{{ formatCurrency(premium.propertyDamageRate) }}</td>
        <td colspan="2">{{ formatCurrency(premium.propertyDamage) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.damageSluShare) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.damageBrokerage) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.damageTaxes) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.damageFronting) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.damageEng) }}</td>
        <td v-if="formatCurrency(netPremium.damageColombia)" colspan="2">
          {{ formatCurrency(netPremium.damageColombia) }}
        </td>
        <td colspan="2">{{ formatCurrency(netPremium.damageLTA) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.damageOther) }}</td>
        <td colspan="2">
          {{ formatCurrency(netPremium.damageNet) }}
        </td>
        <td colspan="2">
          {{ formatCurrency(netPremium.damageSluPremiumToBeInvoiced) }}
        </td>
        <td colspan="2">
          {{ formatCurrency(netPremium.damageNetPremiumExcludingFronting) }}
        </td>
      </tr>
      <tr class="data-row highlight">
        <td class="table-header currency">BI</td>
        <td colspan="2">{{ formatCurrency(movementValues.bi) }}</td>
        <td colspan="2">{{ formatCurrency(totalValues.bi) }}</td>
        <td colspan="2">
          {{ formatCurrency(premium.businessInterruptionRate) }}
        </td>
        <td colspan="2">{{ formatCurrency(premium.businessInterruption) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.biSluShare) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.biBrokerage) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.biTaxes) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.biFronting) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.biEng) }}</td>
        <td v-if="formatCurrency(netPremium.biColombia)" colspan="2">
          {{ formatCurrency(netPremium.biColombia) }}
        </td>
        <td colspan="2">{{ formatCurrency(netPremium.biLTA) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.biOther) }}</td>
        <td colspan="2">
          {{ formatCurrency(netPremium.biNet) }}
        </td>
        <td colspan="2">
          {{ formatCurrency(netPremium.businessInterSluPremiumToBeInvoiced) }}
        </td>
        <td colspan="2">
          {{
            formatCurrency(netPremium.businessInterNetPremiumExcludingFronting)
          }}
        </td>
      </tr>
      <tr class="data-row highlight">
        <td class="table-header currency">Stocks</td>
        <td colspan="2">{{ formatCurrency(movementValues.stocks) }}</td>
        <td colspan="2">{{ formatCurrency(totalValues.stocks) }}</td>
        <td colspan="2">
          {{ formatCurrency(premium.stockRate) }}
        </td>
        <td colspan="2">{{ formatCurrency(premium.stock) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.stocksSluShare) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.stocksBrokerage) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.stocksTaxes) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.stocksFronting) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.stocksEng) }}</td>
        <td v-if="formatCurrency(netPremium.stocksColombia)" colspan="2">
          {{ formatCurrency(netPremium.stocksColombia) }}
        </td>
        <td colspan="2">{{ formatCurrency(netPremium.stocksLTA) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.stocksOther) }}</td>
        <td colspan="2">
          {{ formatCurrency(netPremium.stocksNet) }}
        </td>
        <td colspan="2">
          {{ formatCurrency(netPremium.stockSluPremiumToBeInvoiced) }}
        </td>
        <td colspan="2">
          {{ formatCurrency(netPremium.stockNetPremiumExcludingFronting) }}
        </td>
      </tr>
      <tr class="totals-row">
        <td class="table-header currency">Total</td>
        <td class="highlight" colspan="2">
          {{ formatCurrency(movementValues.total) }}
        </td>
        <td colspan="2">{{ formatCurrency(totalValues.total) }}</td>
        <td colspan="2"></td>
        <td colspan="2">{{ formatCurrency(premium.total) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.sluShareTotal) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.brokerageTotal) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.taxesTotal) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.frontingTotal) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.engTotal) }}</td>
        <td v-if="formatCurrency(netPremium.colombiaTotal)" colspan="2">
          {{ formatCurrency(netPremium.colombiaTotal) }}
        </td>
        <td colspan="2">{{ formatCurrency(netPremium.LTATotal) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.otherTotal) }}</td>
        <td colspan="2">
          {{ formatCurrency(netPremium.netTotal) }}
        </td>
        <td colspan="2">
          {{ formatCurrency(netPremium.totalSluPremiumToBeInvoiced) }}
        </td>
        <td colspan="2">
          {{ formatCurrency(netPremium.totalNetPremiumExcludingFronting) }}
        </td>
      </tr>
    </tbody>
    <thead>
      <tr class="header-row">
        <th class="title-table" colspan="30"></th>
      </tr>
      <tr class="sub-header">
        <th class="subtitle-table">USD</th>
        <th colspan="7"></th>
        <th class="table-header">Share</th>
        <th class="table-header">Brokerage</th>
        <th class="table-header">tax</th>
        <th class="table-header">fronting</th>
        <th class="table-header" colspan="2">ENG fee</th>
        <th
          v-if="formatPercentage(deductibles.premiumReserve)"
          class="table-header"
        >
          Reserve
        </th>
        <th class="table-header">LTA</th>
        <th class="table-header">Others</th>
      </tr>
    </thead>
    <tbody>
      <tr class="data-row">
        <td colspan="8"></td>
        <td class="table-info">
          {{ formatPercentage(boundInsurableProp.sluLine) }}
        </td>
        <td class="table-info">
          {{ formatPercentage(deductibles.brokerage) }}
        </td>
        <td class="table-info">{{ formatPercentage(deductibles.taxes) }}</td>
        <td class="table-info">{{ formatPercentage(deductibles.fronting) }}</td>
        <td class="table-info" colspan="2">
          {{ formatPercentage(deductibles.eng) }}
        </td>
        <td
          v-if="formatPercentage(deductibles.premiumReserve)"
          class="table-info"
        >
          {{ formatPercentage(deductibles.premiumReserve) }}
        </td>
        <td class="table-info">{{ formatPercentage(deductibles.lta) }}</td>
        <td class="table-info">{{ formatPercentage(deductibles.others) }}</td>
      </tr>
      <tr class="data-row">
        <td colspan="30"></td>
      </tr>
    </tbody>
    <thead>
      <tr class="sub-header">
        <th rowspan="2"></th>
        <th colspan="2">TIV MOVEMENT</th>
        <th colspan="2">TIV TOTAL</th>
        <th colspan="2">Rate</th>
        <th class="table-header" colspan="2">Total Premium</th>
        <th class="table-header" colspan="2">Premium SLU</th>
        <th class="table-header" colspan="2">Brokerage</th>
        <th class="table-header" colspan="2">tax</th>
        <th class="table-header" colspan="2">fronting</th>
        <th class="table-header" colspan="2">ENG</th>
        <th
          v-if="formatCurrency(netPremiumUSD.colombiaTotal)"
          class="table-header"
          colspan="2"
        >
          Reserve
        </th>
        <th class="table-header" colspan="2">LTA</th>
        <th class="table-header" colspan="2">Others</th>
        <th class="table-header" colspan="2">Net Premium</th>
        <th class="table-header" colspan="2">SLU Premium to be invoiced</th>
        <th class="table-header" colspan="2">Net premium excluding fronting</th>
      </tr>
    </thead>
    <tbody>
      <tr class="data-row highlight">
        <td class="table-header currency">Damage</td>
        <td colspan="2">{{ formatCurrency(movementValues.damageUsd) }}</td>
        <td colspan="2">{{ formatCurrency(totalValues.damageUsd) }}</td>
        <td colspan="2">{{ formatCurrency(premium.propertyDamageRate) }}</td>
        <td colspan="2">{{ formatCurrency(premium.propertyDamageUsd) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.damageSluShare) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.damageBrokerage) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.damageTaxes) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.damageFronting) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.damageEng) }}</td>
        <td v-if="formatCurrency(netPremiumUSD.damageColombia)" colspan="2">
          {{ formatCurrency(netPremiumUSD.damageColombia) }}
        </td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.damageLTA) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.damageOther) }}</td>
        <td colspan="2">
          {{ formatCurrency(netPremiumUSD.damageNet) }}
        </td>
        <td colspan="2">
          {{ formatCurrency(netPremiumUSD.damageSluPremiumToBeInvoiced) }}
        </td>
        <td colspan="2">
          {{ formatCurrency(netPremiumUSD.damageNetPremiumExcludingFronting) }}
        </td>
      </tr>
      <tr class="data-row highlight">
        <td class="table-header currency">BI</td>
        <td colspan="2">{{ formatCurrency(movementValues.biUsd) }}</td>
        <td colspan="2">{{ formatCurrency(totalValues.biUsd) }}</td>
        <td colspan="2">
          {{ formatCurrency(premium.businessInterruptionRate) }}
        </td>
        <td colspan="2">
          {{ formatCurrency(premium.businessInterruptionUsd) }}
        </td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.biSluShare) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.biBrokerage) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.biTaxes) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.biFronting) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.biEng) }}</td>
        <td v-if="formatCurrency(netPremiumUSD.biColombia)" colspan="2">
          {{ formatCurrency(netPremiumUSD.biColombia) }}
        </td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.biLTA) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.biOther) }}</td>
        <td colspan="2">
          {{ formatCurrency(netPremiumUSD.biNet) }}
        </td>
        <td colspan="2">
          {{
            formatCurrency(netPremiumUSD.businessInterSluPremiumToBeInvoiced)
          }}
        </td>
        <td colspan="2">
          {{
            formatCurrency(
              netPremiumUSD.businessInterNetPremiumExcludingFronting
            )
          }}
        </td>
      </tr>
      <tr class="data-row highlight">
        <td class="table-header currency">Stocks</td>
        <td colspan="2">{{ formatCurrency(movementValues.stocksUsd) }}</td>
        <td colspan="2">{{ formatCurrency(totalValues.stocksUsd) }}</td>
        <td colspan="2">
          {{ formatCurrency(premium.stockRate) }}
        </td>
        <td colspan="2">{{ formatCurrency(premium.stockUsd) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.stocksSluShare) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.stocksBrokerage) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.stocksTaxes) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.stocksFronting) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.stocksEng) }}</td>
        <td v-if="formatCurrency(netPremiumUSD.stocksColombia)" colspan="2">
          {{ formatCurrency(netPremiumUSD.stocksColombia) }}
        </td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.stocksLTA) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.stocksOther) }}</td>
        <td colspan="2">
          {{ formatCurrency(netPremiumUSD.stocksNet) }}
        </td>
        <td colspan="2">
          {{ formatCurrency(netPremiumUSD.stockSluPremiumToBeInvoiced) }}
        </td>
        <td colspan="2">
          {{ formatCurrency(netPremiumUSD.stockNetPremiumExcludingFronting) }}
        </td>
      </tr>
      <tr class="totals-row">
        <td class="table-header currency">Total</td>
        <td class="highlight" colspan="2">
          {{ formatCurrency(movementValues.totalUsd) }}
        </td>
        <td colspan="2">{{ formatCurrency(totalValues.totalUsd) }}</td>
        <td colspan="2"></td>
        <td colspan="2">{{ formatCurrency(premium.totalUsd) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.sluShareTotal) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.brokerageTotal) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.taxesTotal) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.frontingTotal) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.engTotal) }}</td>
        <td v-if="formatCurrency(netPremiumUSD.colombiaTotal)" colspan="2">
          {{ formatCurrency(netPremiumUSD.colombiaTotal) }}
        </td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.LTATotal) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.otherTotal) }}</td>
        <td colspan="2">
          {{ formatCurrency(netPremiumUSD.netTotal) }}
        </td>
        <td colspan="2">
          {{ formatCurrency(netPremiumUSD.totalSluPremiumToBeInvoiced) }}
        </td>
        <td colspan="2">
          {{ formatCurrency(netPremiumUSD.totalNetPremiumExcludingFronting) }}
        </td>
      </tr>
    </tbody>
    <thead>
      <tr class="sub-header">
        <th rowspan="30"></th>
      </tr>
    </thead>
    <tbody>
      <tr class="data-row highlight">
        <td class="currency" colspan="3">Premium payment warranty</td>
        <td colspan="2">{{ formattedDate() }}</td>
      </tr>
      <tr class="data-row highlight">
        <td class="currency" colspan="3">Clausula</td>
        <td colspan="2">{{ report.cartera.clausula }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "EndorsementReportCompleteTable",
  components: {},
  data() {
    return {};
  },
  props: {
    report: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    boundInsurableProp() {
      return this.report.endorsmentReporData.boundInsurableProp || {};
    },
    deductibles() {
      return this.report.endorsmentReporData.deductibles || {};
    },
    movementValues() {
      return this.report.endorsmentReporData.movementValues || {};
    },
    premium() {
      return this.report.endorsmentReporData.premium || {};
    },
    netPremium() {
      return this.report.endorsmentReporData.netPremium || {};
    },
    netPremiumUSD() {
      return this.report.endorsmentReporData.netPremiumUSD || {};
    },
    totalValues() {
      return this.report.endorsmentReporData.totalValues || {};
    },
  },
  async mounted() {
    console.log("report", this.report.endorsmentReporData);
  },
  methods: {
    formattedDate() {
      if (this.report.cartera && this.report.cartera.premiumPaymentDate) {
        const date = new Date(this.report.cartera.premiumPaymentDate);
        return `${date.getUTCDate().toString().padStart(2, "0")}/${(
          date.getUTCMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${date.getUTCFullYear()}`;
      }
      return "";
    },
    formatCurrency(value) {
      return value
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          }).format(value)
        : "";
    },
    formatPercentage(value) {
      return value ? `${value.toFixed(2)}%` : "";
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
th,
td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}
th {
  text-align: center;
}
td {
  text-align: right;
}
.table-container {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: left;
}
.table-header {
  background-color: #376092;
  color: white;
}
.table-info {
  background-color: #d7e4bd;
}
.title-table {
  color: #376092;
  font-weight: bold;
}
.subtitle-table {
  color: #376092;
}
.currency {
  font-weight: bold;
  text-align: left;
}
.totals-row {
  font-weight: bold;
}
.highlight {
  background-color: #dce6f2;
}
</style>
