<template>
  <div class="section-container">
		<div class="input-content">
      <v-text-field label="LTA" />
  	</div>
		<div class="input-content">
      <v-text-field label="-" />
  	</div>
		<div class="input-content">
      <v-text-field label="TAX" />
  	</div>
		<div class="input-content">
      <v-text-field label="Eng fee" />
  	</div>


		<div class="input-content">
      <v-text-field label="Fronting" />
  	</div>
		<div class="input-content">
      <v-text-field label="Others" />
  	</div>
		<div class="input-content">
      <v-text-field label="Colombia reserve" />
  	</div>
		<div class="input-content"></div>
		
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