<template>
  <div>
    <hr class="line" />
    <NewContractDetails v-if="findRegister.contractType === 1" :detailsNewContract="detailsNewContract" :restrictionsNewContract="restrictionsNewContract" :brokerNewContract="brokerNewContract" :partherNewContract="partherNewContract" />
    <NewReinsurandeDicDetails v-if="findRegister.contractType === 2" :detailsNewReinsurandeDic="detailsNewReinsurandeDic" :brokerNewReinsurandeDic="brokerNewReinsurandeDic" :restrictionsNewReinsurandeDic="restrictionsNewReinsurandeDic" />
    <NewDirectReInsuranceDetails
      v-if="findRegister.contractType === 3"
      :detailsNewDirectReInsuranceDetails="detailsNewDirectReInsurance"
      :brokerNewDirectReInsurance="brokerNewDirectReInsurance"
      :restrictionsNewDirectReInsurance="restrictionsNewDirectReInsurance"
    />
  </div>
</template>
<script>
import NewContractDetails from "./details/NewContractDetails.vue";
import NewReinsurandeDicDetails from "./details/NewReinsurandeDicDetails.vue";
import NewDirectReInsuranceDetails from "./details/NewDirectReInsuranceDetails.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "DetailsReinsurer",
  components: {
    NewContractDetails,
    NewReinsurandeDicDetails,
    NewDirectReInsuranceDetails,
  },
  data() {
    return {
      // Pantalla 1 New Contract
      partherNewContract: [],
      brokerNewContract: [],
      restrictionsNewContract: [],
      detailsNewContract: {
        nameContract: "",
        inceptionDate: "",
        expiryDate: "",
        brokerContract: "",
        comissionBroker: "",
        comissionSlu: "",
        percentageAmountToReinsurance: "",
        nameReinsurance: "",
        nameReinsurancePercentage: "",
        partherRe: "",
        partherRePercentage: "",
        total: "",
        maximumLimitIncludingBi: "",
        maximumLimitWithoutBi: "",
        deductions: "",
        maximumLine: "",
      },
      // Pantalla 2 New Direct Re-Insurance
      brokerNewReinsurandeDic: [],
      restrictionsNewReinsurandeDic: [],
      detailsNewDirectReInsurance: {
        reInsuranceNameNewDirectReInsurance: "",
        inceptionDateNewDirectReInsurance: "",
        expiryDateNewDirectReInsurance: "",
        reInsuranceBrokerNewDirectReInsurance: "",
        comissionBrokerNewDirectReInsurance: "",
        retrocession: "",
        companyNewDirectReInsurance: "",
        comissionNewDirectReInsurance: "",
        comissionSluNewDirectReInsurance: "",
        percenntageAmountReInsurance: "",
        maximumLimitIncludingBiNewDirectReInsurance: "",
        maximumLimitWithoutBiNewDirectReInsurance: "",
        deductionsNewDirectReInsurance: "",
        operateAs: "",
        maximumLineNewDirectReInsurance: "",
        frontingSpecialConditions: "",
        frontingAgreedWithTheReinsurer: "",
        applies: "",
      },
      // Pantalla 3 New re-insurance DIC
      brokerNewDirectReInsurance: [],
      restrictionsNewDirectReInsurance: [],
      detailsNewReinsurandeDic: {
        reInsuranceName: "",
        inceptionDateNewReInsuranceDic: "",
        expiryDateNewReInsuranceDic: "",
        reInsuranceBroker: "",
        comissionBrokerNewReInsuranceDic: "",
        comissionSluNewReInsuranceDic: "",
        evergladesRe1Dic: "",
        evergladesRe2Dic: "",
        associated: "",
        maximumLimitIncludingBiNewReInsuranceDic: "",
        maximumLimitWithoutBiNewReInsuranceDic: "",
        deductionsNewReInsuranceDic: "",
        maximumLineNewReInsuranceDic: "",
      },
      idCard: this.$route.params.id,
      findRegister: {},
    };
  },
  computed: {
    ...mapState({
      list: (state) => state.reinsurers,
      reinsurersItem: (state) => state.reinsurersItem,
    }),
  },
  methods: {
    ...mapActions(["getAllReinsurers", "getReinsurersById"]),
  },
  async beforeMount() {
    await this.getReinsurersById(this.idCard);
    this.findRegister = await this.reinsurersItem;

    if (this.findRegister !== undefined && this.findRegister.contractType === 1) {
      this.partherNewContract = [...this.findRegister.parther];
      this.brokerNewContract = [...this.findRegister.broker];
      this.restrictionsNewContract = [...this.findRegister.restriction];
      this.detailsNewContract = {
        nameContract: this.findRegister.name,
        inceptionDate: this.findRegister.inceptionDate,
        expiryDate: this.findRegister.expiryDate,
        comissionSlu: this.findRegister.comissionSlu,
        percentageAmountToReinsurance: this.findRegister.newContract[0].amountToReinsurance,
        nameReinsurance: this.findRegister.newContract[0].allianz,
        nameReinsurancePercentage: `${this.findRegister.newContract[0].allianzPercentage}%`,
        total: "100%",
        maximumLimitIncludingBi: this.findRegister.maximumWith,
        maximumLimitWithoutBi: this.findRegister.maximumWithout,
        deductions: this.findRegister.deductions,
        maximumLine: this.findRegister.newContract[0].maximumLine,
      };
    } else if (this.findRegister !== undefined && this.findRegister.contractType === 2) {
      this.brokerNewReinsurandeDic = [...this.findRegister.broker];
      this.restrictionsNewReinsurandeDic = [...this.findRegister.restriction];
      this.detailsNewReinsurandeDic = {
        reInsuranceName: this.findRegister.name,
        inceptionDateNewReInsuranceDic: this.findRegister.inceptionDate,
        expiryDateNewReInsuranceDic: this.findRegister.expiryDate,
        reInsuranceBroker: this.findRegister.broker[0].broker,
        comissionBrokerNewReInsuranceDic: this.findRegister.broker[0].brokerComission,
        comissionSluNewReInsuranceDic: this.findRegister.comissionSlu,
        evergladesRe1Dic: this.findRegister.dic[0].everglades1,
        evergladesRe2Dic: this.findRegister.dic[0].everglades2,
        associated: this.findRegister.dic[0].associatedTo,
        maximumLimitIncludingBiNewReInsuranceDic: this.findRegister.maximumWith,
        maximumLimitWithoutBiNewReInsuranceDic: this.findRegister.maximumWithout,
        deductionsNewReInsuranceDic: this.findRegister.deductions,
        maximumLineNewReInsuranceDic: this.findRegister.dic[0].maximumLine,
      };
    } else if (this.findRegister !== undefined && this.findRegister.contractType === 3) {
      this.brokerNewDirectReInsurance = [...this.findRegister.broker];
      this.restrictionsNewDirectReInsurance = [...this.findRegister.restriction];
      this.detailsNewDirectReInsurance = {
        reInsuranceNameNewDirectReInsurance: this.findRegister.name,
        inceptionDateNewDirectReInsurance: this.findRegister.inceptionDate,
        expiryDateNewDirectReInsurance: this.findRegister.expiryDate,
        reInsuranceBrokerNewDirectReInsurance: this.findRegister.broker[0].broker,
        comissionBrokerNewDirectReInsurance: this.findRegister.broker[0].brokerComission,
        retrocession: this.findRegister.directRe[0].retrocession,
        companyNewDirectReInsurance: this.findRegister.directRe[0].company,
        comissionNewDirectReInsurance: this.findRegister.directRe[0].comission,
        comissionSluNewDirectReInsurance: this.findRegister.comissionSlu,
        percenntageAmountReInsurance: this.findRegister.directRe[0].amountToReinsurance,
        maximumLimitIncludingBiNewDirectReInsurance: this.findRegister.maximumWith,
        maximumLimitWithoutBiNewDirectReInsurance: this.findRegister.maximumWithout,
        deductionsNewDirectReInsurance: this.findRegister.deductions,
        operateAs: this.findRegister.directRe[0].operateAs,
        maximumLineNewDirectReInsurance: this.findRegister.directRe[0].maximumLineDeduction,
        frontingSpecialConditions: this.findRegister.directRe[0].frontingSpecialCondition,
        frontingAgreedWithTheReinsurer: this.findRegister.directRe[0].frontingAgreed,
        applies: this.findRegister.directRe[0].applies,
      };
    }
  },
};
</script>
<style lang="less" scoped>
.line {
  width: 100%;
  height: 1px;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border: none;
  background-color: #a8bfd9;
}
</style>
