<template>
<div class="UncomingComponent d-flex justify-center align-start align-content-start pl-3 pr-3 flex-wrap">
	<!--TITULO-->
	<h3>
		Upcoming payments
	</h3>

	<!--LISTA-->
	<div class="UpcomingListContent mt-1 d-flex justify-center align-start align-content-start flex-wrap">

		<div class="UpcomingItem d-flex justify-space-between   align-center align-content-center ">
			
			<!--DIA DEL CALENDARIO-->
			<div class="CalendarDayContent d-flex justify-center flex-column align-center align-content-center">
				<div class="CalendarMonth">May</div>
				<div class="CalendarDay">27</div>
			</div>

			<!--DETALLES-->
			<div class="UpcomingDetailsContent d-flex justify-center align-start flex-column">
				
				<div class="DetailContent">
					Claim:<b>123456789</b>
				</div>
				<div class="DetailContent">
					Report number:<b>123456789</b>
				</div>
				<div class="DetailContent">
					Broker:<b>Sarah Smith</b>
				</div>

			</div>
		</div>

		

		<div class="UpcomingItem d-flex justify-space-between   align-center align-content-center ">
			
			<!--DIA DEL CALENDARIO-->
			<div class="CalendarDayContent d-flex justify-center flex-column align-center align-content-center">
				<div class="CalendarMonth">May</div>
				<div class="CalendarDay">27</div>
			</div>

			<!--DETALLES-->
			<div class="UpcomingDetailsContent d-flex justify-center align-start flex-column">
				
				<div class="DetailContent">
					Claim:<b>123456789</b>
				</div>
				<div class="DetailContent">
					Report number:<b>123456789</b>
				</div>
				<div class="DetailContent">
					Broker:<b>Sarah Smith</b>
				</div>

			</div>
		</div>

		<div class="UpcomingItem d-flex justify-space-between   align-center align-content-center ">
			
			<!--DIA DEL CALENDARIO-->
			<div class="CalendarDayContent d-flex justify-center flex-column align-center align-content-center">
				<div class="CalendarMonth">May</div>
				<div class="CalendarDay">27</div>
			</div>

			<!--DETALLES-->
			<div class="UpcomingDetailsContent d-flex justify-center align-start flex-column">
				
				<div class="DetailContent">
					Claim:<b>123456789</b>
				</div>
				<div class="DetailContent">
					Report number:<b>123456789</b>
				</div>
				<div class="DetailContent">
					Broker:<b>Sarah Smith</b>
				</div>

			</div>
		</div>



	</div>


	<!--BOTON-->
	<div class="UpcomingButtonContent mt-1 d-flex justify-center align-center ">
		<v-btn	
			outlined
			class="UpcomingBtn" 
			rounded 
			>
			See more
		</v-btn>
	</div>

</div>
</template>
<style lang="less" scoped>
.UncomingComponent{
	width: 100%;
	height: 44%;

	//TITULO DEL COMPONENTE
	h3{
		width: 100%;
		font-size: 1.4rem;
	}

	//LISTA DE UPCOMING
	.UpcomingListContent{
		width: 100%; 
		height: 171px;
		overflow-y: auto;

		.UpcomingItem{
			width: 90%; 
			height: 57px;
			
			//DIA DEL CALENDARIO
			.CalendarDayContent{
				width: 25%;
				height: 100%;

				//MES DEL CALENDARIO
				.CalendarMonth{
					font-size: 12px;
				}

				//DIA DEL CALENDARIO
				.CalendarDay{
					font-size: 14px;
					font-weight: bold;
				}

			}

			//DETALLES
			.UpcomingDetailsContent{
				width: 75%;
				height: 100%;

				.DetailContent{
					width: 100%;
					font-size: 11px;
				}

			}

		}
	}
	//BOTON
	.UpcomingButtonContent{
		width: 70%; 
		height: 45px;

		.UpcomingBtn{
			width: 100% !important;
			
		}
	}
}
</style>