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
        expand-icon="mdi-plus-circle-outline"
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
          <Proportional ref="proportional" />
          <Deductions ref="deductions" />
          <InsurableValue ref="insurable" />
          <Premium ref="premium" />
          <ToBe ref="toBe" />
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import Proportional from '@/components/subscription/quotation/Proportional';
import InsurableValue from '@/components/subscription/quotation/InsurableValue';
import Premium from '@/components/subscription/quotation/Premium';
import ToBe from '@/components/subscription/quotation/ToBe';
import Deductions from '@/components/subscription/quotation/Deductions';

/* mixins */
import { stateExpansiveManager } from '@/mixins/subscription.js';

export default {
  name: 'QuoProp',
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
    Proportional,
    InsurableValue,
    Deductions,
    Premium,
    ToBe,
  },
  mounted(){
    /*
      Cambia el icono del expandible en renewals
    */
    if(this.$route.path==='/renewals/subscription')
    {
      this.changeStateExpansive();
    }
  }
};
</script>
<style lang="less" scoped>
//CONTENEDOR DE QUOTATION
@import '~@/assets/style/AccordionStyle.less';
</style>
