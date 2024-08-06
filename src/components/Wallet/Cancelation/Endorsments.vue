<template>
  <v-expansion-panels
    class="ExpansionComponent ExpansionBordered mt-7"
  >
    <v-expansion-panel>
      <v-expansion-panel-header
        @click="changeStateExpansive()"
        class="ExpansionTitle"
        expand-icon=""
      >
      	<!--Titulo del acordeon-->
        Endorsements
        <div class="ExpansionState HideOnMovil">
          {{ stateExpansiveMessage }}
        </div>
        <template v-slot:actions>
          <v-icon class="iconExpand">
            {{ iconExpansive }}
          </v-icon>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent justify-center">

        	<h5 class="SubTitle">
	        	The account has the following endorsements
	        </h5>

        	<div
        	v-for="item in endorsments"
        	:key="item.id"
        	class="EndorsmentCont">
	        	<!--Numero de endorsement-->
	        	<h5 class="SubTitle">
	        		Endorsement {{item.item}}
	        	</h5>

	        	<!--Inputs-->
	        	<div class="InputsCont d-flex flex-wrap align-start mt-3">
				      <div class="InputCont">
				        <v-text-field label="Type" />
				      </div>
				      <div class="InputCont">
				        <v-text-field label="Accounting Status" />
				      </div>
				      <div class="InputCont">
				        <v-text-field label="Inception" />
				      </div>
				      <div class="InputCont">
				        <v-text-field label="Expiry" />
				      </div>
				      <div class="InputCont">
				        <v-text-field label="Term" />
				      </div>
				      <div class="InputCont">
				        <v-text-field label="Cancelation Date" />
				      </div>
				      <div class="InputCont">
				        <v-text-field label="Cancelation Term" />
				      </div>
				    </div>

				    <!--Tabla-->
				    <div class="Table">

				    	<div class="Line BorderBottom">
				    		<div class="Row" />
				    		<div class="Row" />
				    		<div class="Row font-weight-bold">
				    			Pro-rate
				    		</div>
				    		<div class="Row font-weight-bold">
				    			Cancelation Endorsement
				    		</div>
				    	</div>

				    	<div class="Line">
				    		<div class="Row Label">
				    			Gross Premium USD
				    		</div>
				    		<div class="Row">
				    			<v-text-field value="5000" />
				    		</div>
				    		<div class="Row align-center">
				    			<v-text-field value="1,509.97" />
				    		</div>
				    		<div class="Row align-right">
				    			<v-text-field value="-3.490,03" />
				    		</div>
				    	</div>

				    	<div class="Line">
				    		<div class="Row Label">
				    			Deductions
				    		</div>
				    		<div class="Row">
				    			<v-text-field value="875,000" />
				    		</div>
				    		<div class="Row align-center">
				    			<v-text-field value="264.25" />
				    		</div>
				    		<div class="Row align-right">
				    			<v-text-field value="-610.75" />
				    		</div>
				    	</div>


				    	<div class="Line">
				    		<div class="Row Label">
				    			Fronting
				    		</div>
				    		<div class="Row">
				    			<v-text-field value="875,000" />
				    		</div>
				    		<div class="Row align-center">
				    			<v-text-field value="264.25" />
				    		</div>
				    		<div class="Row align-right">
				    			<v-text-field value="-610.75" />
				    		</div>
				    	</div>


				    	<div class="Line">
				    		<div class="Row Label">
				    			Next Premium
				    		</div>
				    		<div class="Row">
				    			<v-text-field value="875,000" />
				    		</div>
				    		<div class="Row align-center">
				    			<v-text-field value="264.25" />
				    		</div>
				    		<div class="Row align-right">
				    			<v-text-field value="-610.75" />
				    		</div>
				    	</div>

				    </div>


						<!--Boton-->
	          <div class="ButtonCont d-flex justify-end align-center">
	            <v-btn depressed color="#003D6D" rounded>
	              Cancel
	            </v-btn>
	          </div>
        	</div>

        </div>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
</template>
<script>
import { stateExpansiveManager } from '@/mixins/subscription.js'
export default{
	name:'WalletInformation',
	mixins:[
  	stateExpansiveManager
  ],
  data() {
  	return{
  		endorsments:[
  			{item:1},
  			{item:2}
  		]
  	}
  },
}
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
@import '~@/assets/style/Subscription/Bound.less';
/*
Para los inputs tomamos de base  las clases del archivo 
/assets/style/Subscription/Bound.less
en el apartado 'Estilos generales de los inputs'
también de allí se controla la versión móvil de esta parte
*/
//Subtitulo
.SubTitle{
	.flex();
	justify-content: flex-start;
	width: 100%;
	height: 50px;
	text-align: left;
	font-size: 16px;
}
//Centrar inputs con clase .align-right
::v-deep .align-right .v-input input {
  text-align: right;
}
::v-deep .align-center .v-input input {
  text-align: center;
}
//Contenedor de endorsments
.EndorsmentCont{
	width: 100%;
	height: auto;
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	align-items: center;
	align-content: flex-start;

	//Tabla
	.Table{
		width: 47%;
		height: auto;

		.Line{
			.flex();
			width: 100%;
			height: 50px;
			justify-content: space-between;

			.Row{
				.flex();
				width: 22%;
				height: 100%;
				text-align: center;
			}

			.Label{
				width: 27%;
	      color:#547FA9;
	      font-size: 14px;
	      justify-content: flex-end;
	      text-align: right;      
			}
		}

		.BorderBottom{
			border-bottom:1px solid #D2DEED;
			margin-bottom:15px;
			height: 65px;
		}
	}
	//Boton
	.ButtonCont{
	  width: 100%;
	  margin-top: 25px;
	  .v-btn{
	    text-transform: none;
	    color: white;
	    width: 217px;
	    height: 40px;
	    letter-spacing: normal;
	  }
	}
}
</style>