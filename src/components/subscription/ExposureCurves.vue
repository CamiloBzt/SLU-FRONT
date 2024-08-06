<template>

<v-expansion-panels class="ExpansionComponent">
  <v-expansion-panel>
  	<!--TITULO DEL ACORDEON-->
    <v-expansion-panel-header  expand-icon="">
    	<div class="ExpandMiniTitle">
    		<v-icon class="mr-1 mb-1">mdi-plus-circle-outline</v-icon>
      	Excess of Loss Curves
    	</div>
    </v-expansion-panel-header>
    <!--CONTENIDO DEL ACORDEON-->
    <v-expansion-panel-content>

    	<div class="ExpandContent">
	    	<!--LINEA DIVISORIA-->
	    	<div class="ExpansionLineTop"></div>

	    	


      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</v-expansion-panels>


</template>
<script>
export default{
	name:'AccountInformation',
	data(){
		return{
			insuredName:null,
			name:null,
			country:null,
			typeOfRisk:null,
			activity:null,
			currency:null,
			brokerOrCedent:null
		}
	},
	methods:{
		/*
			ENVIA LOS DATOS AL COMPONENTE PADRE.
			ESTA FUNCION RECIVE POR PARAMETRO EL EVENTO 
			Y EL NOMBRE DEL INPUT PARA IDENTIFICAR 
			A QUE INPUT PERTENECE EL CAMBIO
		*/
		emitInput(text, inputName){

			this.$emit(inputName, text);

		}
	}
}
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';//
</style>