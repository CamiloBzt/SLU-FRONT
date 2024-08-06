<template>
	<v-dialog v-model="dialog" width="600">
		<v-card id="card-eye" class="pb-3">
			<!-- button close -->
			<v-card-actions class="px-3 pb-3">
				<v-flex text-xs-right>
					<v-btn
						@click="dialog = false"
						color="orange"
						dark
						small
						absolute
						fab
						right
					>
						<v-icon color="white">mdi-close</v-icon>
					</v-btn>
				</v-flex>
			</v-card-actions>
			<v-card-title class="font-weight-bold text-h5"
				>Confirmation Four eyes law</v-card-title
			>
			<v-divider id="divisor"></v-divider>
			<div id="border-blue" class="mb-8">
				<v-card-text class="font-weight-bold text-h6 blue-text"
					>You have sent David Acosta a review request.</v-card-text
				>
				<v-divider id="divisor"></v-divider>
			</div>
		</v-card>
	</v-dialog>
</template>
<script>
export default {
	data() {
		return {
			dialog: true,
		};
	},
};
</script>
<style scoped>
#card-eye {
	border-radius: 20px;
}
#divisor {
	width: 92%;
	margin: auto;
	background-color: #a8bfd9;
}
#border-blue {
	margin: 20px;
	border: solid 2px #a8bfd9;
	border-radius: 20px;
}
.blue-text {
	color: #547fa9 !important;
}
.inputSearch >>> .v-input__slot::before {
	border-style: none !important;
}
.btnRequest {
	background-color: #003d6d !important;
	color: white;
	font-weight: 800;
}
.transparent-bg {
	background-color: transparent !important;
}
</style>
