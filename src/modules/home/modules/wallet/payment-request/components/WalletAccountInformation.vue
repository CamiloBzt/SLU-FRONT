<template>
  <div class="wallet-account-information">
		<div class="input-container">
			<v-text-field label="Bound number" />
		</div>
		<div class="input-container">
			<v-text-field label="Insured" />
		</div>
		<div class="input-container">
			<v-text-field label="Line" />
		</div>
		<div class="input-container input-container--small">
			<v-text-field label="Interception" />
		</div>
		<div class="input-container input-container--small">
			<v-text-field label="Expiry" />
		</div>


		<div class="input-container">
			<v-text-field label="Country" />
		</div>
		<div class="input-container">
			<v-text-field label="Cedent" />
		</div>
		<div class="input-container">
			<v-text-field label="Broker" />
		</div>
		<div class="input-container input-container--small"></div>
		<div class="input-container input-container--small"></div>

		<div class="input-container">
			<v-text-field label="Limit" />
		</div>
		<div class="input-container">
			<v-text-field label="Excess" />
		</div>
		<div class="input-container">
			<v-text-field label="SLU line" />
		</div>
		<div class="input-container">
			<v-text-field label="SLU limit" />
		</div>
		<div class="input-container input-container--small"></div>

	</div>
</template>
<style lang="less" scoped>
.wallet-account-information {
	width: 100%;
	height: auto;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	align-content: flex-start;
	flex-wrap: wrap;
	justify-content: flex-start;
	gap:1.75%;
	row-gap: 25px;
	.input-container {
		width: 19.5%;
		height: 50px;
		&--small {
			width:15%;
		}
	}
}

</style>