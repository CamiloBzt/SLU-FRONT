<template>
  <div class="NewRenewalComponent d-flex justify-center align-center mt-2">
    <div class="NewRenewalTextContent LeftButton" :class="[currentRouteName == 'Endorsements Car Ear' ? 'active shadow1' : '']">
      <div class="NewRenSn" :class="[currentRouteName == 'Endorsements Car Ear' ? 'bottomline' : '']">
        <router-link to="/subscription/endorsements">
          Car Ear
        </router-link>
      </div>
    </div>

    <div class="NewRenewalTextContent RightButton" :class="[currentRouteName == 'Endorsements Pro Cpe Cecr' ? 'active shadow2' : '']">
      <div class="NewRenSn" :class="[currentRouteName == 'Endorsements Pro Cpe Cecr' ? ' bottomline' : '']">
        <router-link to="/subscription/endorsements/pro-cpe-cecr">
          Pro Cpe Cecr
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
  name: 'TypeEndorsement',
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
