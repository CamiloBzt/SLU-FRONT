<template>
<div class="NotesComponent d-flex justify-space-between align-start pl-3 pr-3 pt-2 flex-wrap">
	<!--TITULO-->
	<h2>
		Notes
	</h2>
	<!--FILTRO-->
	<div class="FilterNotesComponent mt-1">
		<v-text-field 
		prepend-inner-icon="mdi-map-marker"
		solo rounded outlined flat
		label="Regular">
  	</v-text-field>
	</div>

  <!--SLIDER DE NOTAS-->
  <div class="SliderNotesContent mt-3">
  	<!--BOTENES DE LA PARTE IZQUIERDA-->
  	<div class="SliderLeftBtnContent d-flex flex-column align-start align-content-start">
  		
  		<!--BOTON-->
  		<div class="buttonContent d-flex justify-center align-center mt-1">
	  		<v-btn
	  		icon>
	  			<v-icon dark>
	        mdi-dots-vertical
	      	</v-icon>
	  		</v-btn>
	  	</div>

	  	<div class="buttonContent d-flex justify-center align-center">
	  		<v-btn
	  		icon outlined>
	  			<v-icon dark>
	        mdi-star-outline
	      	</v-icon>
	  		</v-btn>
	  	</div>

	  	<div class="buttonContent d-flex justify-center align-center mt-1">
	  		<v-btn
	  		icon outlined>
	  			<v-icon dark>
	        mdi-pencil-outline
	      	</v-icon>
	  		</v-btn>
	  	</div>

	  	<div class="buttonContent d-flex justify-center align-center mt-1">
	  		<v-btn
	  		icon outlined >
	  			<v-icon dark>
	        mdi-trash-can-outline
	      	</v-icon>
	  		</v-btn>
	  	</div>
	  	
  	</div>

  	<!--BOTON FLOTANTE DERECHO-->
  	<div class="FloatButtonRight d-flex justify-center align-center">
  		<v-btn
	  	icon outlined>
	  		<v-icon dark>
	       mdi-plus
	      </v-icon>
	  	</v-btn>
  	</div>

  </div>

  <!--NUMEROS DEL SLIDER-->
  <div class="SliderNumberContent d-flex justify-center align-center mt-1">
  		
  	<div class="SliderIconContent d-flex justify-center align-center">
  		<v-icon>mdi-chevron-left</v-icon>
  	</div>

  	<!--CONTADOR-->
  	<div class="SliderCounterContent d-flex justify-center align-center">
  		5/10
  	</div>
  	<div class="SliderIconContent d-flex justify-center align-center">
  		<v-icon>mdi-chevron-right</v-icon>
  	</div>

  </div>

</div>
</template>
<style lang="less">
@BordersStyle:solid 1px black;//COLOR DEL BORDE
.NotesComponent{
	width: 100%; height: 56%;
	align-content:flex-start;

	//TITULO DEL COMPONENTE NOTAS
	h2{
		font-size: 1.4rem;
	}

	//FILTRO DE BUSQUEDA
	.FilterNotesComponent{
		width: 100%; height:50px;
	}

	//SLIDER DE NOTAS
	.SliderNotesContent{
		width: 100%;
		height: 55%;
		border: @BordersStyle;
		border-radius: 25px;
		position: relative;
		overflow: hidden;

		//TAMAÑO E LOS ICONOS
		i{font-size: 17px !important;}

		//BOTONES DE LA PARTE IZQUIERDA
		.SliderLeftBtnContent{
			width: 50px;
			height: 100%;
			position:absolute;
			left: 0; top: 0;
			z-index: 1000;
			//BOTONES
			.buttonContent{
				width: 100%; height: 40px;
			}
		}

		//BOTON FLOTANTE DE LA PARTE DERECHO
		.FloatButtonRight{
			width: 50px;
			height: 50PX;
			position:absolute;
			right: 0; top: 0;
			z-index: 1000;
		}

	}

	//CONTROLES DEL SLIDER
	.SliderNumberContent{
		width: 100%;
		height: 47px;

		//ICONOS DEL SLIDER 
		.SliderIconContent{
			width: 40px; height: 100%;
		}
		//CONTADOR DEL SLIDER
		.SliderCounterContent{
			width: 110px;
			height: 70%;
			border:@BordersStyle;
			border-radius:35px;
			font-size: 14px;
		}
	}


}




</style>