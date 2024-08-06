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
        Pro rata payment premium for the period
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
          <!--Subtitulo-->
          <h5 class="SubTitle">
            Pro rata payment premium for the period
          </h5>


        	<!--Contenedor de dos tablas-->
        	<div class="TableContent">
        		
        		<!--Tabla-->
        		<div class="Table">
        			<div class="Line font-weight-bold justify-center BorderBottom">
        				USD
        			</div>

        			<div class="Line">
        				<div class="Row Label bold">
        					Gross Premium
									Deductions
        				</div>
        				<div class="Row align-center">
        					<v-text-field />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="20,000.00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label">
        					Brokerage
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label">
        					Tax
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label">
        					LTA
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label">
        					Others
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label">
        					ENG
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line BorderBottom">
        				<div class="Row Label">
        					Fronting
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div> 
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label bold">
        					Net Premium
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>
        		</div>

        		<!--Tabla-->
        		<div class="Table">
        			<div class="Line font-weight-bold justify-center BorderBottom">
        				Original Currency
        			</div>

        			<div class="Line">
        				<div class="Row Label bold">
        					Gross Premium
									Deductions
        				</div>
        				<div class="Row align-center">
        					<v-text-field />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="20,000.00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label">
        					Brokerage
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label">
        					Tax
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label">
        					LTA
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label">
        					Others
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label">
        					ENG
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line BorderBottom">
        				<div class="Row Label">
        					Fronting
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label bold">
        					Net Premium
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>
        		</div>
        	</div>

        	<!--Subtitulo-->
        	<h5 class="SubTitle mt-5">
        		Premium payment pro rata for the period
        	</h5>

        	<!--Contenedor de dos tablas-->
        	<div class="TableContent">
        		
        		<!--Tabla-->
        		<div class="Table">
        			<div class="Line font-weight-bold justify-center BorderBottom">
        				USD
        			</div>

        			<div class="Line">
        				<div class="Row Label bold">
        					Gross Premium
									Deductions
        				</div>
        				<div class="Row align-center">
        					<v-text-field />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="20,000.00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label">
        					Brokerage
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label">
        					Tax
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label">
        					LTA
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label">
        					Others
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label">
        					ENG
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line BorderBottom">
        				<div class="Row Label">
        					Fronting
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label bold">
        					Net Premium
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>
        		</div>

        		<!--Tabla-->
        		<div class="Table">
        			<div class="Line font-weight-bold justify-center BorderBottom">
        				Original Currency
        			</div>

        			<div class="Line">
        				<div class="Row Label bold">
        					Gross Premium
									Deductions
        				</div>
        				<div class="Row align-center">
        					<v-text-field />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="20,000.00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label">
        					Brokerage
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label">
        					Tax
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label">
        					LTA
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label">
        					Others
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label">
        					ENG
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line BorderBottom">
        				<div class="Row Label">
        					Fronting
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
        			</div>


        			<div class="Line">
        				<div class="Row Label bold">
        					Net Premium
        				</div>
        				<div class="Row align-center">
        					<v-text-field value="10%" />
        				</div>
        				<div class="Row align-right">
        					<v-text-field value="2.000,00" />
        				</div>
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
  ]
}
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
@import '~@/assets/style/Subscription/Bound.less';
/*
Para los inputs tomamos de base  las clases del archivo 
/assets/style/Subscription/Bound.less
en el apartado 'Estilos generales de los inputs'
también de allí se controla la versión móvil
*/

.BorderBottom{
	border-bottom:1px solid #D2DEED;
	margin-bottom:15px;
}
//Centrar inputs con clase .align-center
::v-deep .align-center .v-input input {
  text-align: center;
}
//Centrar inputs con clase .align-right
::v-deep .align-right .v-input input {
  text-align: right;
}
//Contenedor de dos tablas
.TableContent{
	.flex();
	width: 80%;
	height: auto;
	justify-content: space-between;
	flex-wrap: wrap;

	//Tabla
	.Table{
		width: 45%;
		height: auto;
		

		//Hilera
		.Line{
			.flex();
			width: 100%;
			height: 50px;
			justify-content: space-between;

			//Celda
			.Row{
				.flex();
				width: 30%;
				height: 100%;
				text-align: center;
			}

			.Label{
	      color:#547FA9;
	      font-size: 14px;
	      justify-content: flex-end;
	      text-align: right;      
			}
			.bold{
	      font-weight: 600;
	    }
		}
		.WhiteBlock{
			height: 60px;
		}
	}
}

//Subtitulo
.SubTitle{
	.flex();
	justify-content: flex-start;
	width: 100%;
	height: 50px;
	text-align: left;
	font-size: 16px;
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
</style>