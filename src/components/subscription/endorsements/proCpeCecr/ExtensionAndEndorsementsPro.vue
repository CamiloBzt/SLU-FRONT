<template>
<div>
  <v-expansion-panels
    class="ExpansionComponent ExpansionBordered mt-3"
    >
    <v-expansion-panel>
      <!--TITULO DEL ACORDEON-->
      <v-expansion-panel-header
        @click="changeStateExpansive()"
        class="ExpansionTitle"
        expand-icon=""
      >
        Extensions and Endorsements
        <div class="ExpansionState HideOnMovil">
          {{ stateExpansiveMessage }}
        </div>
        <template v-slot:actions>
          <v-icon class="iconExpand">
            {{ iconExpansive }}
          </v-icon>
        </template>
      </v-expansion-panel-header>
      <!--CONTENIDO DEL ACORDEON-->
      <v-expansion-panel-content>
        <div class="ExpandContent">
          <NewInsurancePolicyPro />
          <ChangeOfInceptionDate />
          <SummaryPro />

          <div class="finishButtonCont mt-7 d-flex justify-end align-center">
            <v-btn rounded large text class="finishBtn">Send To Facultative </v-btn>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</div>
</template>

  
<script>
import NewInsurancePolicyPro from '@/components/subscription/endorsements/proCpeCecr/NewInsurancePolicyPro'
import ChangeOfInceptionDate from '@/components/subscription/endorsements/proCpeCecr/ChangeOfInceptionDate'
import SummaryPro from '@/components/subscription/endorsements/proCpeCecr/SummaryPro'

import { stateExpansiveManager } from '@/mixins/subscription.js';
export default{
  name:'ExtensionAndEndorsementsPro',
  mixins: [stateExpansiveManager],
  components:{
    NewInsurancePolicyPro,
    ChangeOfInceptionDate,
    SummaryPro
  }
}
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
</style>