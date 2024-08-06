<template>
  <div>
		<div class="detail-table">

			<div class="detail-table__row detail-table__row--small">
				<div class="table-header table-header--invisible"></div>
				<!-- <div class="table-title"></div> -->
				<div class="table-title"></div>
				<div class="table-title table-title--large">Total premium movement</div>
				<div class="table-title table-title--large">Premium SLU</div>
				<div class="table-title table-title--large">Net premium</div>
				<!-- <div class="table-title table-title--large">Total</div> -->
			</div>

			<div class="detail-table__row">
				<div class="table-header table-header--border-left">Original currency</div>
				<div class="table-title"></div>
				<!-- <div class="table-title">Premium SLU</div> -->
				<!-- Values Row 1 -->
				<div class="table-value">${{ this.tableData.currency.total_premium.total_premium_movement }}</div>
				<!-- <div class="table-value">${{ this.tableData.currency.premium_slu.total_premium_movement }}</div> -->

				<!-- Values Row 2 -->
				<div class="table-value">${{ this.tableData.currency.total_premium.premium_slu }}</div>
				<!-- <div class="table-value">${{ this.tableData.currency.premium_slu.premium_slu }}</div> -->

				<!-- Values Row 3 -->
				<div class="table-value">${{ this.tableData.currency.total_premium.net_premium }}</div>
				<!-- <div class="table-value">${{ this.tableData.currency.premium_slu.net_premium }}</div> -->

				<!-- Values Row 4 -->
				<!-- <div class="table-value table-value--no-background">${{ this.tableData.currency.total_premium.total }}</div> -->
				<!-- <div class="table-value table-value--no-background">${{ this.tableData.currency.premium_slu.total }}</div> -->
			</div>
			<div class="detail-table__separator"></div>
			<div class="detail-table__row">
				<div class="table-header table-header--border-right">USD</div>
				<div class="table-title"></div>
				<!-- <div class="table-title">Premium SLU</div> -->
				<!-- Values Row 1-->
				<div class="table-value">${{ this.tableData.usd.total_premium.total_premium_movement }}</div>
				<!-- <div class="table-value">${{ this.tableData.usd.premium_slu.total_premium_movement }}</div> -->
				<!-- Values Row 2 -->
				<div class="table-value">${{ this.tableData.usd.total_premium.premium_slu }}</div>
				<!-- <div class="table-value">${{ this.tableData.usd.premium_slu.premium_slu }}</div> -->
				<!-- Values Row 3 -->
				<div class="table-value">${{ this.tableData.usd.total_premium.net_premium }}</div>
				<!-- <div class="table-value">${{ this.tableData.usd.premium_slu.net_premium }}</div> -->
				<!-- Values Row 4 -->
				<!-- <div class="table-value table-value--no-background">${{ this.tableData.usd.total_premium.total }}</div> -->
				<!-- <div class="table-value table-value--no-background">${{ this.tableData.usd.premium_slu.total }}</div> -->
			</div>

		</div>
	</div>
</template>
<script>
export default {
	name: "Table",
	props: {
		tableData: { type: Object },
	},
	beforeMount() {
		// console.log('beforeMount', this.tableData);
	}
}

</script>
<style lang="less" scoped>
.detail-table {
	width: 100%;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	align-content: flex-start;
	&__row {
		&--small {
			width: 15%;
		}
		width: 25%;
		height: auto;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		align-content: flex-start;

		.table-header {
			&--invisible {
				background: transparent;
			}
			&--border-left {
				border-top-left-radius: 6px;
				border-bottom-left-radius: 6px;
				position: relative;
				&::before {
					content: "";
					position: absolute;
					right: -5px;
					width: 10px;
					height: 100%;
					background: white;
				}
			}
			&--border-right {
				border-top-right-radius: 6px;
				border-bottom-right-radius: 6px;
			}
			background: #547FA9;
			height: 50px;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 20px;
			font-weight: 800;
		}
		.table-title {
			&--large {
				width: 100%;
			}
			width: 100%;
			font-weight: 800;
			font-size: 16px;
			line-height: 110%;
			height: 50px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 0px 5px;
		}
		.table-value {
			width: 100%;
			background: #DCE5FC;
			height: 50px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 0px 5px;
			&--no-background {
				background: transparent;
			}
		}
	}
}
</style>