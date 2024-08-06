<template>
	<div class="installments-suscription">
		<div class="installments-suscription__title">
			Installments subscription
		</div>
		<div class="installments-suscription__form">
			<v-radio-group @change="evaluateRadio($event)" row v-model="installments">
				<v-radio value="installment1" label="Installment 30%" />
				<div class="space" />
				<v-radio value="installment2" label="Installment 40%" />
				<div class="space" />
				<v-radio value="installment3" label="Installment 30%" />
				<div class="space" />
				<div class="radio-with-text-container">
					<v-radio value="installment4" label="Installment"/>
					<div class="radio-with-text-container__input">
						<v-text-field :disabled="disabledCustomInstallment" suffix="%"/>
					</div>
				</div>
				<div class="space" />
				<v-btn
					class="button-submit"
					rounded 
					depressed
					color="#003D6D"
					>
					Preview total premium
				</v-btn>
			</v-radio-group>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Installments subscription',
	data: () => {
		return {
			installments: false,
			disabledCustomInstallment: true
		}
	},
	methods: {
		evaluateRadio (value) {
			value === 'installment4' ? this.disabledCustomInstallment = false : this.disabledCustomInstallment = true
		}
	}
}
</script>
<style lang="less">
.installments-suscription {
	
	// Titulo
	&__title {
		font-size: 20px;
		font-weight: 600;
	}
	&__form {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		height: auto;
		margin-top: 10px;

		.radio-with-text-container {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			&__input {
				width: 50px;
				margin-left: -8px;
			}
		}
		.button-submit {
			width: 213px;
			color: white !important;
			height: 40px !important;
			font-weight: 400;
			letter-spacing: normal;
			margin-left: 15px;
		}
	}
}
.space {
	width: 10px;
}
</style>