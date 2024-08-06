<template>
  <div class="NewRenewalComponent d-flex justify-center align-center mt-2">
    <div class="NewRenewalTextContent LeftButton" :class="[currentRouteName == 'Accounts to be renewed' ? 'active shadow1' : '']">
      <div class="NewRenSn" :class="[currentRouteName == 'Accounts to be renewed' ? 'bottomline' : '']">
        <router-link to="/renewals/accounts">
          New Account
        </router-link>
      </div>
    </div>

    <div class="NewRenewalTextContent RightButton" :class="[currentRouteName == 'Renewal subscription' ? 'active shadow2' : '']">
      <div class="NewRenSn" :class="[currentRouteName == 'Renewal subscription' ? ' bottomline' : '']">
        <router-link to="/renewals/subscription">
          Account Renewal
        </router-link>
      </div>
    </div>

    <CloseAccount />
  </div>
</template>
<script>
import { getCurrentPathName } from '@/mixins/subscription.js';
import CloseAccount from '@/components/subscription/CloseAccount.vue';
export default {
  name: 'TypeRenewals',
  mixins: [getCurrentPathName],
  components:{
    CloseAccount
  }
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/Accounts/NewRenewal.less';
@media (max-width: 640px) {
  .NewRenewalComponent {
    height: 80px;
    align-content: flex-end;
    align-items: flex-end;
    justify-content: flex-start !important;
  }
}
</style>
