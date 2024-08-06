<template>
  <div class="outter-wrapper" ref="targetRef">
    <div class="endorsement-title">Movement without premium</div>
    <div class="editAccount" v-if="accountComplete.reference">
      {{ accountComplete.reference }}
    </div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" color="#F59607">
          Endorsement
        </v-stepper-step>

        <!-- <v-stepper-step :complete="e1 > 2" step="2" color="#F59607">
          Calculate premium
        </v-stepper-step> -->
      </v-stepper-header>
      <div class="endorsement-wrapper">
        <div class="content">
          <v-stepper-items>
            <v-stepper-content step="1" class="step-one">
              <div class="input-row w-100 d-flex flex-wrap">
                <div class="input-col">
                  <div class="input-cont">
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="effectiveDate"
                          label="Endorsement effective date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="effectiveDate"
                        @input="menu2 = false"
                        @change="endorsementDateValidation($event, effectiveDate)"
                      ></v-date-picker>
                    </v-menu>
                    <div v-if="this.endorsementDateError" class="error-message">
                      The new Endorsement effective date must be lower than
                      expiry date.
                    </div>
                  </div>
                </div>
                <div class="input-col">
                  <div class="input-cont">
                    <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="expiryDate"
                          label="Expiry date"
                          v-bind="attrs"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <!-- <v-date-picker v-model="expiryDate" @input="menu = false"
                        @change="endDateValidation($event, expiryDate)"></v-date-picker> -->
                    </v-menu>
                    <!-- <div v-if="this.endDateError" class="error-message">
                      The new Movement end date must be later than current date.
                    </div> -->
                  </div>
                </div>
                <InputDaysDiference
                  :endorsementDate="effectiveDate"
                  :expiryDate="expiryDatetoCalc"
                  :key="effectiveDate"
                />
              </div>
              <div v-if="showInfoEndorsement">
              <div class="endorsement-title">Description</div>

              <div class="textArea-cont">
                <v-textarea
                  v-model="description"
                  background-color="#EDF2F8"
                  height="180"
                  solo
                  flat
                  rounded
                  no-resize
                  class="textArea"
                  counter="500"
                />
              </div>
              <div class="input-row w-100 d-flex flex-wrap">
                <div class="input-col">
                  <div class="inner-title">Additional</div>
                  <div class="input-cont">
                    <v-autocomplete
                      label="Clause"
                      v-model="clause"
                      :items="clauseList"
                      item-value="clause"
                      item-text="clause"
                    />
                  </div>
                </div>
                <div class="input-col">
                  <div class="inner-title" style="opacity: 0">|</div>
                  <div class="input-cont">
                    <v-menu
                      v-model="menu3"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="premiumPaymentDate"
                          label="Premium payment date"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="premiumPaymentDate"
                        @input="menu3 = false"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                </div>
              </div>
              </div>
            </v-stepper-content>
            <!-- <v-stepper-content step="2">
              <div class="table-container input-row justify-center">
                <div class="table-col">
                  <div class="table-title">Endorsement effective date</div>
                  <div class="input-row">
                    <div class="inner-col">
                      <div class="table-input blue-input">
                        {{ effectiveDate }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table-col">
                  <div class="table-title">Expiry date</div>
                  <div class="input-row">
                    <div class="inner-col">
                      <div class="table-input blue-input">
                        {{ expiryDate }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="description-container">
                <div class="endorsement-title">Description</div>

                <div class="textArea-cont">
                  <v-textarea
                    v-model="detailDescription"
                    background-color="#EDF2F8"
                    height="180"
                    solo
                    flat
                    rounded
                    no-resize
                    class="textArea"
                    counter="500"
                    readonly
                  />
                </div>
                <div class="detail-date">
                  <div class="table-title-detail table-title-detail--large">
                    Detail
                  </div>
                  <div class="container-detail">
                    <div class="input-col">
                      <div class="input-cont">
                        <v-menu
                          v-model="menu4"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="premiumPaymentDate"
                              label="Premium payment date"
                              readonly
                              disabled
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                        </v-menu>
                      </div>
                    </div>
                    <div class="input-col">
                      <div class="input-cont">
                        <v-autocomplete
                          label="Clause"
                          v-model="clause"
                          :items="clauseList"
                          item-value="clause"
                          item-text="clause"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-stepper-content> -->
          </v-stepper-items>
        </div>
      </div>
      <!-- <DocumentsEndorsement v-if="e1 == 1 || e1 == 3" /> -->
      <EndorsementDocuments @setEndorsementDocuments="setEndorsementDocuments"  v-show="e1 == 1 || e1 == 3" />

      <div class="stepper-btn mt-7 mb-3 d-flex justify-end align-center">
        <v-btn rounded large text class="blue-btn" @click="goNext(e1)">
          {{ buttonTitle }}
        </v-btn>
      </div>

      <div class="stepper-btn mb-7 d-flex justify-end align-center">
        <v-btn rounded large text class="blue-btn" @click="goBack(e1)">
          {{ buttonTitleBack }}
        </v-btn>
      </div>
    </v-stepper>
  </div>
</template>
<script>
/* components */
import AppFile from "../../components/AppFile.vue";
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
import DocumentsEndorsement from "../../components/DocumentsEndorsement.vue";
import InputDaysDiference from "../../components/DaysDiference.vue";
/* services */
import { getFiles } from "../../services/mock-files.service";
import AccountCompleteService from "@/modules/home/services/account-complete.service";
import EndorsementService from "../../services/endorsement.service";
import PaymentService from "@/modules/home/services/payments.service";
import EndorsementDocuments from "../../components/EndorsementDocuments.vue";

export default {
  name: "MovementWithoutPremium",
  components: {
    AppFile,
    CurrencyInput,
    DocumentsEndorsement,
    InputDaysDiference,
    EndorsementDocuments,
  },
  props: {
    type: { type: String, default: "Inclusion Risk" },
    accountComplete: { type: Object },
    backToCreateEndorsement: {
      type: Function,
    },
    changeDateEndorsement: {
      type: Function,
    },
    dateSaved: { type: String },
    showInfoEndorsement: {type: Boolean}
  },
  data() {
    return {
      endorsementDateError: false,
      expiryDatetoCalc: this.accountComplete.deductibles.expiryDate,
      e1: 1,
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      effectiveDate: this.dateSaved,
      expiryDate: new Date(this.accountComplete.deductibles.expiryDate)
        .toISOString()
        .substr(0, 10),
      currentMovementEndDate: new Date(
        Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      effectiveDateError: false,
      endDateError: false,
      description: " ",
      detailDescription: " ",
      subscriptionId: this.$route.params.id,
      premiumPaymentDate: new Date().toISOString().substr(0, 10),
      cartera: {},
      clauseList: [],
      clause: this.accountComplete.cartera.clausula,
      endorsementDocuments: [],
      buttonTitle: 'Finalize',
      buttonTitleBack: 'Cancel',
    };
  },
  async beforeMount() {
    this.files = await getFiles();
    this.clauseList = await PaymentService.getClauses();
  },

  async mounted() {},
  computed: {},
  watch: {},
  methods: {
    async stepone() {
      this.e1 = 2;
      console.log(this.e1);
    },

    async nextStep() {
      console.log("next step");
    },
    async prevStep() {
      console.log("prev step");
    },

    async saveEndorsement() {
      console.log("Save endorsement");
    },

    async removeFileById({ id }) {
      console.log("remove file");
    },

    async loadingFile({ data }) {
      console.log("loafing file");
    },

    async updateFile(data) {
      console.log("update file");
    },

    setEndorsementDocuments({ files }) {
      this.endorsementDocuments = files
    },

    async submit() {
      // Obteniendo premium payment date
      console.log("HOLI");
      const premiumPaymentDate = new Date(
        this.premiumPaymentDate
      ).toISOString();
      this.cartera = {
        premiumPaymentDate,
        clausula: this.clause,
        description: this.description,
        effectiveDate: this.effectiveDate,
        endDate: this.expiryDatetoCalc
      };

      this.e1 = 1;

      // Actualizar additional_info
      this.accountComplete.additional_info = {
        detailDescription: this.detailDescription,
      };

      // guardar la cuenta actualizada en BD
      const accountCompleteResponse =
        await AccountCompleteService.addAccountComplete(this.subscriptionId, {
          ...this.accountComplete,
          deductibles: this.accountComplete.deductibles,
          tiv: this.accountComplete.tiv,
          netPremium: this.accountComplete.net_premium,
          additionalInfo: this.accountComplete.additional_info,
          technicalConditions: this.accountComplete.technical_conditions,
          cartera: {
            ...this.accountComplete.cartera,
            ...this.cartera,
          },
        });

      //guardar registro del endoso
      await EndorsementService.addEndorsment({
        subscriptionId: this.subscriptionId,
        endorsmentType: 5,
        idUser: this.$store.state.auth.user.id,
        accountId: accountCompleteResponse.id,
        effectiveDate: this.effectiveDate,
        report: {
          cartera: {
            ...this.accountComplete.cartera,
            ...this.cartera,
          },
        },
        files: this.endorsementDocuments,
      });
    await this.backToCreateEndorsement()
    },

    endDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) < Date.parse(this.currentMovementEndDate)) {
        this.endDateError = true;
      } else {
        this.endDateError = false;
      }
    },
    async endorsementDateValidation(event, incomingDate) {
      
      if (
        Date.parse(incomingDate) >=
        Date.parse(this.expiryDate)
      ) {
        this.endorsementDateError = true;
      } else {
        await this.changeDateEndorsement(incomingDate)
        this.endorsementDateError = false;
      }
    },
    keepDescription() {
      this.e1 = 2;
      this.detailDescription = this.description;
    },

    goNext(e1) {
      this.$refs.targetRef.scrollIntoView({ behavior: 'smooth' });
      if (e1 == 1) {
        this.submit();
      }
    },

    goBack(e1) {
      this.$refs.targetRef.scrollIntoView({ behavior: 'smooth' });
      if (e1 == 1) {
        this.backToCreateEndorsement();
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";

.endorsement-title {
  font-weight: 800;
  font-size: 20px;
}

.endorsement-wrapper {
  width: 100%;
  height: auto;
  border-radius: 15px;
  background: white;
  box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  padding: 0 20px;

  @media (max-width: 650px) {
    overflow-x: auto !important;
  }

  .content {
    width: 100%;
    height: auto;
    padding-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    padding-bottom: 10px;

    .button-cont {
      width: 100%;
      height: auto;
      margin-top: 20;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .blue-btn {
        color: white;
        width: 200px;
        height: 35px;
        background: #003d6d;
        font-size: 15px;
        font-weight: 500;
        letter-spacing: normal;
        text-transform: capitalize;
      }

      .clear-btn {
        width: 200px;
        height: 35px;
      }
    }
  }

  .v-btn {
    justify-content: flex-start !important;
    color: #003d6d;
  }
}

.mt {
  margin-top: 30px;
}

.table-col {
  width: 40%;

  .inner-col {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #dce5fc;
  }
}

.table-title {
  height: 50px;
  color: white;
  font-weight: 800;
  background-color: #547fa9;
  border-radius: 6px;
  margin: 2px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-title-space {
  height: 50px;
}

.stepper-btn {
  width: 100%;
  height: 40px;

  .blue-btn {
    color: white;
    width: 200px;
    height: 35px;
    background: #003d6d;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: normal;
    text-transform: capitalize;
  }

  .clear-btn {
    width: 200px;
    height: 35px;
  }
}

.col-subtitle {
  min-height: 40px;
  font-weight: 800;
  display: flex;
  align-items: center;
}

.table-input {
  min-height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
}

.blue-input {
  background-color: #dce5fc;
}

.input-row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: flex-start;
  justify-content: flex-start;
}

.input-col {
  width: 20%;
  display: block;
  margin-right: 30px;
}

.input-cont {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 5px 0;
}

.input-title {
  width: 100%;
}

.inner-title {
  width: 100%;
  font-size: 20px;
  font-weight: 800;
  margin: 15px 0;
}

.description-container {
  width: 80%;
  margin: 40px auto;
}

.textArea-cont {
  margin-top: 20px;
}

.v-sheet.v-stepper:not(.v-sheet--outlined) {
  box-shadow: none !important;
}

.v-stepper__step__step {
  display: none !important;
}

.v-stepper__label {
  color: #547fa9;
  font-weight: 800;
}

.v-application .primary {
  background-color: #586675 !important;
  border-color: #1c2b39 !important;
}

.theme--light.v-stepper
  .v-stepper__step:not(.v-stepper__step--active):not(
    .v-stepper__step--complete
  ):not(.v-stepper__step--error)
  .v-stepper__step__step {
  background: rgb(186, 34, 34);
}

.v-stepper__header {
  justify-content: center;
  box-shadow: none;
}

.v-stepper__items {
  width: 100%;
}

.theme--light.v-stepper {
  background: #ffe9e900;
}

.error-message {
  font-size: 12px;
  color: red;
  max-width: 200px;
  transform: translateY(-14px);
}

.editAccount {
  width: auto;
  color: #f59607;
  font-weight: 600;
  font-size: 19px;
}
.container-detail {
  display: flex;
  flex-direction: row;
}
</style>
