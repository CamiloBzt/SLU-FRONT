<template>
  <div>
    <!-- <AddCompanyModal :showModal="modalCreateCompany" /> -->

    <v-expansion-panels
      class="ExpansionComponent ExpansionBordered mt-6 MarginTopMovil"
      v-model="userPanel"
    >
      <v-expansion-panel>
        <!--TITULO DEL ACORDEON-->
        <v-expansion-panel-header
          @click="changeStateExpansive()"
          class="ExpansionTitle"
          expand-icon=""
        >
          {{title}}
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
						<slot  name="app-accordion-content"></slot>
					</div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
export default {
  name: 'AppAccordion',
	props: {
		title: String
	}
}
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
//ESTA CLASE LE AÑADE EL BORDE AL ACORDEON
.ExpansionBordered{
	border-radius: 12px;
}
//TITULO DE SUB-ACORDEON
.ExpandMiniTitle{
	font-weight: normal !important;
	font-size: 16px;
	color: grey;
	margin-left: -25px !important;
}
//CONTENEDOR PRINCIPAL DEL ACORDEON
.ExpansionComponent{
	box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
}


/*
Usar la clase .SubExpansionComponent en
acordeones que estan dentro de otros acordeones
*/
.SubExpansionComponent{
	.v-expansion-panel{
		.v-expansion-panel-header{
			padding:0 !important;
		}
		.v-expansion-panel-content{
			margin-left: -24px;
			width: calc(100% + 24px) !important;
			.SubForm{
				width: calc(100% + 24px) !important;
			}
		}
	}

	
}
.ExpansionComponent,.SubExpansionComponent{
	width: 100%; 
	height: auto;
	
	//TITULO DEL ACORDEON
	.ExpansionTitle{
		font-weight: 600 ;
		font-size: 20px;
		height: 55px;
		text-transform: capitalize;
		.subIconCont{
			position: absolute;
			left: 0; top: 0;
			width: 100%;
			height: 100%;
			.SubExpansionTitle{
				font-weight: 600!important;
				font-size: 16px;
				.SubIconCont{
					width: 30px;
					height: 30px;
					background:#D2DEED;
					border-radius:35px;
					margin-right: 15px;
					i{
						font-size: 18px;
						color: #003D6D;
						margin-top: -1px;
						margin-left: 1px;
					}
				}
			}
		}
	}

	//AVISO ABIERTO / CERRADO

	.ExpansionState{
		height: 100%;
		display: flex;
		justify-content: flex-end;
		align-items:center;
		color: #547FA9;
		font-size: 16px;
		margin-right: 15px;
		font-weight: normal;

	}

	//CONTENIDO DEL ACORDEON
	.ExpandContent{
		width: 100%; 
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		align-items: flex-start;
		justify-content: space-between;


		//TITULO DEL COMPONENTE
		.TitleFiles{
			width: 100%;
			height: 75px;
			font-weight: bold;
			display: flex;
			justify-content: flex-start;
			align-items:center;
			font-size: 17px;
		}

		//LINEA DIVISORIO DE LA PARTE SUPERIOR
		.ExpansionLineTop{
			width: 100%; 
			height: 1px;
			background: grey;
			margin-bottom: 15px;
		}
		

		//CONTENEDORERS DE INPUTS
		.ExpansionInputContent{
			width: 23%; 
			height: 50px;
		}
		//INPUTS DE BOUND
		.inputCont{
			width: 19%;
			@media(max-width: 650px){
				width: 100%;
			}
		}

	}
}

//COLOR DE LOS ICONO MAS Y MENOS
.iconExpand{
	width: 20px;
	height: 20px;
	background:#D2DEED;
	color: #003D6D !important;
	font-size: 17px !important;
	border-radius: 20px;
}
.v-expansion-panel::before {
  box-shadow: none !important;
}
.v-expansion-panels:not(.v-expansion-panels--accordion):not(.v-expansion-panels--tile) > .v-expansion-panel--active{
	border-radius:12px!important;
}
//Quitar las sombras
.RemoveShadow{
	box-shadow: none !important;
}
@media(max-width: 600px)
{
//CONTENEDOR PRINCIPAL DEL ACORDEON
.MarginTopMovil{margin-top: 35px !important;}
.ExpansionComponent,.SubExpansionComponent{
	
	//TITULO DEL ACORDEON
	.ExpansionTitle{
		font-weight: bold;
		font-size: 18px;
		height: 55px;
	}

	//CONTENIDO DEL ACORDEON
	.ExpandContent{
		//LINEA DIVISORIA
		.ExpansionLineTop{
			display: none;
		}
		//CONTENEDOR DE LOS INPUTS
		.ExpansionInputContent{
			width: 100%; 
			height: 50px;
			margin-bottom: 5px !important;
		}

	}
}
}
</style>