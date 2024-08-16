<template>
  <div
    v-if="subscription_id"
    class="StepperHeadComponent d-flex justify-center align-center mt-1"
  >
    <!--PASOS SIGUIENTES-->
    <button
      class="StepContent d-flex justify-center align-center"
      :class="step1"
      @click="changueView(2)"
    >
      <!--NUMERO DEL PASO-->
      <div class="StepNumber d-flex justify-center align-center">1</div>
      <!--NOMBRE DEL PASO-->
      <div class="StepText ml-2">Submission</div>
    </button>

    <button
      class="StepContent d-flex justify-center align-center ml-10 mr-10"
      :class="step2"
      @click="changueView(6)"
    >
      <!--NUMERO DEL PASO-->
      <div class="StepNumber d-flex justify-center align-center">2</div>

      <!--NOMBRE DEL PASO-->
      <div class="StepText ml-2">Authorized</div>
    </button>

    <button
      class="StepContent d-flex justify-center align-center"
      :class="step3"
      @click="changueView(7)"
    >
      <!--NUMERO DEL PASO-->
      <div class="StepNumber d-flex justify-center align-center">3</div>

      <!--NOMBRE DEL PASO-->
      <div class="StepText ml-2">Bound</div>
    </button>
  </div>
  <div
    v-else
    class="StepperHeadComponent d-flex justify-center align-center mt-1"
  >
    <!--PASOS SIGUIENTES-->
    <button
      class="StepContent d-flex justify-center align-center"
      :class="step1"
      @click="changueView(1)"
    >
      <!--NUMERO DEL PASO-->
      <div class="StepNumber d-flex justify-center align-center">1</div>
      <!--NOMBRE DEL PASO-->
      <div class="StepText ml-2">Submission</div>
    </button>

    <button
      class="StepContent d-flex justify-center align-center ml-10 mr-10"
      :class="step2"
      @click="changueView(3)"
    >
      <!--NUMERO DEL PASO-->
      <div class="StepNumber d-flex justify-center align-center">2</div>

      <!--NOMBRE DEL PASO-->
      <div class="StepText ml-2">Authorized</div>
    </button>

    <button
      class="StepContent d-flex justify-center align-center"
      :class="step3"
      @click="changueView(5)"
    >
      <!--NUMERO DEL PASO-->
      <div class="StepNumber d-flex justify-center align-center">3</div>

      <!--NOMBRE DEL PASO-->
      <div class="StepText ml-2">Bound</div>
    </button>
  </div>
</template>
<script>
import { stepper } from "@/mixins/subscription.js";
import { mapGetters, mapActions } from "vuex";
import SubscriptionService from "@/modules/home/services/subscription.service";

export default {
  mixins: [stepper],
  name: "stepperSubscription",

  data() {
    return {
      underwritersTable: [],
      showBoundButton: false,
      quotationType: 1,
    };
  },

  async beforeMount() {
    if (!this.$route.params.subscriptionId) {
      this.underwritersTable = [];
      this.showBoundButton = false;
      return;
    }
    this.showBoundButton = this.facultativeReference !== null ? true : false;
    this.quotationType =
      await SubscriptionService.getTypeQuotationBySubscription(
        this.$route.params.subscriptionId
      );
    try {
      this.underwritersTable = await this.getNotificationsFourEyeSuscriptor(
        this.$route.params.subscriptionId
      );
    } catch (error) {
      this.underwritersTable = [];
    }
  },
  watch: {
    facultativeReference: function () {
      this.showBoundButton = this.facultativeReference !== null ? true : false;
    },
  },
  computed: {
    ...mapGetters([
      "subscription_id",
      "subscription_type",
      "boundEngCatDeductibles",
      "accountInformation",
      "boundSublimesProp",
      "risk_type",
      "quotation",
      "facultativeReference",
      "quotation",
    ]),
    selectedRisk: {
      get() {
        if (
          this.accountInformation.typeOfRisk &&
          this.risk_type &&
          this.risk_type.length > 0
        ) {
          const typeObj = this.risk_type.find(
            (v) => v.id === this.accountInformation.typeOfRisk
          );
          return typeObj;
        }
        return 0;
      },
    },
    selectedRiskKey() {
      return this.selectedRisk.key || "";
    },
    propEng() {
      const valid = ["PRO", "CPE", "CECR"];
      if (valid.includes(this.selectedRiskKey)) return true;
      return false;
    },
  },
  methods: {
    ...mapActions(["getNotificationsFourEyeSuscriptor"]),
    changueView(path) {
      var paths = [
        "/underwriting/submission",
        "/underwriting/" + this.subscription_id + "/submission",
        "/subscription/quotation/proportional",
        "/subscription/quotation/non-proportional",
        "/subscription/bound",
        "/subscription/" + this.subscription_id + "/quotation/proportional",
        "/subscription/" + this.subscription_id + "/bound",
        "/subscription/" +
          this.subscription_id +
          "/bound/property-quotator-proportional",
        "/subscription/" +
          this.subscription_id +
          "/bound/property-quotator-non-proportional",
        "/subscription/" + this.subscription_id + "/quotation/non-proportional",
      ];
      const validaRejected = this.underwritersTable.find(
        (e) => e.status === "ACCEPTED"
      );
      const isNotBound = !(!validaRejected === false || this.showBoundButton);

      //TODO: Agregar un switch para controlar los casos
      if (
        (this.subscription_type === "RENEWAL" && path === 7) ||
        (isNotBound && path === 7)
      )
        return;
      if (!this.subscription_id && (path === 2 || path === 6 || path === 7)) {
        return;
      }
      if (this.$route.path != paths[path - 1]) {
        if (path == 3 && this.$route.path != paths[0]) {
          if (this.quotationType === 1) {
            this.$router.push(paths[path - 1]);
          } else {
            this.$router.push(paths[path]);
          }
        }

        if (path == 1 || path == 2) {
          this.$router.push(paths[path - 1]);
        }

        if (path === 6) {
          if (this.quotationType === 1) this.$router.push(paths[path - 1]);
          else this.$router.push(paths[9]);
        }

        if (path == 7) {
          if (this.propEng) {
            if (
              this.$route.path !=
              "/underwriting/" + this.subscription_id + "/submission"
            ) {
              this.quotation.typeQuotation == 1
                ? this.$router.push(paths[path])
                : this.$router.push(paths[path + 1]);
            }
          } else {
            this.$router.push(paths[path - 1]);
          }
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/Subscription/Stepper.less";
</style>
