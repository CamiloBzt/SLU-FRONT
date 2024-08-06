<template>
	<div class="Reinsurer d-flex justify-center align-self-start flex-wrap">
		
    <!--Numero de insurer-->
		<h5 class="Reinsurer__Number d-flex justify-start align-center">
			DIC reinsurer  {{numberReinsurer}}
		</h5>

		<!--Inputs-->
		<div class="Reinsurer__InputsCont d-flex justify-start align-self-start flex-wrap">
			<div class="InputCont Disabled">
        <v-text-field disabled value="Everglades DIC" />
      </div>
    </div>

    <div class="Reinsurer__InputsCont d-flex justify-start align-self-start flex-wrap mt-2">
      <div class="InputCont">
        <v-text-field label="Line" />
      </div>
      <div class="InputCont">
        <v-text-field label="Reinsurer Premium" />
      </div>
      <div class="InputCont">
        <v-text-field label="Net Premium" />
      </div>
      <div class="InputCont">
        <v-text-field label="Fronting" />
      </div>
    </div>


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
        <v-text-field label="SLU Net Adjusted (To Everglades Re DIC)" />
      </div>
      <div class="InputCont">
        <v-text-field label="Premium Amount to Reinsurer" />
      </div>

      <div class="InputCont">
        <v-text-field label="Everglades Re2 DIC" />
      </div>
      <div class="InputCont">
        <v-text-field label="Broker Commission" />
      </div>
    </div>

	</div>
</template>
<script>
export default{
	name:'SummaryDicReinsurer',
	props:{
		numberReinsurer:{
			type: String,
      required:true,
			default:'1',
		}
	},
}
</script>
<style lang="less" scoped>
@import '~@/assets/style/Facultative.less';
</style>