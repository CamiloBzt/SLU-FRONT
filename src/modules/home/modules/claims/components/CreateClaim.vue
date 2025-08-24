<template>
  <div class="outter-wrapper border-decoration">
    <v-stepper v-model="e1" class="">
      <div class="claim-wrapper">
        <div class="content">
          <v-stepper-items>
            <v-stepper-content step="1" class="step-one">
              <div>
                <!-- Account information -->
                <div class="input-row w-50 d-flex flex-wrap mt-6">
                  <div class="claim-title">Account information</div>

                  <div class="input-row">
                    <div class="input-col">
                      <div class="input-cont">
                        <v-autocomplete :label="'Bound number'" item-value="boundNumber" item-text="boundNumber" />
                      </div>

                      <div class="input-cont">
                        <v-text-field label="Expiry" type="number"></v-text-field>
                      </div>
                    </div>

                    <div class="input-col">
                      <div class="input-cont">
                        <v-autocomplete :label="'Insured'" item-value="insured" item-text="insured" />
                      </div>

                      <div class="input-cont">
                        <v-text-field label="Country" type="text"></v-text-field>
                      </div>
                    </div>

                    <div class="input-col">
                      <div class="input-cont">
                        <v-text-field label="Line" type="number"></v-text-field>
                      </div>

                      <div class="input-cont">
                        <v-text-field label="Cedent" type="text"></v-text-field>
                      </div>
                    </div>

                    <div class="input-col">
                      <div class="input-cont">
                        <v-text-field label="Inception" type="text"></v-text-field>
                      </div>

                      <div class="input-cont">
                        <v-text-field label="Broker" type="text"></v-text-field>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Claims information -->
                <div class="input-row w-50 d-flex flex-wrap mt-6">
                  <div class="claim-title">Claims information</div>

                  <div class="input-row">
                    <div class="input-col">
                      <div class="input-cont">
                        <v-text-field label="Claimant" type="text"></v-text-field>
                      </div>

                      <div class="input-cont">
                        <v-autocomplete :label="'Loss type'" item-value="lossType" item-text="lossType" />
                      </div>
                    </div>

                    <div class="input-col">
                      <div class="input-cont">
                        <v-menu :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field label="Loss ocurrence date" readonly v-bind="attrs" v-on="on"></v-text-field>
                          </template>
                          <v-date-picker></v-date-picker>
                        </v-menu>
                      </div>

                      <div class="input-cont">
                        <v-autocomplete :label="'Loss country'" item-value="lossCountry" item-text="lossCountry" />
                      </div>
                    </div>

                    <div class="input-col">
                      <div class="input-cont">
                        <v-menu :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field label="Loss reported date" readonly v-bind="attrs" v-on="on"></v-text-field>
                          </template>
                          <v-date-picker></v-date-picker>
                        </v-menu>
                      </div>

                      <div class="input-cont">
                        <v-text-field label="Loss city" type="text"></v-text-field>
                      </div>
                    </div>

                    <div class="input-col">
                      <div class="input-cont">
                        <v-autocomplete :label="'Loss cause'" item-value="lossCause" item-text="lossCause" />
                      </div>

                      <div class="input-cont">
                        <v-text-field label="Loss location" type="text"></v-text-field>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Loss description -->
                <div class="mt-6">
                  <div class="claim-title">Loss description</div>
                  <div class="textArea-cont">
                    <v-textarea background-color="#EDF2F8" height="180" solo flat rounded no-resize class="textArea" counter="500" />
                  </div>
                </div>
              </div>
            </v-stepper-content>

            <v-stepper-content step="2">
              <div>
                <!-- Account information -->
                <div class="input-row w-50 d-flex flex-wrap mt-6">
                  <div class="claim-title">Account information</div>

                  <div class="input-row">
                    <div class="input-col">
                      <div class="input-cont">
                        <v-autocomplete :label="'Bound number'" item-value="boundNumber" item-text="boundNumber" readonly disabled />
                      </div>

                      <div class="input-cont">
                        <v-text-field label="Expiry" type="number" readonly disabled></v-text-field>
                      </div>
                    </div>

                    <div class="input-col">
                      <div class="input-cont">
                        <v-autocomplete :label="'Insured'" item-value="insured" item-text="insured" readonly disabled />
                      </div>

                      <div class="input-cont">
                        <v-text-field label="Country" type="text" readonly disabled></v-text-field>
                      </div>
                    </div>

                    <div class="input-col">
                      <div class="input-cont">
                        <v-text-field label="Line" type="number" readonly disabled></v-text-field>
                      </div>

                      <div class="input-cont">
                        <v-text-field label="Cedent" type="text" readonly disabled></v-text-field>
                      </div>
                    </div>

                    <div class="input-col">
                      <div class="input-cont">
                        <v-text-field label="Inception" type="text" readonly disabled></v-text-field>
                      </div>

                      <div class="input-cont">
                        <v-text-field label="Broker" type="text" readonly disabled></v-text-field>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Claims information -->
                <div class="input-row w-50 d-flex flex-wrap mt-6">
                  <div class="claim-title">Claims information</div>

                  <div class="input-row">
                    <div class="input-col">
                      <div class="input-cont">
                        <v-text-field label="Claimant" type="text" readonly disabled></v-text-field>
                      </div>

                      <div class="input-cont">
                        <v-autocomplete :label="'Loss type'" item-value="lossType" item-text="lossType" readonly disabled />
                      </div>
                    </div>

                    <div class="input-col">
                      <div class="input-cont">
                        <v-menu :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto" readonly disabled>
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field label="Loss ocurrence date" readonly v-bind="attrs" v-on="on"></v-text-field>
                          </template>
                          <v-date-picker></v-date-picker>
                        </v-menu>
                      </div>

                      <div class="input-cont">
                        <v-autocomplete :label="'Loss country'" item-value="lossCountry" item-text="lossCountry" readonly disabled />
                      </div>
                    </div>

                    <div class="input-col">
                      <div class="input-cont">
                        <v-menu :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto" readonly disabled>
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field label="Loss reported date" readonly v-bind="attrs" v-on="on"></v-text-field>
                          </template>
                          <v-date-picker></v-date-picker>
                        </v-menu>
                      </div>

                      <div class="input-cont">
                        <v-text-field label="Loss city" type="text" readonly disabled></v-text-field>
                      </div>
                    </div>

                    <div class="input-col">
                      <div class="input-cont">
                        <v-autocomplete :label="'Loss cause'" item-value="lossCause" item-text="lossCause" readonly disabled />
                      </div>

                      <div class="input-cont">
                        <v-text-field label="Loss location" type="text" readonly disabled></v-text-field>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Loss description -->
                <div class="mt-6">
                  <div class="claim-title">Loss description</div>
                  <div class="textArea-cont">
                    <v-textarea background-color="#EDF2F8" height="180" solo flat rounded no-resize class="textArea" counter="500" readonly disabled />
                  </div>
                </div>
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </div>
      </div>
      <EndorsementDocuments @setEndorsementDocuments="setEndorsementDocuments" v-show="e1 == 1" />
      <div v-if="e1 == 1" class="stepper-btn mt-7 mb-3 d-flex justify-end align-center">
        <v-btn v-bind="attrs" v-on="on" rounded large outlined class="clear-btn" color="#003D6D" @click="nextStep()"> Next </v-btn>
      </div>
      <div v-if="e1 == 1" class="stepper-btn mb-7 d-flex justify-end align-center">
        <v-btn rounded large text class="blue-btn"> Return </v-btn>
      </div>
      <div v-if="e1 == 2" class="stepper-btn mt-7 mb-3 d-flex justify-end align-center">
        <v-btn v-bind="attrs" v-on="on" rounded large outlined class="clear-btn" color="#003D6D"> Create claim </v-btn>
      </div>
      <div v-if="e1 == 2" class="stepper-btn mb-7 d-flex justify-end align-center">
        <v-btn rounded large text class="blue-btn" @click="e1 = 1"> Return </v-btn>
      </div>
    </v-stepper>
  </div>
</template>
<script>
/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";

/* services */

/* clases */
import EndorsementDocuments from "../../endorsements/components/EndorsementDocuments.vue";

export default {
  name: "CreateClaim",
  components: {
    CurrencyInput,
    EndorsementDocuments,
  },
  props: {},
  data() {
    return {
      loadingDocument: false,
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
      e1: 1,
    };
  },
  async beforeMount() {
    this.el = 1;
  },
  async created() {},
  mounted() {},
  methods: {
    redirect(id, name) {
      router.push(`dashboard/${id}`);
    },
    nextStep() {
      if (this.e1 === 1) {
        this.sent = true;
        let changeStep = true;

        if (changeStep === true) {
          this.e1 = 2;
          this.sent = false;
        }
        return;
      }
    },
    async prevStep() {
      console.log("prev step");
    },
  },
  watch: {
    e1: async function () {
      if (this.e1 === 1) {
        this.accountComplete = this.tempAccountComplete;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.claim-title {
  font-weight: 800;
  font-size: 20px;
}
.textArea-cont {
  margin-top: 20px;
}
.claim-wrapper {
  width: 100%;
  height: auto;
  border-radius: 5px;
  background: white;
  //box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
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
  }
  .v-btn {
    justify-content: flex-start !important;
    color: #003d6d;
    border-radius: 5px;
  }
}
.table-container {
  margin-top: 30px;
  gap: 20px;
  .title-col {
    width: 15%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
}
.table {
  width: 35%;
}
.table-block-title {
  font-weight: 800;
  font-size: 24px;
  line-height: 110%;
  text-align: center;
  padding-bottom: 25px;
}
.inner-table {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: flex-end;
  justify-content: flex-start;
}
.table-col {
  width: 100%;
  .inner-col {
    width: 100%;
  }
}
.table-main-title {
  height: 50px;
  color: white;
  font-weight: 800;
  background-color: #547fa9;
  border-radius: 6px;
  margin: 2px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.table-title {
  height: 50px;
  color: white;
  font-weight: 800;
  background-color: #547fa9;
  border-radius: 0px;
  margin: 2px;
  font-size: 14px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.container-subtitles {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.table-subtitle {
  width: 50%;
  color: rgb(0, 0, 0);
  font-weight: 800;
  border-radius: 6px;
  margin: 2px;
  font-size: 18px;
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
  height: 1px;
  width: 100%;
}
.input-row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: flex-start;
}
.input-col {
  width: 20%;
  display: block;
  margin-right: 30px;
}
.input-col-month {
  width: 20%;
  display: block;
  margin-right: 30px;
}

.input-col-lg {
  width: 50%;
  display: block;
  margin-right: 30px;
}

.input-cont-lg {
  width: 40%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 5px 0;
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

.container-modify-general {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}
.subcontainer-modify-general {
  display: flex;
  font-size: 18px;
  font-weight: 600;
  input {
    cursor: pointer;
    accent-color: #003d6d;
    margin-left: 10px;
    transform: scale(1.8);
  }
}

.theme--light.v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step {
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

.details-container {
  width: 60%;
  height: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 5%;
}
.details-input-container {
  justify-content: center;
  align-items: center;
}

.input-col-details {
  flex-grow: 1;
  margin-inline-end: 20px;
}
.catalog-select {
  width: 25%;
}
.container-rows-periods {
  display: flex;
  flex-direction: row;
  .input-name-period {
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .input-name-period-subtitle {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: 600;
    font-family: avenir;
    margin-right: 30px;
  }
  .input-name-period-subtitle-month {
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: 600;
    font-family: avenir;
  }
}
.border-decoration {
  border-top: 1px solid #a8bfd9;
}
</style>
