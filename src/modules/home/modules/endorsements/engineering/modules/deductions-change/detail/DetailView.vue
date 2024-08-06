<template>
  <div class="endorsement">
		<div class="endorsement__stepper">
			<AppStepper :steps="steps"/>
		</div>
		<div class="endorsement__content">
			<Table />
		</div>
		<div class="endorsement__actions">
			<div class="button-container">
				<v-btn rounded large depressed>
					Next
				</v-btn>
				<v-btn rounded large depressed class="v-btn--solid">
					Return
				</v-btn>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.endorsement {
	&__stepper {
		height: 80px;
	}
	&__content {
		width: 100%;
		background: white;
		height: auto;
		box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
		border-radius: 12px;
		padding: 150px 41px;
		.endorsement-title {
			font-style: normal;
			font-weight: 800;
			font-size: 20px;
			line-height: 110%;
		}
		.endorsement-inputs-container { 
			padding: 0px 20px;
			margin-top: 15px;
		}
	}
	&__actions {
		display: flex;
		justify-content: flex-end;
		align-items: flex-start;
		margin-top: 25px;
		padding-bottom: 25px;
		.button-container {
			display: flex;
			justify-content: flex-start;
			align-items: flex-end;
			flex-direction: column;
			align-content: flex-start;
			gap: 15px;
			.v-btn {
				&--solid {
					background: #003D6D !important;
					color: white !important;
				}
				width: 217px;
				color: #003D6D;
				text-transform: none;
				font-weight: 500;
				height: 40px !important;
				font-size: 15px;
				letter-spacing: normal !important;
				background: transparent !important;
				border: solid 1px #003D6D;
			}
		}
	}
}
</style>
<script>
import AppStepper from '@/application/components/AppStepper.vue'
import Table from './components/Table.vue'
export default {
	name: 'DeductionsChangeView',
	components: {
		AppStepper,
		Table,
	},
	data : () => {
		return {
			steps: [
				{
					id: 1,
					active: false,
					path: '#',
					stepName: 'Endorsement'
				},
				{
					id: 2,
					active: true,
					path: '#',
					stepName: 'Detail'
				},
				{
					id: 3,
					active: false,
					path: '#',
					stepName: 'Admitted premium'
				}
			]
		}
	}
}
</script>