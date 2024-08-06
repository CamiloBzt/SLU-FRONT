<template>
	<div>
		<BarNavGeneral 
      :NavContent="BarNavData"
    />
		<!-- Copy account -->
		<div class="full-container d-flex justify-end align-center mt-5">
			<AppCloseAccount 
				icon="mdi-close-circle"
				header="Reason to close account"
				:closeAccountData="CloseAccountData" 
				@close-account="closeAccountById($event)"
			/>
		</div>
		<!-- Stepper -->
		<AppStepper :steps="StepperData" />
		<!-- Close account -->
		<div class="full-container d-flex justify-end align-center">
			<AppCloseAccount 
				iconColor="#003D6D"
				icon="mdi-content-copy"
				:closeAccountData="CloseAccountData" 
				@close-account="closeAccountById($event)"
			/>
		</div>
		<div class="facultative-detail-view">
			<!-- Summary -->
			<AppSection title="Summary">
				<template #app-section-content>
					<Summary />
				</template>
			</AppSection>

			<!-- Deductions -->
			<AppSection title="Deductions" class="mt-7">
				<template #app-section-content>
					<Deductions />
				</template>
			</AppSection>

			<!-- Slu -->
			<AppSection title="Slu" class="mt-7">
				<template #app-section-content>
					<Slu />
				</template>
			</AppSection>
		</div>
		<div class="button-container d-flex justify-end align-center">
			<v-btn elevation="0">
				Next
			</v-btn>
		</div>
	</div>
</template>
<script>
import BarNavGeneral from "@/components/BarNavGeneral"
import AppCloseAccount from "@/application/components/AppCloseAccount"
import AppSection from '@/application/components/AppSection'
import AppStepper from '@/application/components/AppStepper'
import Summary from './components/Summary'
import Deductions from './components/Deductions'
import Slu from './components/Slu'

// Services
import { BarNavData } from './services/mock-bar-nav.service.js'
import { GetCloseAccount } from './services/mock-get-close-account.service'
import { GetStepper } from './services/mock-get-stepper.service.js'

export default {
  name: 'FacultativeDetailView',
	components: {
		AppSection,
		AppCloseAccount,
		BarNavGeneral,
		AppStepper,
		Summary,
		Deductions,
		Slu
	},
	data: () => {
		return {
			BarNavData:[],
			StepperData: [],
			CloseAccountData: []
		}
	},
	async beforeMount () {
		this.BarNavData = await BarNavData()
		this.CloseAccountData = await GetCloseAccount()
		this.StepperData = await GetStepper()
	},
	methods: {
		closeAccountById ( { idOptionSelected } ) {

		}
	}
}
</script>
<style scoped lang="scss">
.facultative-detail-view {
	background: white;
	box-shadow: 8px 8px 12px rgb(10 63 102 / 15%);
	padding: 28px 20px;
	border-radius: 15px;
	margin-top: 28px;
}

.button-container {
	width: 100%;
	height: 50px;
	margin-top: 15px;
	.v-btn {
		background: transparent;
		border-radius: 24px;
		color: #003D6D;
		border: 1px solid;
		width: 217px;
		height: 40px;
	}
}
</style>