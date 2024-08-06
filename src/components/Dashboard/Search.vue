<template>
<div class="SearchFiltersComponent">
	<!--FILTERS GENERAL CONTENT-->
	<div class="InputsSearchContent d-flex">
		<!--SEARCH INPUT-->
		<div class="InputSearchCont">
			<v-text-field 
			prepend-inner-icon="mdi-map-marker"
			solo rounded outlined flat
			label="Search">
		</v-text-field>
		</div>
  </div>
</div>
</template>
<script>
export default {
	name:'SearchFilters',
	methods:{
		ShowModalFilters(){
			this.$emit('showModalFilters');
		}
	}
}
</script>
<style lang="less" scoped>
.SearchFiltersComponent{
	width: 100%;
	height: auto;


	//CONTENEDOR DE LOS INPUTS DE BUSQUEDA
	.InputsSearchContent{
		width: 100%; height: 60px;

		//CONTENEDOR DEL FILTRO DE BUSQUEDA
		.InputSearchCont{
			width: 80%; height: 100%;
		}

		//CONTENEDOR DEL FILTRO 
		.InputFilterCont{
			width: 70%;
		}

		//BOTON
		.ButtonMovil{
			width: auto;
			height: 100%;
			margin-left: 2.5%;
		}
	}


}

@media(max-width: 600px)
{
.SearchFiltersComponent{
	margin-top: 7px;


	.InputsSearchContent{
		height: 40px;

		.InputSearchCont{
			width: 85% ;
			height: 40px ;
		}
		.InputFilterCont{
			display: none;
		}
	}
	
}





}
</style>