<template>
  <div class="section-container">
		<div class="input-content">
      <v-text-field label="Limited insurer" />
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
	</div>
</template>
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