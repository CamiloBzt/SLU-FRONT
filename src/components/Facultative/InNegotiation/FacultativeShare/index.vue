<template>
  <v-expansion-panels
    class="ExpansionComponent ExpansionBordered "
    >
    <v-expansion-panel>
      <!--TITULO DEL ACORDEON-->
      <v-expansion-panel-header
        @click="changeStateExpansive()"
        class="ExpansionTitle"
        expand-icon=""
      >
        Facultative Share
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
          
          <Reinsurer numberReinsurer='1' />
          <Reinsurer numberReinsurer='2' />
          <Reinsurer numberReinsurer='3' />

          <Retrocession />

          <div class="finishButtonCont mt-7 d-flex justify-end align-center">
            <v-btn rounded large text class="secondaryBtn">
              Define
            </v-btn>
            <v-btn rounded large text outlined class="finishBtn ml-3">
              Validate
            </v-btn>
          </div>
          
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

  
<script>
import { stateExpansiveManager } from '@/mixins/subscription.js';
export default{
  name:'FacultativeShareAccount',
  mixins: [stateExpansiveManager],
  components:{
    Info: () => import('./Info'),
    Retrocession: () => import('./Retrocession'),
    Reinsurer:() => import ('./Reinsurer')
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