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
        Quotation
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
		  <v-expansion-panels class="SubExpansionComponent">
		    <v-expansion-panel>
		      <v-expansion-panel-header @click="changeSubExpansion" class="ExpansionTitle d-flex justify-start" expand-icon="">
		        <template v-slot:actions>
		          <div class="subIconCont d-flex justify-start align-center">
		            <v-icon class="iconExpand mr-1">
		              {{ iconSubExpansion }}
		            </v-icon>
		            <div class="SubExpansionTitle">Proportional</div>
		          </div>
		        </template>
		      </v-expansion-panel-header>

		      <v-expansion-panel-content>
		        <div class="ExpandContent justify-center">
		        	
		        </div>
		      </v-expansion-panel-content>
		    </v-expansion-panel>
		  </v-expansion-panels>



		  <v-expansion-panels class="SubExpansionComponent">
		    <v-expansion-panel>
		      <v-expansion-panel-header @click="changeSubExpansion" class="ExpansionTitle d-flex justify-start" expand-icon="">
		        <template v-slot:actions>
		          <div class="subIconCont d-flex justify-start align-center">
		            <v-icon class="iconExpand mr-1">
		              {{ iconSubExpansion }}
		            </v-icon>
		            <div class="SubExpansionTitle">Non Proportional</div>
		          </div>
		        </template>
		      </v-expansion-panel-header>

		      <v-expansion-panel-content>
		        <div class="ExpandContent justify-center">
		        	
		        </div>
		      </v-expansion-panel-content>
		    </v-expansion-panel>
		  </v-expansion-panels>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</div>
</template>

  
<script>
import { stateExpansiveManager } from '@/mixins/subscription.js';
export default{
  name:'QuotatationProportionalExpandible',
  mixins: [stateExpansiveManager],
}
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
</style>