<template>
  <div class="Cont d-flex justify-start align-center flex-wrap align-content-center">
    <!--TITULO-->
    <div class="TitleCont">
      <h5>Non CAT Rate</h5>
    </div>

    <div class="Table d-flex justify-end align-content-start flex-wrap">
      <!--CABECERA DE INPUTS-->
      <div class="LineInputs">
        <div class="InputLarge Flex Bold">Activity</div>
        <div class="Input Flex Bold">Category</div>
        <div class="Input Flex Bold">Rate</div>
      </div>

      <!--LINEA DE INPUTS-->
      <div class="LineInputs">
        <div class="InputLarge">
          <v-select v-model.trim="accountInformation.activity" label="Activity" :items="activities" item-text="description" item-value="id" return-object disabled></v-select>
        </div>
        <div class="Input">
          <v-select v-model.trim="accountInformation.activity" label="Category" :items="activities" item-text="category" item-value="id" return-object disabled></v-select>
        </div>
        <div class="Input">
          <v-text-field label="Rate" type="number" v-model.trim="rateContractor"> </v-text-field>
        </div>
      </div>

      <!--LISTA-->
      <div class="List">
        <!--SIZE PROJECT-->
        <div class="Row">
          <div class="Label">Size proyect credit</div>

          <div class=""></div>

          <div class="Input">
            <v-text-field type="text  " readonly v-model="sizeCredit" />
          </div>
        </div>

        <!--TIME-->
        <div class="Row">
          <div class="Label">Time</div>

          <div class=""></div>

          <div class="Input">
            <v-text-field v-model="time" readonly type="number"> </v-text-field>
          </div>
        </div>

        <!--TYPE OF CONSTRUCTION-->
        <div class="Row">
          <div class="Label">Type Of Construction / Combustibility</div>

          <div class="InputLarge">
            <v-select
              v-model.trim="$v.nonCatLarge.typeConstructorSelect.$model"
              @input="$v.nonCatLarge.typeConstructorSelect.$touch()"
              @blur="
                SET_NONCATLARGE('typeConstructorSelect', this);
                checkField('typeConstructorSelect');
              "
              :items="typeofconstruction"
              item-text="typeConstruction"
              item-value="id"
              @change="nonCatLarge.ratetypeConstructor = typeofconstruction.find((v) => v.id === nonCatLarge.typeConstructorSelect).rate"
            >
            </v-select>
          </div>

          <div class="Input">
            <v-text-field
              type="number"
              v-model.trim="$v.nonCatLarge.ratetypeConstructor.$model"
              @input="$v.nonCatLarge.ratetypeConstructor.$touch()"
              @blur="
                SET_NONCATLARGE('ratetypeConstructor', this);
                checkField('ratetypeConstructor');
              "
            >
            </v-text-field>
          </div>
        </div>

        <!--MAINTENANCE-->
        <div class="Row">
          <div class="Label">Maintenance (D)</div>

          <div class="InputLarge">
            <v-select
              v-model.trim="$v.nonCatLarge.maintenancePeriodSelect.$model"
              @input="$v.nonCatLarge.maintenancePeriodSelect.$touch()"
              @blur="
                $v.nonCatLarge.maintenancePeriodSelect.$touch();
                SET_NONCATLARGE('maintenancePeriodSelect', this);
                checkField('maintenancePeriodSelect');
              "
              :items="maintenancePeriod"
              item-text="data"
              item-value="id"
              @change="nonCatLarge.ratemaintenancePeriod = maintenancePeriod.find((v) => v.id === nonCatLarge.maintenancePeriodSelect).rate"
            >
            </v-select>
          </div>
          {{ nonCatLarge.rateMaintenancePeriod }}
          <div class="Input">
            <v-text-field
              type="number"
              v-model.trim="$v.nonCatLarge.ratemaintenancePeriod.$model"
              @input="$v.nonCatLarge.ratemaintenancePeriod.$touch()"
              @blur="
                SET_NONCATLARGE('ratemaintenancePeriod', this);
                checkField('ratemaintenancePeriod');
              "
            >
            </v-text-field>
          </div>
        </div>

        <!--Third party liability-->
        <div class="Row">
          <div class="Label">Third party liability (E & F) (D)</div>
          <div class="InputLarge">
            <v-select
              v-model.trim="$v.nonCatLarge.thirdPartyLiabilitySelect.$model"
              @input="$v.nonCatLarge.thirdPartyLiabilitySelect.$touch()"
              @blur="
                SET_NONCATLARGE('thirdPartyLiabilitySelect', this);
                checkField('thirdPartyLiabilitySelect');
              "
              :items="thirdPartyLiability"
              item-text="data"
              item-value="id"
              @change="nonCatLarge.ratethirdPartyLiability = thirdPartyLiability.find((v) => v.id === nonCatLarge.thirdPartyLiabilitySelect).rate"
            >
            </v-select>
          </div>

          <div class="Input">
            <v-text-field
              type="number"
              v-model.trim="$v.nonCatLarge.ratethirdPartyLiability.$model"
              @input="$v.nonCatLarge.ratethirdPartyLiability.$touch()"
              @blur="
                SET_NONCATLARGE('ratethirdPartyLiability', this);
                checkField('ratethirdPartyLiability');
              "
            >
            </v-text-field>
          </div>
        </div>

        <!--First year of operation included-->
        <div class="Row">
          <div class="Label">First year of operation included</div>

          <div class="InputLarge">
            <v-select
              v-model.trim="$v.nonCatLarge.firstyearOpSelect.$model"
              @input="$v.nonCatLarge.firstyearOpSelect.$touch()"
              @blur="
                SET_NONCATLARGE('firstyearOpSelect', this);
                checkField('firstyearOpSelect');
              "
              :items="firstyearOp"
              item-text="data"
              item-value="id"
              @change="nonCatLarge.ratefirstyearOp = firstyearOp.find((v) => v.id === nonCatLarge.firstyearOpSelect).rate"
            >
            </v-select>
          </div>

          <div class="Input">
            <v-text-field
              type="number"
              v-model.trim="$v.nonCatLarge.ratefirstyearOp.$model"
              @input="$v.nonCatLarge.ratefirstyearOp.$touch()"
              @blur="
                SET_NONCATLARGE('ratefirstyearOp', this);
                checkField('ratefirstyearOp');
              "
            >
            </v-text-field>
          </div>
        </div>

        <!--Erection of machinery-->
        <div class="Row">
          <div class="Label">Erection of machinery</div>

          <div class="InputLarge">
            <v-select
              v-model.trim="$v.nonCatLarge.equipmentInstallationSelect.$model"
              @input="$v.nonCatLarge.equipmentInstallationSelect.$touch()"
              @blur="
                SET_NONCATLARGE('equipmentInstallationSelect', this);
                checkField('equipmentInstallationSelect');
              "
              :items="equipmentInstallation"
              item-text="data"
              item-value="id"
              @change="nonCatLarge.rateequipmentInstallation = equipmentInstallation.find((v) => v.id === nonCatLarge.equipmentInstallationSelect).rate"
            >
            </v-select>
          </div>

          <div class="Input">
            <v-text-field
              type="number"
              v-model.trim="$v.nonCatLarge.rateequipmentInstallation.$model"
              @input="$v.nonCatLarge.rateequipmentInstallation.$touch()"
              @blur="
                SET_NONCATLARGE('rateequipmentInstallation', this);
                checkField('rateequipmentInstallation');
              "
            >
            </v-text-field>
          </div>
        </div>

        <!--Testing and commissioning-->
        <div class="Row">
          <div class="Label">Testing and commissioning</div>

          <div class="InputLarge">
            <v-select
              v-model.trim="$v.nonCatLarge.testingSelect.$model"
              @input="$v.nonCatLarge.testingSelect.$touch()"
              @blur="
                SET_NONCATLARGE('testingSelect', this);
                checkField('testingSelect');
              "
              :items="testing"
              item-text="testing"
              item-value="id"
              @change="nonCatLarge.ratetesting = testing.find((v) => v.id === nonCatLarge.testingSelect).rate"
            >
            </v-select>
          </div>

          <div class="Input">
            <v-text-field
              type="number"
              v-model.trim="$v.nonCatLarge.ratetesting.$model"
              @input="$v.nonCatLarge.ratetesting.$touch()"
              @blur="
                SET_NONCATLARGE('ratetesting', this);
                checkField('ratetesting');
              "
            >
            </v-text-field>
          </div>
        </div>

        <!--Inland Transit-->
        <div class="Row">
          <div class="Label">Inland Transit</div>

          <div class="InputLarge">
            <v-select
              v-model.trim="$v.nonCatLarge.inlandTransitSelect.$model"
              @input="$v.nonCatLarge.inlandTransitSelect.$touch()"
              @blur="
                SET_NONCATLARGE('inlandTransitSelect', this);
                checkField('inlandTransitSelect');
              "
              :items="inlandTransit"
              item-text="data"
              item-value="id"
              @change="nonCatLarge.rateinlandTransit = inlandTransit.find((v) => v.id === nonCatLarge.inlandTransitSelect).rate"
            >
            </v-select>
          </div>

          <div class="Input">
            <v-text-field
              type="number"
              v-model.trim="$v.nonCatLarge.rateinlandTransit.$model"
              @input="$v.nonCatLarge.rateinlandTransit.$touch()"
              @blur="
                SET_NONCATLARGE('rateinlandTransit', this);
                checkField('rateinlandTransit');
              "
            >
            </v-text-field>
          </div>
        </div>

        <!--Errors in design-->
        <div class="Row">
          <div class="Label">Errors in design</div>

          <div class="InputLarge">
            <v-select
              v-model.trim="$v.nonCatLarge.errorsDesignSelect.$model"
              @input="$v.nonCatLarge.errorsDesignSelect.$touch()"
              @blur="
                SET_NONCATLARGE('errorsDesignSelect', this);
                checkField('errorsDesignSelect');
              "
              :items="errorsDesign"
              item-text="data"
              item-value="id"
              @change="nonCatLarge.rateerrorsDesign = errorsDesign.find((v) => v.id === nonCatLarge.errorsDesignSelect).rate"
            >
            </v-select>
          </div>

          <div class="Input">
            <v-text-field
              type="number"
              v-model.trim="$v.nonCatLarge.rateerrorsDesign.$model"
              @input="$v.nonCatLarge.rateerrorsDesign.$touch()"
              @blur="
                SET_NONCATLARGE('rateerrorsDesign', this);
                checkField('rateerrorsDesign');
              "
            >
            </v-text-field>
          </div>
        </div>

        <!--Sabotage and terrorism-->
        <div class="Row">
          <div class="Label">Sabotage and terrorism</div>

          <div class="InputLarge">
            <v-select
              v-model.trim="$v.nonCatLarge.srccSelect.$model"
              @input="$v.nonCatLarge.srccSelect.$touch()"
              @blur="
                SET_NONCATLARGE('srccSelect', this);
                checkField('srccSelect');
              "
              :items="SRCC"
              item-text="data"
              item-value="id"
              @change="nonCatLarge.rateSrcc = SRCC.find((v) => v.id === nonCatLarge.srccSelect).rate"
            >
            </v-select>
          </div>

          <div class="Input">
            <v-text-field
              type="number"
              v-model.trim="$v.nonCatLarge.rateSrcc.$model"
              @input="$v.nonCatLarge.rateSrcc.$touch()"
              @blur="
                SET_NONCATLARGE('rateSrcc', this);
                checkField('rateSrcc');
              "
            >
            </v-text-field>
          </div>
        </div>

        <!--Monthly rate (%)-->
        <div class="Row">
          <div class="Label">Monthly rate (%)</div>

          <div class="Input">
            <v-text-field v-model="nonCatLarge.rateContractor" type="number" disabled />
          </div>

          <div class="InputLarge" />
        </div>

        <!--Monthly rate after adjustments (%)-->
        <div class="Row">
          <div class="Label">Monthly rate after adjustments (%)</div>

          <div class="Input">
            <v-text-field v-model="sumMonthlyRate" disabled> </v-text-field>
          </div>

          <div class="InputLarge" />
        </div>

        <!--Project gross rate for the period (%)-->
        <div class="Row Large">
          <div class="Label" />

          <div class="MiniInput" />

          <div class="MiniInput">
            Credit / <br />
            Surcharge
          </div>

          <div class="MiniLargeInput">Reason</div>

          <div class="MiniInput">Final Rate</div>
        </div>
        <div class="Row">
          <div class="Label">Project gross rate for the period (%)</div>

          <div class="MiniInput">
            <v-text-field v-model="proyectGross" disabled />
          </div>

          <div class="MiniInput">
            <v-text-field
              type="number"
              v-model.trim="$v.nonCatLarge.credit.$model"
              @input="$v.nonCatLarge.credit.$touch()"
              @blur="
                SET_NONCATLARGE('credit', this);
                checkField('credit');
              "
            />
          </div>

          <div class="MiniLargeInput">
            <v-select
              v-model.trim="$v.nonCatLarge.reasonsSelect.$model"
              @input="$v.nonCatLarge.reasonsSelect.$touch()"
              @blur="
                SET_NONCATLARGE('reasonsSelect', this);
                checkField('reasonsSelect');
              "
              :items="reasons"
              item-text="data"
              item-value="id"
            >
            </v-select>
          </div>

          <div class="MiniInput">
            <v-text-field v-model="finalRate" disabled />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
/* validations */
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { formValidations } from "@/mixins/formValidations";
/* lodash */
import { debounce } from "lodash";

import Decimal from "decimal.js";
import numeral from "numeral";

export default {
  name: "NonCatLarge",
  mixins: [validationMixin, formValidations],
  data() {
    return {
      contractorSelect: null,
      // rateContractor: null,
      typeConstructorSelect: null,
      ratetypeConstructor: null,
      testingSelect: null,
      ratetesting: null,
      equipmentInstallationSelect: null,
      rateequipmentInstallation: null,
      thirdPartyLiabilitySelect: null,
      ratethirdPartyLiability: null,
      firstyearOpSelect: null,
      ratefirstyearOp: null,
      maintenancePeriodSelect: null,
      rateMaintenancePeriod: null,
      inlandTransitSelect: null,
      rateinlandTransit: null,
      srccSelect: null,
      rateSrcc: null,
      errorsDesignSelect: null,
      rateErrorsDesign: null,
      reasonsSelect: null,
      rateSize: null,
      rateTime: null,
      credit: null,
      alopRate: null,
    };
  },
  async mounted() {
    await this.loadSectionRatesModal({ table: "catLarge" });
    await this.getCatalogByName({ name: "activities" });
  },

  computed: {
    ...mapGetters([
      "risk_type",
      "accountInformation",
      "activities",
      "deductions",
      "rate",
      "contractors",
      "monthlyRate",
      "typeofconstruction",
      "testing",
      "thirdPartyLiability",
      "SRCC",
      "firstyearOp",
      "inlandTransit",
      "ALOP",
      "errorsDesign",
      "equipmentInstallation",
      "maintenancePeriod",
      "reasons",
      "nonCatLarge",
      "sumDeductions",
      "quotation",
      "tarifarNonCatRate",
      "tiv",
    ]),
    sumMonthlyRate: {
      get() {
        this.nonCatLarge.ratetypeConstructor = this.nonCatLarge.typeConstructorSelect ? this.typeofconstruction.find((v) => v.id === this.nonCatLarge.typeConstructorSelect).rate : null;
        this.nonCatLarge.ratemaintenancePeriod = this.nonCatLarge.maintenancePeriodSelect ? this.maintenancePeriod.find((v) => v.id === this.nonCatLarge.maintenancePeriodSelect).rate : null;
        this.nonCatLarge.ratethirdPartyLiability = this.nonCatLarge.thirdPartyLiabilitySelect ? this.thirdPartyLiability.find((v) => v.id === this.nonCatLarge.thirdPartyLiabilitySelect).rate : null;
        this.nonCatLarge.ratefirstyearOp = this.nonCatLarge.firstyearOpSelect ? this.firstyearOp.find((v) => v.id === this.nonCatLarge.firstyearOpSelect).rate : null;
        this.nonCatLarge.rateequipmentInstallation = this.nonCatLarge.equipmentInstallationSelect ? this.equipmentInstallation.find((v) => v.id === this.nonCatLarge.equipmentInstallationSelect).rate : null;
        this.nonCatLarge.ratetesting = this.nonCatLarge.testingSelect ? this.testing.find((v) => v.id === this.nonCatLarge.testingSelect).rate : null;
        this.nonCatLarge.rateinlandTransit = this.nonCatLarge.inlandTransitSelect ? this.inlandTransit.find((v) => v.id === this.nonCatLarge.inlandTransitSelect).rate : null;
        this.nonCatLarge.rateerrorsDesign = this.nonCatLarge.errorsDesignSelect ? this.errorsDesign.find((v) => v.id === this.nonCatLarge.errorsDesignSelect).rate : null;
        this.nonCatLarge.rateSrcc = this.nonCatLarge.srccSelect ? this.SRCC.find((v) => v.id === this.nonCatLarge.srccSelect).rate : null;

        const op =
          Decimal(this.nonCatLarge.rateContractor || 0) *
          Decimal(this.nonCatLarge.rateTime || 0) *
          Decimal(this.sizeCredit || 0) *
          Decimal(this.nonCatLarge.ratetypeConstructor || 0) *
          Decimal(this.nonCatLarge.ratetesting || 0) *
          Decimal(this.nonCatLarge.rateequipmentInstallation || 0) *
          Decimal(this.nonCatLarge.ratethirdPartyLiability || 0) *
          Decimal(this.nonCatLarge.ratefirstyearOp || 0) *
          Decimal(this.nonCatLarge.ratemaintenancePeriod || 0) *
          Decimal(this.nonCatLarge.rateinlandTransit || 0) *
          Decimal(this.nonCatLarge.rateSrcc || 0) *
          Decimal(this.nonCatLarge.rateerrorsDesign || 0);

        const result = new Decimal(op);

        //if (result.lessThan(1) && result.greaterThan(-1)) return result;
        return result.toFixed(4);
      },
    },
    proyectGross: {
      get() {
        const op = Decimal(this.sumMonthlyRate || 0)
          .mul(this.quotation.term || 0)
          .div((100 - this.sumDeductions) / 100);

        const result = op;
        //if (result.lessThan(1) && result.greaterThan(-1)) return result.toFixed(5);
        return result.toFixed(3);
      },
    },
    finalRate: {
      get() {
        const op = this.proyectGross * ((100 + parseInt(this.nonCatLarge.credit)) / 100);
        const result = new Decimal(op);
        if (result.lessThan(1) && result.greaterThan(-1)) return result.toFixed(5);
        return result.toFixed(3);
      },
    },
    selectedContractor: {
      get() {
        const value = this.contractors.find((v) => v.id === this.nonCatLarge.contractorSelect);

        return value || false;
      },
    },
    categorySelect: {
      get() {
        if (!this.selectedContractor) return "";
        return this.selectedContractor.category;
      },
    },
    rateContractor: {
      get() {
        const activity = this.activities.find((v) => v.id === this.accountInformation.activity);
        if (!activity) return 0;
        const restDeductions = (100 - this.sumDeductions) / 100;
        const monthlyRateCal = this.monthlyRate.find((v) => v.id === activity.rate || 0);
        const rate = Decimal(monthlyRateCal.rate || 0)
          .div(restDeductions)
          .toSignificantDigits(4);
        if (rate) return rate;
        return 0;
      },
    },
    sizeCredit: {
      get() {
        var compareTiv = numeral((this.tiv.total || "$0").replace("$", "")).value();
        switch (true) {
          case compareTiv <= 15000000:
            return 1;
          case compareTiv > 15000000 && compareTiv <= 30000000:
            return 0.95;
          case compareTiv > 30000000 && compareTiv <= 45000000:
            return 0.9;
          case compareTiv > 45000000 && compareTiv <= 60000000:
            return 0.8;
          case compareTiv > 60000000 && compareTiv <= 80000000:
            return 0.75;
          case compareTiv > 80000000 && compareTiv <= 100000000:
            return 0.7;
          case compareTiv > 100000000:
            return 0.65;
        }
      },
    },
    time: {
      get() {
        switch (true) {
          case this.quotation.term <= 6:
            return 1.25;
          case this.quotation.term > 6 && this.quotation.term <= 12:
            return 1.15;
          case this.quotation.term > 12 && this.quotation.term <= 24:
            return 1.1;
          case this.quotation.term > 24 && this.quotation.term <= 36:
            return 1.0;
          case this.quotation.term > 36 && this.quotation.term <= 48:
            return 0.8;
          case this.quotation.term > 48:
            return 0.75;
        }
      },
    },
  },
  watch: {
    finalRate: debounce(function (val) {
      this.tarifarNonCatRate.finalRate = val;
      this.$v.nonCatLarge.finalRate.$model = val;
      this.SET_NONCATLARGE("finalRate", val);
      this.checkField("finalRate");
    }, 1000),
    sumMonthlyRate: debounce(function (val) {
      this.$v.nonCatLarge.sumMonthlyRate.$model = val;
      this.SET_NONCATLARGE("sumMonthlyRate", val);
      this.checkField("sumMonthlyRate");
    }, 1000),
    categorySelect: debounce(function (val) {
      this.$v.nonCatLarge.categorySelect.$model = val;
      this.SET_NONCATLARGE("categorySelect", val);
      this.checkField("categorySelect");
    }, 1000),
    rateContractor: debounce(function (val) {
      this.$v.nonCatLarge.rateContractor.$model = val;
      this.SET_NONCATLARGE("rateContractor", val);
      this.checkField("rateContractor");
    }, 1000),
    sizeCredit: debounce(function (val) {
      this.$v.nonCatLarge.rateSize.$model = val;
      this.SET_NONCATLARGE("rateSize", val);
      this.checkField("rateSize");
    }, 1000),
    time: debounce(function (val) {
      this.$v.nonCatLarge.rateTime.$model = val;
      this.SET_NONCATLARGE("rateTime", val);
      this.checkField("rateTime");
    }, 1000),
  },
  methods: {
    ...mapActions(["saveRatesModalColumn", "loadSectionRatesModal", "getCatalogByName"]),
    ...mapMutations(["SET_NONCATLARGE"]),

    async checkField(column) {
      this.$v.nonCatLarge[column].$touch();
      if (this.$v.nonCatLarge[column].$invalid || this.$v.nonCatLarge[column].$error) return;
      const value = this.$v.nonCatLarge[column].$model;
      await this.saveRatesModalColumn({
        table: "catLarge",
        key: column,
        value,
      });
    },
  },
  validations: {
    nonCatLarge: {
      rateSize: { required },
      rateTime: { required },
      credit: { required },
      contractorSelect: { required },
      categorySelect: { required },
      rateContractor: { required },
      typeConstructorSelect: { required },
      ratetypeConstructor: { required },
      testingSelect: { required },
      ratetesting: { required },
      equipmentInstallationSelect: { required },
      rateequipmentInstallation: { required },
      thirdPartyLiabilitySelect: { required },
      ratethirdPartyLiability: { required },
      firstyearOpSelect: { required },
      ratefirstyearOp: { required },
      maintenancePeriodSelect: { required },
      ratemaintenancePeriod: { required },
      inlandTransitSelect: { required },
      rateinlandTransit: { required },
      srccSelect: { required },
      rateSrcc: { required },
      errorsDesignSelect: { required },
      rateerrorsDesign: { required },
      reasonsSelect: { required },
      sumMonthlyRate: { required },
      finalRate: { required },
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/Subscription/Rate.less";

.Table {
  width: 90%;
  height: auto;

  //LINEA DE INPUTS
  .LineInputs {
    .flex();
    width: 100%;
    height: 50px;
    justify-content: space-between;

    .InputLarge {
      width: 54%;
    }
    .Input {
      width: 20%;
    }
    .Bold {
      font-weight: 600;
      justify-content: center;
      text-align: center;
    }
  }
  //LISTA DE INPUTS
  .List {
    .flex();
    width: 100%;
    height: auto;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: flex-start;

    .Row {
      .flex();
      width: 100%;
      height: 50px;
      justify-content: space-between;

      .Label {
        .flex();
        width: 35%;
        height: 100%;
        justify-content: flex-end;
        text-align: right;
        color: #547fa9;
        text-transform: capitalize;
      }

      .MiniInput {
        width: 13%;
        height: 100%;
      }
      .MiniLargeInput {
        width: 16%;
        height: 100%;
      }
      .InputLarge {
        width: 40%;
        height: 100%;
      }
      .Input {
        width: 20%;
        height: 100%;
      }
    }

    .Large {
      margin-top: 55px;
      height: 40px;
    }
    .Large div {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-weight: 600;
    }
  }
}
</style>
