<template>
  <div class="NewRenewalComponent d-flex justify-center align-center mt-2">
    <router-link to="/underwriting/submission"
    class="NewRenewalTextContent LeftButton" 
    :class="[
      currentRouteName == 'Subs submission' || 
      currentRouteName == 'Edit Subs submission' 
      ? 'active shadow1' : ''
    ]">
      <div class="NewRenSn" :class="
        [
          currentRouteName == 'Subs submission' || 
          currentRouteName == 'Edit Subs submission' 
          ? 'bottomline' : '']
        ">
        New Account
      </div>
    </router-link>

    <router-link to="/renewals/accounts" class="NewRenewalTextContent RightButton" 
    :class="[
      currentRouteName == 'Accounts to be renewed' ||
      currentRouteName == 'Renewal subscription'
      ? 'active shadow2' : ''
    ]">
      <div class="NewRenSn" 
      :class="[
      currentRouteName == 'Accounts to be renewed' ||
      currentRouteName == 'Renewal subscription' ? 'bottomline' : ''
      ]">
        Account Renewal
      </div>
    </router-link>

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
