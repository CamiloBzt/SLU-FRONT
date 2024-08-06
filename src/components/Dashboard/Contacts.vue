<template>
<div class="ContactInformation d-flex justify-center align-start align-content-start flex-wrap">

	<!--TITULO-->
	<div class="TitleSection d-flex justify-start align-center">
		<h4>
			Contacts
		</h4>
	</div>


	<!--CONTENIDO-->

	<div class="ContentDashboard d-flex justify-end align-start flex-wrap align-content-start pa-7">

		<!-- <div class="lineDivider"></div> -->

		<!--CONTACTOS-->
		<div class="ContactsCont d-flex justify-end align-center">

			<!--IMAGEN-->
			<div class="ImageCon d-flex justify-center align-start align-content-start">

				<v-avatar size="47" class="AvatarCnt">
		      <img
		        src="https://cdn.vuetifyjs.com/images/john.jpg"
		        alt="John"
		      >
    		</v-avatar>

			</div>

			<!--INFO-->
			<div class="InfoCont">
				Name: <b>Ana Smith</b><br>
				Contact Number: <b>123456789</b><br>
				Contact E-mail:
				<b>JaneSmith@slu.com</b><br>
				SLU Position: <b>Sarah Smith</b>
			</div>

		</div>

	</div>
</div>
</template>
<style lang="less" scoped>
@import '~@/assets/style/Dashboard/General.less';
.ContactInformation{margin-top: 25px;}
.ContentDashboard{
	height: 582px;

	.lineDivider{
		width: 80%;
		height: 1px;
		background: grey;
		margin-top: 10px;
	}


	//CONTACTOS
	.ContactsCont{
		width: 100%;
		min-height: 70px;
		margin-top: 15px;
		position: relative;

		//IMAGEN
		.ImageCon{
			width: 20%;
			height: 100%;
			position:absolute;
			top: 0;
			left: 0;
		}

		//INFORMACION
		.InfoCont{
			width: 80%;
			height: auto;
			font-size: 14px;
		}
	}
}


</style>