<template>
  <v-expansion-panels class="SubExpansionComponent mt-5">
    <v-expansion-panel :loading="loadingPanel" @change="deepDisabled">
      <v-expansion-panel-header
        @click="changeSubExpansion"
        class="ExpansionTitle d-flex justify-start"
        expand-icon=""
      >
        <template v-slot:actions>
          <div class="subIconCont d-flex justify-start align-center">
            <v-icon class="iconExpand mr-1">
              {{ iconSubExpansion }}
            </v-icon>
            <div class="SubExpansionTitle">Risk &amp; Cedent Information</div>
          </div>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent">
          <div class="inputCont">
            <v-text-field
              label="Insured"
              v-model.trim="$v.accountInformation.submissionInsuredName.$model"
              disabled
            />
          </div>
          <div class="inputCont">
            <v-select
              v-model.trim="
                $v.accountInformation.submissionCatalogCountryId.$model
              "
              label="Country"
              :items="countries"
              item-text="description"
              item-value="id"
              disabled
            ></v-select>
          </div>

          <!-- <div class="inputCont">
            <v-select
              v-model.trim="
                $v.accountInformation.boundNonPropRiskCedentInfoCedentCompany
                  .$model
              "
              label="Cedent Company"
              :items="operatingEng"
              item-text="cedingCompany"
              item-value="id"
              clearable
              :disabled="operatingEng.length === 0"
              @blur="
                saveField(
                  'cedent_company',
                  $v.accountInformation.boundNonPropRiskCedentInfoCedentCompany
                    .$model
                );
                saveField(
                  'operating_country',
                  $v.accountInformation.boundNonPropRiskCedentInfoCedentCompany
                    .$model
                );
              "
            ></v-select>
          </div>
          <div class="inputCont">
            <v-select
              v-model.trim="
                $v.accountInformation.boundNonPropRiskCedentInfoCedentCompany
                  .$model
              "
              @blur="
                saveField(
                  'operating_country',
                  $v.accountInformation.boundNonPropRiskCedentInfoCedentCompany
                    .$model
                )
              "
              label="Operating Country"
              :items="operatingEng"
              item-text="country"
              item-value="id"
              clearable
              :disabled="operatingEng.length === 0"
              readonly
            ></v-select>
          </div> -->
          <div class="inputCont">
            <v-select
              v-model.trim="accountInformation.submissionBroker"
              label="Broker"
              :items="availableBrokers"
              item-text="name"
              item-value="id"
              hint="Select a Broker"
              clearable
              disabled
            ></v-select>
          </div>

          <div class="inputCont">
            <v-text-field label="Term" v-model="term" disabled />
          </div>
          <div class="inputCont">
            <v-select
              v-model.trim="accountInformation.submissionCatalogActivityId"
              label="Activity"
              :items="filteredActivities"
              disabled
              item-text="description"
              item-value="id"
              return-object
            ></v-select>
          </div>
          <div class="inputCont">
            <v-select
              label="Original Currency"
              v-model="accountInformation.submissionCatalogCurrencyId"
              :items="currencies"
              item-text="key"
              item-value="id"
              :hint="`${currentCurrency.region}, ${currentCurrency.description}`"
              :loading="loadingCurrencies"
              persistent-hint
              disabled
            />
          </div>
          <div class="inputCont">
            <v-text-field
              label="Exchange Rate"
              v-model="accountInformation.quotationExchangeRate"
              disabled
            />
          </div>
          <div class="inputCont">
            <v-text-field
              label="Leader"
              v-model="
                $v.accountInformation.boundNonPropRiskCedentInfoLeader.$model
              "
              @blur="
                saveField(
                  'leader',
                  $v.accountInformation.boundNonPropRiskCedentInfoLeader.$model
                )
              "
            />
          </div>
        </div>
        <div class="ExpandContent mt-10 mb-6">
          <h4 class="font-weight-medium">Cedent Information</h4>
        </div>
        <div class="ExpandContent">
          <div class="inputCont">
            <v-select
              v-model.trim="accountInformation.submissionCedent"
              label="Name"
              :items="availableCedents"
              item-text="name"
              item-value="id"
              hint="Select Cedent"
              disabled
            ></v-select>
          </div>
          <div class="inputCont">
            <v-select
              v-model.trim="accountInformation.submissionCedent"
              label="Email"
              :items="availableCedents"
              item-text="email"
              item-value="id"
              hint="Select Cedent"
              :disabled="true"
            ></v-select>
          </div>
          <div class="inputCont">
            <v-select
              v-model.trim="accountInformation.submissionCedent"
              label="Contact Number"
              :items="availableCedents"
              item-text="phone"
              item-value="id"
              hint="Select Cedent"
              :disabled="true"
            ></v-select>
          </div>
          <div class="inputCont">
            <v-select
              v-model.trim="accountInformation.submissionCedent"
              label="Address"
              :items="availableCedents"
              item-text="address"
              item-value="id"
              hint="Select Cedent"
              :disabled="true"
            ></v-select>
          </div>
          <div class="inputCont HideOnMovil" />
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { stateExpansiveManager } from "@/mixins/subscription.js";
import { required, requiredIf } from "vuelidate/lib/validators";
import { formValidations } from "@/mixins/formValidations";
/* services */
import {
  getRiskCedentInformation,
  saveRiskCedentInformation,
} from "./services/risk-cedent-information.service";

import Decimal from "decimal.js";

export default {
  name: "RiskInformation",
  mixins: [stateExpansiveManager, formValidations],
  inject: ["deepDisabled"],
  data() {
    return {
      activityDisabled: true,
      loadingPanel: false,
      loadingCurrencies: false,
      subscriptionId: false,
      riskCedentInformation: {},
      formatter: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }),
    };
  },
  computed: {
    ...mapGetters([
      "countries",
      "currencies",
      "risk_type",
      "quotation",
      "availableBrokers",
      "availableCedents",
      "activities",
      "activitiesById",
      "operatingEng",
      "accountInformation",
    ]),
    accountInformation: {
      set(value) {
        this.riskCedentInformation = value;
      },
      get() {
        return this.riskCedentInformation;
      },
    },
    term: {
      get() {
        const div = 30;

        const inceptionDate = new Date(
          this.accountInformation.quotationInceptionDate || 0
        );
        const expiryDate = new Date(
          this.accountInformation.quotationExpiryDate || 0
        );
        const dateSubs =
          (expiryDate.getTime() - inceptionDate.getTime()) /
          (1000 * 60 * 60 * 24);

        const result = Decimal.div(dateSubs, div);
        return this.formatter.format(result);
      },
    },
    filteredActivities() {
      const id = this.accountInformation?.submissionCatalogTypeRiskId;
      if (typeof id === "number") {
        this.enableActivities();
        return this.activitiesById(id);
      }
      return [];
    },
    currentCurrency() {
      /** @type {Array} */
      const currency = this.currencies || [];
      const item = currency.find(
        (v) => v.id === this.accountInformation.submissionCatalogCurrencyId
      );
      if (!item)
        return {
          region: "Region",
          description: "Description",
        };
      return item;
    },
  },
  beforeMount() {
    let fecha1 = new Date(this.quotation.inceptionDate);
    let fecha2 = new Date(this.quotation.expiryDate);
    this.quotation.term = new Decimal(
      Math.round(
        (fecha2.getTime() - fecha1.getTime()) / (1000 * 60 * 60 * 24)
      ) / 30
    ).toDP(3);
    //this.quotation.term = this.quotation.term.toDP(3);
  },
  methods: {
    ...mapActions(["saveBoundColumn", "getCatalogByName"]),
    ...mapMutations(["SET_BOUND_ENG"]),
    enableActivities() {
      this.activityDisabled = false;
    },
    async saveField(column, value) {
      if (this.subscriptionId)
        await saveRiskCedentInformation(this.subscriptionId, column, value);
    },
  },
  validations: {
    accountInformation: {
      submissionInsuredName: { required },
      submissionCatalogCountryId: { required },
      submissionCatalogActivityId: {
        required: requiredIf(({ typeOfRisk: { key } }) => key != "CPE"),
      },
      submissionBroker: {
        required: requiredIf(function () {
          return !this.isOptional;
        }),
      },
      boundNonPropRiskCedentInfoCedentCompany: { required },
      boundNonPropRiskCedentInfoOperatingCountry: { required },
      boundNonPropRiskCedentInfoLeader: { required },
    },
  },
  async mounted() {
    /* set loadings (data) */
    const lpa = "loadingPanel";
    const lcu = "loadingCurrencies";
    /* loaders to true */
    this[lpa] = !this[lpa];
    this[lcu] = !this[lcu];
    /* obtención de catálogos */
    await this.getCatalogByName({ name: "currencies" });

    this.subscriptionId = this.$route.params?.subscriptionId;
    if (this.subscriptionId) {
      this.accountInformation = await getRiskCedentInformation(
        this.subscriptionId
      );
      if (!this.$v.accountInformation.boundNonPropRiskCedentInfoLeader.$model) {
        this.saveField(this.subscriptionId, "leader", "Unknown");
      }
    }

    /* loaders to false */
    this[lcu] = false;
    this[lpa] = false;
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";
.ExpandContent {
  @media (max-width: 650px) {
    width: calc(100% + 24px) !important;
  }
}
</style>
