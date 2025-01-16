<template>
  <div
    v-if="!isLoading"
    class="NewRenewalComponent d-flex justify-center align-center mt-2"
  >
    <div
      v-if="!propEng"
      class="NewRenewalTextContent LeftButton RightButton active"
    >
      <div
        class="NewRenSn"
        :class="[currentRouteName == 'Edit Bound' ? 'bottomline' : '']"
      >
        <router-link :to="'/subscription/' + this.subscription_id + '/bound'">
          Engineering
        </router-link>
      </div>
    </div>

    <div
      class="NewRenewalTextContent LeftButton RightButton active"
      v-else-if="currentRouteName == 'Bound Property Quotator Proportional'"
    >
      <div class="NewRenSn bottomline">
        <router-link
          :to="
            '/subscription/' +
            this.subscription_id +
            '/bound/property-quotator-proportional'
          "
        >
          Property Prop.
        </router-link>
      </div>
    </div>
    <div
      class="NewRenewalTextContent LeftButton RightButton active"
      v-else-if="currentRouteName == 'Bound Property Quotator Non Proportional'"
    >
      <div class="NewRenSn bottomline">
        <router-link
          :to="
            '/subscription/' +
            this.subscription_id +
            '/bound/property-quotator-non-proportional'
          "
        >
          Property Non Prop.
        </router-link>
      </div>
    </div>
    <div class="NewRenewalTextContent LeftButton RightButton active" v-else>
      <div class="NewRenSn">
        <router-link
          :to="
            '/subscription/' +
            this.subscription_id +
            '/bound/property-quotator-proportional'
          "
        >
          Property Quotator
        </router-link>
      </div>
    </div>

    <CloseAccount />
  </div>
</template>
<script>
import CloseAccount from "@/components/subscription/CloseAccount.vue";
import { getCurrentPathName } from "@/mixins/subscription.js";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TypeBound",
  mixins: [getCurrentPathName],
  data() {
    return {
      type: null,
      isLoading: true,
    };
  },
  methods: {
    ...mapActions(["getCatalogByName"]),
    async loadData() {
      try {
        await this.getCatalogByName({ name: "risk_type" });
      } catch (error) {
        console.error("Error loading catalog:", error);
      }
    },
  },
  async mounted() {
    try {
      await this.loadData();
    } finally {
      this.isLoading = false;
    }
  },
  components: {
    CloseAccount,
  },
  computed: {
    ...mapGetters([
      "subscription_id",
      "accountInformation",
      "risk_type",
      "subscription",
    ]),
    selectedRisk() {
      if (
        this.accountInformation.typeOfRisk &&
        this.risk_type &&
        this.risk_type.length > 0
      ) {
        const typeObj = this.risk_type.find(
          (v) => v.id === this.accountInformation.typeOfRisk
        );
        return typeObj || {};
      }
      return {};
    },
    selectedRiskKey() {
      return this.selectedRisk.key || "";
    },
    propEng() {
      const valid = ["PRO", "CPE", "CECR"];
      return valid.includes(this.selectedRiskKey);
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/Accounts/NewRenewal.less";
@media (max-width: 740px) {
  .NewRenewalComponent {
    height: 80px;
    align-content: flex-end;
    align-items: flex-end;
    justify-content: flex-start !important;
  }
}
.NewRenewalTextContent {
  width: 380px !important;
}
</style>
