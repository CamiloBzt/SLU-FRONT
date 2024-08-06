<template>
	<div class="Reinsurer d-flex justify-center align-self-start flex-wrap">
		
    <!--Numero de insurer-->
		<h5 class="Reinsurer__Number d-flex justify-start align-center">
			Deductions
		</h5>

		<div class="Reinsurer__InputsCont d-flex justify-start align-self-start flex-wrap">
			<div class="InputCont">
        <v-text-field label="LTA" />
      </div>
      <div class="InputCont">
        <v-text-field label="Brokerage" />
      </div>
      <div class="InputCont">
        <v-text-field label="Tax" />
      </div>
      <div class="InputCont">
        <v-text-field label="Eng Fee" />
      </div>
      <div class="InputCont">
        <v-text-field label="Fronting" />
      </div>
      <div class="InputCont">
        <v-text-field label="Others" />
      </div>
      <div class="InputCont">
        <v-text-field label="Colombia Reserve" />
      </div>
    </div>

	</div>
</template>
<script>
export default{
	name:'SummaryDeductions'
}
</script>
<style lang="less" scoped>
@import '~@/assets/style/Facultative.less';
</style>