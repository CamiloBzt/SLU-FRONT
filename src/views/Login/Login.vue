<template>
	<div class="LoginContent d-flex justify-end">
		<!--LOGO MOVIL-->
		<div
		v-if="IsMovil"
		class="LogoCont">
			<img class="LogoMovil"
				src="@/assets/img/logo.svg"
			/>
		</div>
		<!--COMPONENTES-->
		<LoginComponent/>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'

	import LoginComponent from '@/components/Login/LoginComponent.vue';

	export default{
		name:'Login',
		components: { LoginComponent },
		computed: {
			IsMovil(){
				if(
					window.innerWidth < 600 &&
					this.$route.path !='/login'
				){
					return true
				}else{
					return false;
				}
			}
		},
	}
</script>

<style lang="less" scoped>
.LogoCont{
	width: 100%;
	height: auto;
	position: absolute;
	top: 7%;
	display: flex;
	justify-content: center;
	align-items: center;

	.LogoMovil{
		width: 150px;
	}
}
</style>