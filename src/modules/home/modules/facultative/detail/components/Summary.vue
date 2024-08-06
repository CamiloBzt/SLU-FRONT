<template>
  <v-form v-model="valid" class="section-container">
		<div class="input-content">
      <v-text-field 
				v-model="limitInsurer"
				:rules="textRules" 
				label="Limited insurer" 
			/>
  	</div>
		<div class="input-content">
      <v-text-field label="Excess" />
  	</div>
		<div class="input-content">
      <v-text-field label="Total premium" />
  	</div>
		<div class="input-content">
      <v-text-field label="Excess" />
  	</div>


		<div class="input-content">
      <v-text-field label="SLU line" />
  	</div>
		<div class="input-content">
      <v-text-field label="SLU exposure" />
  	</div>
		<div class="input-content">
      <v-text-field label="SLU premium" />
  	</div>
		<div class="input-content">
      <v-text-field label="Country" />
  	</div>


		<div class="input-content">
      <v-text-field label="TIV damage" />
  	</div>
		<div class="input-content">
      <v-text-field label="TIV BI" />
  	</div>
		<div class="input-content">
      <v-text-field label="TIV stocks" />
  	</div>
		<div class="input-content">
      <v-text-field label="TIV total" />
  	</div>
	</v-form>
</template>
<script>
// Mixins
// validation-form.mixin.js
import { validationForm } from '@/application/mixins/validation-form.mixin'
export default {
	name: 'Summary',
	mixins: [validationForm],
	data: () => {
		return {
			limitInsurer: '',
			valid: false
		}
	}
}
</script>
<style lang="scss" scoped>
.section-container {
	width: 100%;
	height: auto;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	align-content: flex-start;
	flex-wrap: wrap;
	row-gap: 10px;

	.input-content{
		width: 23%; 
		height: 50px;
		@media(max-width: 650px) {
			width: 100%;
		}
	}
}

</style>