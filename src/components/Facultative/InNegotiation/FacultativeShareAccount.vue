<template>
<div>
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

        	<div class="InputsLine">
            <div class="InputCont">
              <v-text-field label="Original Premium" />
            </div>
            <div class="InputCont">
              <v-text-field label="Reinsurer Number" />
            </div>
          </div>

          <div class="InputsLine">
            <div class="InputCont">
              <v-text-field label="Reinsurer 1" />
            </div>
            <div class="InputCont">
              <v-text-field label="Percentaje" />
            </div>
            <div class="InputCont">
              <v-text-field label="Amount" />
            </div>
          </div>

          <div class="InputsLine">
            <div class="InputCont">
              <v-text-field label="Reinsurer 2" />
            </div>
            <div class="InputCont">
              <v-text-field label="Percentaje" />
            </div>
            <div class="InputCont">
              <v-text-field label="Amount" />
            </div>
          </div>

          <div class="InputsLine">
            <div class="InputCont">
              <v-text-field label="SLU Share" />
            </div>
            <div class="InputCont">
              <v-text-field label="SLU Line Size USD" />
            </div>
            <div class="InputCont">
              <v-text-field label="SLU Original Premium" />
            </div>
          </div>

        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</div>
</template>

  
<script>
import { stateExpansiveManager } from '@/mixins/subscription.js';
export default{
  name:'FacultativeShareAccount',
  mixins: [stateExpansiveManager],
  components:{
  }
}
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
@import '~@/assets/style/Subscription/Bound.less';
.InputsLine{
	width: 100%; 
	height: auto;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	gap:2%;

	.InputCont{
	  width: 23% !important;
	  margin-right: 0% !important;
	  @media(max-width: 650px){
	  	widows: 100%;
	  }
	}	
}


</style>