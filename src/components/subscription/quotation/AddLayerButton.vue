<template>
<div class="layerButtonCont d-flex justify-start align-center">
	<v-btn
		text
		rounded
		class="btn"
	>
		<v-icon class="mr-3">
			mdi-plus-circle
		</v-icon>
		Add New Layer
	</v-btn>
</div>
</template>

<style lang="less" scoped>
.layerButtonCont{
	width: 100%;
	height: 60px;
	margin-left: -24px;
	.btn{
		text-transform: capitalize !important;
		font-size: 16px;
		color: #003D6D;
		font-weight: 500;
	}
}
</style>