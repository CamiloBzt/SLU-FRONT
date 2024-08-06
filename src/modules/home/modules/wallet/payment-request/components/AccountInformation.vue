<template>
  <div class="account-information">
		<div class="account-information__title">
			Account information
		</div>
		<WalletAccountInformation />
		<div class="account-information__divider" />
		<InstallmentsSuscription />
	</div>
</template>
<script>
import WalletAccountInformation from './WalletAccountInformation'
import InstallmentsSuscription from './InstallmentsSuscription'
export default {
	name: 'Wallet account information',
	components: {
		WalletAccountInformation,
		InstallmentsSuscription
	}
}
</script>
<style lang="scss" scoped>
.account-information{
	&__title {
		font-size: 20px;
		font-weight: 600;
	}
	&__divider{
		width: 100%;
		height: 1px;
		background: #A8BFD9;
		margin-top: 40px;
		margin-bottom: 30px;
	}
}
</style>