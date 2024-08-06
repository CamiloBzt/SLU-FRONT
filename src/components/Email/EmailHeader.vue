<template>
<div>
	<h5 v-html="header" >
	</h5>
	<h6>
		Account: {{account}}<br>
		Reference Number: {{reference}}
	</h6>
	<div class="ExpansionLineTop mt-4"></div>
	
</div>
</template>
<script>
export default{
	props:{
		header : {
			type:String,
		},
		account : {
			type:String,
		},
		reference : {
			type:String,
		},
	}
}
</script>
<style lang="less" scoped>
h5{
	font-size:19px;
	color: black;
	font-weight: normal;
	text-transform: capitalize;
}
h6{
	font-size: 15px;
	margin-top: 10px;
	color: #547FA9;
	line-height: 160%;
}
.ExpansionLineTop{
	background: #547FA9 !important;
}

@media(max-width: 650px)
{
	h5{
	font-size: 17px;
	}
	h6{
		font-size: 15px;
		margin-top: 3px;
	}
}
</style>