<template>
	<div class="Reinsurer d-flex justify-center align-self-start flex-wrap">
		
    <!--Numero de insurer-->
		<h5 class="Reinsurer__Number d-flex justify-start align-center">
			Retrocession
		</h5>

		<!--Inputs-->
		<div class="Reinsurer__InputsCont d-flex justify-start align-self-start flex-wrap">
			<div class="InputCont Disabled">
        <v-text-field disabled value="Mandarin" />
      </div>
    </div>

    <div class="Reinsurer__InputsCont d-flex justify-start align-self-start flex-wrap">
			<div class="InputCont">
        <v-text-field label="Line" />
      </div>
      <div class="InputCont">
        <v-text-field label="Exposure" />
      </div>
      <div class="InputCont">
        <v-text-field label="Total Premium" />
      </div>
      <div class="InputCont">
        <v-text-field label="Premium Line" />
      </div>
      <div class="InputCont">
        <v-text-field label="Difference Total Premium" />
      </div>
      <div class="InputCont">
        <v-text-field label="Difference Premium Line" />
      </div>
      <div class="InputCont">
        <v-text-field label="Net Premium" />
      </div>
    </div>

    <!--Deductions-->
    <h5 class="Reinsurer__Number d-flex justify-start align-center">
      Deductions
    </h5>
    <div class="Reinsurer__InputsCont d-flex justify-start align-self-start flex-wrap mt-7"> 
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
        <v-text-field label="Fronting Fee" />
      </div>
      <div class="InputCont">
        <v-text-field label="Others" />
      </div>
    </div>

    <div class="Reinsurer__InputsCont d-flex justify-start align-self-start flex-wrap mt-7">
      <div class="InputCont">
        <v-text-field label="Premium Amount to Reinsurer %" />
      </div>
      <div class="InputCont">
        <v-text-field label="Premium Amount to Reinsurer" />
      </div>

      <div class="InputCont">
        <v-text-field label="Broker Commission %" />
      </div>
      <div class="InputCont">
        <v-text-field label="Broker Commission" />
      </div>

      <div class="InputCont">
        <v-text-field label="SLU Commission %" />
      </div>
      <div class="InputCont">
        <v-text-field label="SLU Commission   " />
      </div>

      <div class="InputCont">
        <v-text-field label="Total Commission  SLU " />
      </div>
    </div>

	</div>
</template>
<style lang="less" scoped>
@import '~@/assets/style/Facultative.less';
</style>
<script>
export default{
	name:'SummaryRetrocession',
}
</script>