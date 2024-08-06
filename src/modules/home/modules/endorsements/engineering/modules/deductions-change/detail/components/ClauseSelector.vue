<template>
	<div class="input-cont">
		<v-autocomplete label="Clause" v-model="clause" :items="clauseList" item-value="id" item-text="clause" />
	</div>
</template>

<script>
import PaymentService from '@/modules/home/services/payments.service'

export default {
	name: "ClauseSelector",
	props: {
		clause: { type: String },
	},
	data() {
		return {
			clauseList: [],
		}
	},
	async beforeMount() {
		this.clauseList = await PaymentService.getClauses();
	}
}

</script>

<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";

.input-cont {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	align-content: center;
	margin: 5px 0;
}
</style>