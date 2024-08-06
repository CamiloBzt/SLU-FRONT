<template>
<div>
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
        Bound Information
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

          
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</div>
</template>

  
<script>
import { stateExpansiveManager } from '@/mixins/subscription.js';
export default{
  name:'BoundInformationCarEar',
  mixins: [stateExpansiveManager],
  components:{

  }
}
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
</style>