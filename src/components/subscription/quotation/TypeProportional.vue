<template>
  <div class="NewRenewalComponent d-flex justify-center align-center mt-2">
    <div class="NewRenewalTextContent LeftButton" :class="[currentRouteName == 'Edit Subs quotation' ? 'active shadow1' : '']" v-if="subscription_id">
      <div class="NewRenSn" :class="[currentRouteName == 'Edit Subs quotation' ? 'bottomline' : '']">
        <router-link :to="'/subscription/' + this.subscription_id + '/quotation/proportional'">
          Proportional
        </router-link>
      </div>
    </div>
    <div class="NewRenewalTextContent LeftButton" :class="[currentRouteName == 'Quotation proportional' ? 'active shadow1' : '']" v-else>
      <div class="NewRenSn" :class="[currentRouteName == 'Quotation proportional' ? 'bottomline' : '']">
        <router-link to="/subscription/quotation/proportional">
          Proportional
        </router-link>
      </div>
    </div>

    <div class="NewRenewalTextContent RightButton" :class="[currentRouteName == 'Edit Subs quotation non-proportional' ? 'active shadow2' : '']" v-if="subscription_id">
      <div class="NewRenSn" :class="[currentRouteName == 'Edit Subs quotation non-proportional' ? ' bottomline' : '']">
        <router-link :to="'/subscription/' + this.subscription_id + '/quotation/non-proportional'">
          Non Proportional
        </router-link>
      </div>
    </div>

    <div class="NewRenewalTextContent RightButton" :class="[currentRouteName == 'Quotation non proportional' ? 'active shadow2' : '']" v-else>
      <div class="NewRenSn" :class="[currentRouteName == 'Quotation non proportional' ? ' bottomline' : '']">
        <router-link to="/subscription/quotation/non-proportional">
          Non Proportional
        </router-link>
      </div>
    </div>

    <CloseAccount />
  </div>
</template>
<script>
import { getCurrentPathName } from '@/mixins/subscription.js';
import CloseAccount from '@/components/subscription/CloseAccount.vue'
import { mapGetters } from 'vuex';
export default {
  name: 'typeProportional',
  mixins: [getCurrentPathName],
  data() {
    return {
      type: null,
    };
  },
  computed: {
    ...mapGetters(['subscription_id']),
  },
  components: {
    CloseAccount
  },
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
