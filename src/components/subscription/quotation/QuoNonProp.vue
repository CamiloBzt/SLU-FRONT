<template>
  <v-expansion-panels
    class="ExpansionComponent ExpansionBordered mt-1"
    :disabled="loadingPanel"
    v-model="quoPropPanel"
  >
    <v-expansion-panel @change="$emit('panel-event')">
      <!--TITULO DEL ACORDEON-->
      <v-expansion-panel-header
        @click="changeStateExpansive()"
        class="ExpansionTitle"
        expand-icon=""
      >
        Authorized
        <div class="ExpansionState HideOnMovil">
          {{ stateExpansiveMessage }}
        </div>
        <template v-slot:actions>
          <v-icon class="iconExpand">
            {{ iconExpansive }}
          </v-icon>
        </template>
      </v-expansion-panel-header>
      <!--CUERPO-->
      <v-expansion-panel-content>
        <div class="ExpandContent">
          <NonProportional ref="nonProportional" />
          <Deductions ref="deductions" />
          <ExchangeCalculator ref="exchangeCalc" />
          <LossCurves ref="lossCurves" />
          <Layers ref="layers"/>
          <!--LINEA DIVISORIA-->
          <div class="ExpansionLineTop mt-2" />

          <ExposureCurves />
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import NonProportional from '@/components/subscription/quotation/NonProportional.vue';
import ExchangeCalculator from '@/components/subscription/quotation/ExchangeCalculator.vue';
import Deductions from '@/components/subscription/quotation/Deductions.vue';
import Layers from '@/components/subscription/quotation/Layers.vue';
import LossCurves from '@/components/subscription/quotation/LossCurves.vue';
import ExposureCurves from '@/components/subscription/quotation/ExposureCurves.vue';

/* mixins */
import { stateExpansiveManager } from '@/mixins/subscription.js';

export default {
  name: 'QuoNonProp',
  mixins: [stateExpansiveManager],
  data() {
    return {
      quoPropPanel: 1,
    };
  },
  props: {
    loadingPanel: {
      type: Boolean,
    },
  },
  components: {
    NonProportional,
    ExchangeCalculator,
    Deductions,
    Layers,
    LossCurves,
    ExposureCurves,
  }
};
</script>
<style lang="less" scoped>
//CONTENEDOR DE QUOTATION
@import '~@/assets/style/AccordionStyle.less';
.ExpansionLineTop {
  background: #a8bfd9 !important;
}
</style>
