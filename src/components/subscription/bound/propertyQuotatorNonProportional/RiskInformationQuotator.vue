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
              v-model.trim="$v.accountInformation.insuredName.$model"
              @input="$v.accountInformation.insuredName.$touch()"
              @blur="$v.accountInformation.insuredName.$touch()"
              required
              :error-messages="
                requiredInputVuelidateParent(
                  'insuredName',
                  'accountInformation'
                )
              "
              disabled
            />
          </div>
          <div class="inputCont">
            <v-select
              v-model.trim="$v.accountInformation.country.$model"
              @input="$v.accountInformation.country.$touch()"
              @blur="$v.accountInformation.country.$touch()"
              required
              :error-messages="
                requiredInputVuelidateParent('country', 'accountInformation')
              "
              label="Country"
              :items="countries"
              item-text="description"
              item-value="id"
              return-object
              disabled
            ></v-select>
          </div>
          <!-- <div class="inputCont">
            <v-select
              v-model.trim="$v.boundEng.cedentCompany.$model"
              label="Operating Country"
              :items="operatingEng"
              item-text="country"
              item-value="id"
              clearable
              :disabled="operatingEng.length === 0"
              readonly
            ></v-select>
          </div>
          <div class="inputCont">
            <v-select
              v-model.trim="$v.boundEng.cedentCompany.$model"
              label="Cedent Company"
              :items="operatingEng"
              item-text="cedingCompany"
              item-value="id"
              clearable
              :disabled="operatingEng.length === 0"
              @blur="
                SET_BOUND_ENG('cedentCompany', this);
                checkField('cedentCompany');
              "
            ></v-select>
          </div> -->
          <div class="inputCont">
            <v-select
              v-model.trim="accountInformation.broker"
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
            <v-select
              v-model.trim="accountInformation.activity"
              label="Activity"
              :items="filteredActivities"
              disabled
              item-text="description"
              item-value="id"
              return-object
            ></v-select>
          </div>
          <div class="inputCont">
            <v-text-field
              label="Leader"
              v-model="$v.boundEng.leader.$model"
              @blur="
                SET_BOUND_ENG('leader', this);
                checkField('leader');
              "
            />
          </div>
          <div class="inputCont">
            <v-select
              label="Original Currency"
              v-model="accountInformation.currency"
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
              label="Rate of Exchange"
              v-model="quotation.exchangeRate"
              disabled
            />
          </div>
          <div class="inputCont" />
        </div>
        <div class="ExpandContent mt-10 mb-6">
          <h4 class="font-weight-medium">Cedent Information</h4>
        </div>
        <div class="ExpandContent">
          <div class="inputCont">
            <v-select
              v-model.trim="accountInformation.cedent"
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
              v-model.trim="accountInformation.cedent"
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
              v-model.trim="accountInformation.cedent"
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
              v-model.trim="accountInformation.cedent"
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
import { required, requiredIf, minLength } from "vuelidate/lib/validators";
import { formValidations } from "@/mixins/formValidations";
import Decimal from "decimal.js";
export default {
  name: "RiskInformationQuotator",
  mixins: [stateExpansiveManager, formValidations],
  inject: ["deepDisabled"],
  data() {
    return {
      activityDisabled: true,
      loadingPanel: false,
      loadingCurrencies: false,
    };
  },
  computed: {
    ...mapGetters([
      "countries",
      "currencies",
      "risk_type",
      "accountInformation",
      "quotation",
      "availableBrokers",
      "availableCedents",
      "activities",
      "activitiesById",
      "operatingEng",
      "boundEng",
    ]),
    filteredActivities() {
      const id =
        this.accountInformation.typeOfRisk.id ||
        this.accountInformation.typeOfRisk;
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
        (v) => v.id === this.accountInformation.currency
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
  async mounted() {
    /* set loadings (data) */
    const lpa = "loadingPanel";
    const lcu = "loadingCurrencies";
    /* loaders to true */
    this[lpa] = !this[lpa];
    this[lcu] = !this[lcu];
    /* obtención de catálogos */
    await this.getCatalogByName({ name: "currencies" });
    /* loaders to false */
    this[lcu] = false;
    this[lpa] = false;
  },
  methods: {
    ...mapActions(["saveBoundColumn", "getCatalogByName"]),
    ...mapMutations(["SET_BOUND_ENG"]),
    enableActivities() {
      this.activityDisabled = false;
    },
    async checkField(column) {
      this.$v.boundEng[column].$touch();
      /*console.log(
        this.$v.boundEng[column].$invalid,
        this.$v.boundEng[column].$error,
        this.$v.boundEng[column].$model,
        column
      );*/
      if (this.$v.boundEng[column].$invalid || this.$v.boundEng[column].$error)
        return;
      await this.saveBoundColumn({
        table: "bound",
        parent: "boundEng",
        column,
      });
    },
  },
  validations: {
    accountInformation: {
      insuredName: { required },
      country: { required },
      activity: {
        required: requiredIf(({ typeOfRisk: { key } }) => key != "CPE"),
      },
      broker: {
        required: requiredIf(function () {
          return !this.isOptional;
        }),
      },
    },
    boundEng: {
      cedentCompany: { required },
      leader: { required },
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";
</style>
