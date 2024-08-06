<template>

<v-expansion-panels 
class="
	ExpansionComponent
	ExpansionBordered 
	mt-6
	"
	flat elevation-0
	>
  <v-expansion-panel>
  	<!--TITULO DEL ACORDEON-->
    <v-expansion-panel-header class="ExpansionTitle" expand-icon="mdi-plus-circle-outline">
      Account information
    </v-expansion-panel-header>
    <!--CONTENIDO DEL ACORDEON-->
    <v-expansion-panel-content>

    	<div class="ExpandContent">
	    	<!--LINEA DIVISORIA-->
	    	<div class="ExpansionLineTop"></div>

	    	<!--INPUTS-->
	    	<div class="ExpansionInputContent">
	    		<v-text-field
	    			v-model="insuredName"
	    			@change="emitInput($event,'insuredName')"
	        	label="Insured name"
	        ></v-text-field>
	    	</div>
	    	<div class="ExpansionInputContent">
	    		<v-text-field
	    			v-model="name"
	    			@change="emitInput($event,'name')"
	        	label="Andrew Johnson"
	        ></v-text-field>
	    	</div>
	    	<div class="ExpansionInputContent">
	    		<v-text-field
	    			v-model="country"
	    			@change="emitInput($event,'country')"
	        	label="Country"
	        ></v-text-field>
	    	</div>
	    	<div class="ExpansionInputContent">
	    		<v-text-field
	    			v-model="typeOfRisk"
	    			@change="emitInput($event,'typeOfRisk')"
	        	label="Type of risk"
	        ></v-text-field>
	    	</div>


	    	<div class="ExpansionInputContent">
	    		<v-text-field
	    			v-model="activity"
	    			@change="emitInput($event,'activity')"
	        	label="Activity"
	        ></v-text-field>
	    	</div>
	    	<div class="ExpansionInputContent">
	    		<v-text-field
	    			@change="emitInput($event,'currency')"
	    			v-model="currency"
	        	label="Currency"
	        ></v-text-field>
	    	</div>
	    	<div class="ExpansionInputContent">
	    		<v-text-field
	    			@change="emitInput($event,'brokerOrCedent')"
	    			v-model="brokerOrCedent"
	        	label="Broker or Cedent"
	        ></v-text-field>
	    	</div>

	    	<div class="ExpansionInputContent">
	    	</div>

	    	<!--LINEA DIVISORIA-->
	    	<div class="ExpansionLineTop mt-10"></div>





				<!--SEGUNDO ACORDEON-->
				<v-expansion-panels 
				class="SubExpansionComponent mt-5"
				>
				  <v-expansion-panel>


				  	<!--TITULO DEL ACORDION-->
				    <v-expansion-panel-header 
				    	class="ExpansionTitle SubExpansionTitle" 
				    	expand-icon="mdi-plus-circle-outline"
				    >
				      Account information
				    </v-expansion-panel-header>


				    <!--CONTENIDO DEL ACORDION-->
				    <v-expansion-panel-content>
				    	


				    </v-expansion-panel-content>
				  </v-expansion-panel>
				</v-expansion-panels>



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