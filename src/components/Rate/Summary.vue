<template>
  <div class="Cont d-flex justify-start align-center flex-wrap align-content-center mt-6">
    <!--TITULO-->
    <div class="TitleCont">
      <h5>Summary</h5>
    </div>
    <div class="Table">
      <div class="Line">
        <div class="Label">Total Rate</div>
        <div class="Ammount">{{ totalRate }}%</div>
      </div>
      <div class="Line">
        <div class="Label">Premium</div>
        <div class="Ammount">{{ premiumRate }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
/* utils */
import currToNum from '@/lib/currencyToNumber';
import Decimal from 'decimal.js';
import numeral from 'numeral';

export default {
  name: 'Summary',
  data() {
    return {
      formatter: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
    };
  },
  computed: {
    ...mapGetters(['rates', 'tiv', 'quotation', 'premium']),
    totalRate: {
      get() {
        const sumatoria = Decimal(this.quotation.catRate).add(this.rates.nonCatFinalRate);
        return sumatoria.valueOf();
      },
    },
    premiumRate: {
      get() {
        const total = Decimal.add(this.quotation.premiumRate, this.rates.nonCatFinalPremiumRate);
        return this.formatter.format(total);
      },
    },
  },
};
</script>
<style lang="less" scoped>
/*
Estilos compartidos por los componentes
del tarifador, controlan:
	- Clase .flex()
	- Titulo general
	- Contenedor general
*/
@import '~@/assets/style/Subscription/Rate.less';
.Table {
  .flex();
  width: 100%;
  height: auto;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;

  .Line {
    .flex();
    width: 100%;
    height: 50px;
    justify-content: flex-start;

    .Label {
      font-weight: 600;
      color: #547fa9;
    }
    .Ammount {
      .flex();
      width: 150px;
      height: 100%;
      justify-content: flex-end;
      text-align: right;
    }
  }
}
</style>
