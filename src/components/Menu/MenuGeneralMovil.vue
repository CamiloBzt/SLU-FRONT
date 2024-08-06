<template>
<div class="MenuGeneralMovilCont  pl-10 pr-10">

	<div class="MenuGeneralSn d-flex justify-space-between align-center alugn-content-center">

		<!--BOTON HAMBURGUESA-->
		<div class="ButtonMenuCont d-flex justify-center align-center">
			<v-btn
	  		fab small text depressed
	  		@click="SideMenu = !SideMenu"
				>
					<v-icon>mdi-menu</v-icon>
			</v-btn>
		</div>
	</div>
	<v-navigation-drawer
	  style="z-index: 1000000"
	  right
	  v-model="SideMenu"
	  absolute
	  temporary
		>

	  <v-list dense>
	    <v-list-item
	     	link
	     	@click="redirigir('Home')"
	    	>
	      <v-list-item-icon>
	        <v-icon>mdi-view-dashboard</v-icon>
	      </v-list-item-icon>

	      <v-list-item-content>
	       	<v-list-item-title>
	       	  Menu link
	       	</v-list-item-title>
	     	</v-list-item-content>
	    </v-list-item>
	  </v-list>
	</v-navigation-drawer>
</div>
</template>
<script>
export default {
	data(){
		return{
			 SideMenu: false,
		}
	}
}
</script>
<style lang="less" scoped>
.MenuGeneralMovilCont{
	width: 100%;
	background: white;
	border-bottom-right-radius: 24px;
	border-bottom-left-radius: 24px;
	box-shadow: 0px 7px 10px rgba(10, 63, 102, 0.15);
	.MenuGeneralSn{
		width: 100%;
		height: 100%;
	}
}
</style>