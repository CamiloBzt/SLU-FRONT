<template>
  <v-expansion-panels
    class="ExpansionComponent ExpansionBordered mt-6"
    >
    <v-expansion-panel>
      <!--TITULO DEL ACORDEON-->
      <v-expansion-panel-header
        @click="changeStateExpansive()"
        class="ExpansionTitle"
        expand-icon=""
      >
        Summary
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

          <Info />
          <Deductions />
          <Slu />
          <Reinsurer1 />
          <DicReinsurer numberReinsurer="1" />
          <Reinsurer2 />
          <Reinsurer3 />
          <Retrocession />
    
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

  
<script>
import { stateExpansiveManager } from '@/mixins/subscription.js';
export default{
  name:'FacultativeSummary',
  mixins: [stateExpansiveManager],
  components:{
    Info: () => import('./Info'),
    Slu: () => import('./Slu'),
    Deductions: () => import('./Deductions'),
    Reinsurer1: () => import('./Reinsurer1'),
    Reinsurer2: () => import('./Reinsurer2'),
    Reinsurer3: () => import('./Reinsurer3'),
    DicReinsurer: () => import('./DicReinsurer'),
    Retrocession: () => import('./Retrocession'),
  }
}
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
.Buttons{
  width: 100%;
  height: 50px;
}
</style>