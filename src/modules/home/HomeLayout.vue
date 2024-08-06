<template>
	<div class="AppMain d-flex flex-wrap">
		<div class="LateralMenuContent">
		<MenuGeneral />
	</div>
		<div class="general-content GeneralContent FullOnMovil pl-10 pr-10">
			<TitlePage :title="pageTitle" />
			<router-view />
		</div>
	</div>
</template>
<style lang="scss" scoped>
.general-content {
	.full-container {
		height: 50px;
	}
}
</style>
<script>
// Components
import MenuGeneral from "@/components/Menu/MenuGeneral"
import TitlePage from "@/components/TitlePage"
import TypeSubmission from "@/components/subscription/submission/TypeSubmission"
export default {
	name: 'HomeLayout',
	data: () => {
		return {
			pageTitle: ''
		}
	},
	components: {
		TitlePage,
		MenuGeneral,
		TypeSubmission
	},
	
	methods: {
		closeAccountById ( { idOptionSelected } ) {

		}
	},
	mounted() {
		this.pageTitle = this.$route.name
	}
}
</script>