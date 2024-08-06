<template>
  <div class="
      Cont
      d-flex
      justify-start
      align-center
      flex-wrap
      align-content-center
      mt-6
    ">
    <!--TITULO-->
    <div class="TitleCont">
      <h5>Summary</h5>
    </div>
    <div class="Table">
      <div class="Line">
        <div class="Label">Damage Rate</div>
        <div class="Ammount">{{ damageRate }} %</div>
      </div>
      <div class="Line">
        <div class="Label">Alop Rate</div>
        <div class="Ammount">{{ alopRate.finalRate }} %</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import Decimal from 'decimal.js';
export default {
  name: 'SummaryCarEar',
  data () {
    return {};
  },
  computed: {
    ...mapGetters(['reasons', 'ALOP', 'alopRate', 'rates', 'tarifarNonCatRate', 'premium', 'quotation']),
    damageRate: function () {
      const result = new Decimal(this.tarifarNonCatRate.finalRate || 0).add(this.rates.nonCatFinalRate);
      const sumatoria = Decimal(this.quotation.catRate).add(result);
      if (result.lessThan(1) && result.greaterThan(-1)) return sumatoria.toFixed(5);
      this.premium.propertyDamageRate = sumatoria.toFixed(2);
      return sumatoria.toFixed(2);
    },
  },
  methods: {
    ...mapMutations(['setStatePremium']),
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
