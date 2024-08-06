<template>
<div class="ContactInformation d-flex justify-center align-start align-content-start flex-wrap">

	<!--TITULO-->
	<div class="TitleSection adjust-width d-flex justify-start align-center">
		<h4>
			Calendar
		</h4>
	</div>


	<!--contendio de la sección-->

	<div class="ContentDashboard d-flex justify-center align-center">
		<v-date-picker
      v-model="calendar"
      :events="events"
      @change="changeCalendar($event)"
      full-width
      no-title
      class="mt-4"
    ></v-date-picker>
	</div>
</div>
</template>
<script>
  export default {
    data: () => ({
      calendar: '',
      events: [ "2021-06-01", "2021-06-02" ],
    }),
    methods:{
    	changeCalendar(event){
    		//alert(event)
    	}    
    }
    
  }
</script>
<style lang="less" scope>
@import '~@/assets/style/Dashboard/General.less';
.ContentDashboard{
	height: 330px;
	overflow: hidden;
	padding-bottom: 1rem;
	background-color: white;
}

.adjust-width {
	width: 93% !important;
}

//BORDE Y TAMAÑO DE LOS INDICADORES DE FECHAS
.v-date-picker-table__events > div{
	border: solid 1px grey !important;
	width: 30px!important; height: 30px!important;
}
//COLOR DEL FONDO Y BORDE DE LOS  INDICADORES 
.v-application .warning{
	background-color: transparent !important;
	border-color:grey !important;
}
//POSISION DE LOS INDICADORES
.v-date-picker-table--date .v-date-picker-table__events {
	bottom: 23px !important;
	left: -1px !important;
}

//INDICADOR DE FECHA ACTUAL
.v-application .accent--text {
		font-weight: bolder !important;;
    color: black !important;
    caret-color: black !important;
}

// BORDE DEL CIRCULO DE LA FECHA ACTUAL
.v-date-picker-table__current {
	border: solid 1px var(--lightColor2);
}
</style>