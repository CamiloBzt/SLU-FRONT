<template>

<v-expansion-panels class="ExpansionComponent" >
  <v-expansion-panel>
  	<!--TITULO DEL ACORDEON-->
    <v-expansion-panel-header 
    @click="changeStateExpansive()"
    class="ExpansionTitle" expand-icon="mdi-plus-circle-outline">
      Account information

      <div class="ExpansionState HideOnMovil">
      	{{stateExpansiveMessage}}
      </div>
    </v-expansion-panel-header>
    <!--CONTENIDO DEL ACORDEON-->
    <v-expansion-panel-content>

    	<div class="ExpandContent">
	    	<!--LINEA DIVISORIA-->
	    	<div class="ExpansionLineTop"></div>

	    		<!--PARTE IZQUIERDA DEL FORMULARIO-->
	    		<div class="FormLeftContent d-flex justify-space-between align-start align-content-start flex-wrap">

	    			<!--INPUTS DE LA PARTE IZQUIERDA-->
	    			<div class="InputContent">
			    		<v-text-field
			    			v-model="referenceNumber"
			        	label="Reference number"
			        ></v-text-field>
			    	</div>
			    	<div class="InputContent">
			    		<v-text-field
			    			v-model="insured"
			        	label="Insured"
			        ></v-text-field>
			    	</div>


			    	<div class="InputContent">
			    		<v-text-field
			    			v-model="tiv"
			        	label="TIV"
			        ></v-text-field>
			    	</div>
			    	<div class="InputContent">
			    		<v-text-field
			    			v-model="pml"
			        	label="PML (100% in $)"
			        ></v-text-field>
			    	</div>

			    	<div class="InputContent">
			    		<v-text-field
			    			v-model="qs"
			        	label="QS Technical Premium"
			        ></v-text-field>
			    	</div>
			    	<div class="InputContent">
			    		<v-text-field
			    			v-model="pmlCurve"
			        	label="PML Curve"
			        ></v-text-field>
			    	</div>

			    	<div class="InputContent">
			    		<v-text-field
			    			v-model="comission"
			        	label="Commission"
			        ></v-text-field>
			    	</div>
			    	<div class="InputContent">
			    		<v-text-field
			    			v-model="scenario"
			        	label="Scenario"
			        ></v-text-field>
			    	</div>
	    		</div>

	    		<!--LINEA DIVISORIO VERTICAL-->
	    		<div class="ExpansionLineVertical HideOnMovil"></div>

	    		<!--PARTE DERECHA DEL FORMULARIO-->
	    		<div class="FormRightContent d-flex justify-space-between align-start align-content-start flex-wrap">


	    			<div class="InputContent">
			    		<v-text-field
			    			v-model="layer"
			        	label="Layer"
			        ></v-text-field>
			    	</div>
			    	<div class="InputContent">
			    		<v-text-field
			    			v-model="xs"
			        	label="XS of"
			        ></v-text-field>
			    	</div>
	    		</div>


	    	<!--LINEA DIVISORIA-->
	    	<div class="ExpansionLineTop HideOnMovil"></div>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</v-expansion-panels>


</template>
<script>
import {stateExpansiveManager} from '@/mixins/subscription.js'; 
import { mapGetters } from 'vuex';
export default{
	name:'QuotationInformation',
	mixins:[stateExpansiveManager],
	data(){
		return{
			referenceNumber:null,
			insured:null,
			tiv:null,
			pml:null,
			qs:null,
			pmlCurve:null,
			comission:null,
			scenario:null,
			layer:null,
			xs:null
		}
	},
	computed: {
		...mapGetters(['subscription_id', 'accountInformation']),
	},
	watch: {
		accountInformation(v) {
			console.log(v)
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

/*PARTE IZQUIERDA DEL FORMULARIO*/
.FormLeftContent{
	width: 47%;
	height: auto;

	//INPUTS DE LA PARTE  IZQUIERDA
	.InputContent{
		width: 47% ;
		height: 50px;
		margin-bottom: 25px;
	}
}
//LINEA DIVISORIA VERTICAL
.ExpansionLineVertical{
	width: 1px;
	height: 270px;
	background:grey;
}

//PARTE DERECHA DEL FORMULARIO
.FormRightContent{
	width: calc( 47%);
	height: 300px;

	.InputContent{
		width: 52%;
	}
}


@media(max-width: 600px)
{
.FormLeftContent, .FormRightContent{
	width: 100%;
	height: auto;

	.InputContent{
		width: 100%!important;
	}
}

}
</style>