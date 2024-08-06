<template>
<div class="StepperHeadComponent d-flex justify-center align-center mt-1">

	<!--PASOS SIGUIENTES-->
	<div class="
		StepContent  
		d-flex 
		justify-center 
		align-center
		" 
		:class="step1"
		>
		<!--NUMERO DEL PASO-->
		<div class="StepNumber d-flex justify-center align-center">
			1
		</div>
		<!--NOMBRE DEL PASO-->
		<div class="StepText ml-2">
			Submission
		</div>
	</div>

	<div class="
		StepContent 
		d-flex 
		justify-center 
		align-center
		ml-10
		mr-10
		" 
		:class="step2"
		>
		<!--NUMERO DEL PASO-->
		<div class="StepNumber d-flex justify-center align-center">
			2
		</div>

		<!--NOMBRE DEL PASO-->
		<div class="StepText ml-2">
			Quotation
		</div>
	</div>

	<div class="
		StepContent 
		d-flex 
		justify-center 
		align-center" 
		:class="step3"
		>
		<!--NUMERO DEL PASO-->
		<div class="StepNumber d-flex justify-center align-center">

			3
		</div>

		<!--NOMBRE DEL PASO-->
		<div class="StepText ml-2">
			Bound
		</div>
	</div>

	<div class="HideOnMovil">
		<CloseAccount />
	</div>
</div>
</template>
<script>
import CloseAccount from '@/components/subscription/CloseAccount.vue'
import {stepper} from '@/mixins/subscription.js'; 


export default {
	mixins:[stepper],
  name: 'stepperQuotation',
	components: {
    CloseAccount
  },
}
</script>
<style lang="less" scoped>
@import "~@/assets/style/Subscription/Stepper.less";
</style>