<template>
	<div class="InputsLine d-flex justify-space-between align-self-start flex-wrap">
		
		<div class="InputCont">
      <v-text-field label="Limit Insured" />
    </div>
    <div class="InputCont">
      <v-text-field label="Excess" />
    </div>
    <div class="InputCont">
      <v-text-field label="Total Premium" />
    </div>


    <div class="InputCont">
      <v-text-field label="SLU Line" />
    </div>
    <div class="InputCont">
      <v-text-field label="SLU Exposure" />
    </div>
    <div class="InputCont">
      <v-text-field label="SLU Premium" />
    </div>

	</div>
</template>
<script>
export default {
	name:'FacultativeInsuredInfo'
}
</script>
<style lang="less" scoped>
.InputsLine{
	width: 100%; 
	height: auto;
	
	.InputCont{
	  width: 30%;
	  margin-top: 5px;
	  @media(max-width: 650px){
	  	width: 100%;
	  }
	}	
}
</style>