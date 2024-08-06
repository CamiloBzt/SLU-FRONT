<template>
  <div class="app-section">
		<h2 class="app-section__title">
			{{ title }}
		</h2>
		<div>
			<slot name="app-section-content"></slot>
		</div>
	</div>
</template>
<script>
export default {
	name: 'AppSection',
	props: {
		title: String
	}
}
</script>
<style scoped lang="scss">
.app-section {
	width: 100%;
	height: auto;

	&__title {
		font-size: 20px;
	}
}
</style>