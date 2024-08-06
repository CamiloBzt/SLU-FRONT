<template>
	<div 
		v-if="show"
		:class="position ? 'Loading-Absolute':'' "
		class="Loading d-flex justify-center align-center">
  		<img src="@/assets/img/loader.svg" />  
	</div>
</template>
<script>
export default {
	name:'Loading',
	props:{

		show:{
			type:Boolean,
			required:true,
			default:false
		},

		//Define si su posición derá fixed o absolute
		position:{
			type:String,
			required:false,
			default:'fixed'
		}
	}
}
</script>
<style lang="less">
.Loading{
	width: 100vw;
	height: 100vh;
	position: fixed;
	left: 0;
	top: 0;
	background: rgba(0,0,0,.7);
	z-index: 5000;
}


/*
	Variaciones del modal
*/

//Posicion absoluta
.Loading-Absolute{
	position:absolute;
	width: 100%; height: 100%;
	img{
		height: 130px;
	}

}
</style>