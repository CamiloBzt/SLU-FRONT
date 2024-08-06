<template>
  <div class="outter-wrapper" ref="targetRef">
    <div class="endorsement-title">Change of technical conditions</div>

    <div class="editAccount" v-if="accountComplete.reference">
      {{ accountComplete.reference }}
    </div>

    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" color="#F59607">
          Endorsement
        </v-stepper-step>

        <v-stepper-step :complete="e1 > 2" step="2" color="#F59607">
          Calculate premium
        </v-stepper-step>

        <v-stepper-step step="3" color="#F59607">
          Endorsement summary
        </v-stepper-step>
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
                          v-bind="attrs"
                          v-on="on"
                        >
                        </v-text-field>
                      </template>

                      <v-date-picker 
                        v-model="effectiveDate" 
                        @input="menu2 = false"
                        @change="endorsementDateValidation($event, effectiveDate)"
                      >
                      </v-date-picker>
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
                      offset-y min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field 
                          v-model="expiryDateReal" 
                          label="Expiry date" 
                          disabled 
                          v-bind="attrs"
                          v-on="on">
                        </v-text-field>
                      </template>
                    </v-menu>
                  </div>
                </div>

                <InputDaysDiference 
                  :endorsementDate="effectiveDate" 
                  :expiryDate="expiryDatetoCalc"
                  :key="effectiveDate"
                />
              </div>

              <template>
                <div class="ExpandContent justify-center">
                  <div class="TitleCont d-flex justify-space-between align-center">
                    <h5>Location</h5>
                  </div>

                  <!--Coverage B // ALOP-->
                  <div class="DynamicItemsContent">
                    <div class="InputsCont d-flex justify-space-between align-start flex-wrap">
                      <div class="InputRow">
                        <!-- <v-text-field 
                          v-model.trim="$v.boundEngCatDeductibles.location.$model" 
                          @blur="
                            SET_BOUND_ENG_CAT_DED({
                              index: indexarr,
                              key: 'location',
                              value: $v.boundEngCatDeductibles.location.$model,
                            });
                            checkField('location');
                          "
                        /> -->
                        <v-text-field 
                          v-model.trim="location" 
                          @blur=""
                        />
                      </div>
                    </div>
                  </div>

                  <div class="TitleCont d-flex justify-start align-center">
                    <h5>Underlying Cat Deductibles</h5>
                  </div>

                  <div class="InputTitle d-flex justify-start align-center align-end">
                    Coverage B, Earthquake, Tremor or Volcanic Eruption
                  </div>

                  <div class="InputsCont d-flex justify-space-between align-start flex-wrap">
                    <div class="InputRow Small">
                      <v-select 
                        v-model.trim="underlyingCatSelect" 
                        @blur="" 
                        :items="underlyingCat" 
                        item-text="data" 
                        item-value="id" 
                        clearable
                        :disabled="underlyingCat.length === 0"
                      >
                      </v-select>
                    </div>

                    <div class="InputRow Large">
                      <v-select 
                        v-model.trim="underlyingCatAplicaSelect" 
                        @blur="" 
                        :items="underlyingCatAplica" 
                        item-text="data" 
                        label="Total value"
                        item-value="id" 
                        clearable
                        :disabled="underlyingCatAplica.length === 0"
                      >
                      </v-select>
                    </div>

                    <div class="InputRow">
                      <v-select 
                        v-model.trim="underlyingCatValuesSelect" 
                        @blur="" 
                        :items="underlyingCatValues" 
                        item-text="data" 
                        item-value="id" 
                        label="Limit"
                        clearable
                        :disabled="underlyingCatValues.length === 0"
                      >
                      </v-select>
                    </div>

                    <div class="InputRow">
                      <currency-input 
                        v-model.trim="coverB" 
                        @blur=""
                        :options="currencyOptions"
                      />
                    </div>

                    <div class="InputRow">
                      <v-select 
                        v-model.trim="underlyingCatValuesSelectTwo" 
                        @blur="" 
                        :items="underlyingCatValues" 
                        item-text="data" 
                        item-value="id" 
                        label="Limit"
                        clearable
                        :disabled="underlyingCatValues.length === 0"
                      >
                      </v-select>
                    </div>

                    <div class="InputRow">
                      <currency-input 
                        v-model.trim="coverTwoB" 
                        @blur=""
                        :options="currencyOptions"
                      />
                    </div>
                  </div>

                  <!--Hydrometeorological Risk-->
                  <div class="InputTitle d-flex justify-start align-end mt-7">Hidrometeorological Risk</div>

                  <div class="InputsCont d-flex justify-space-between align-start flex-wrap">
                    <div class="InputRow Small">
                      <v-select 
                        v-model.trim="underlyingHidroSelect" 
                        @blur="" 
                        :items="underlyingCat" 
                        item-text="data" 
                        item-value="id" 
                        clearable
                        :disabled="underlyingCat.length === 0"
                      >
                      </v-select>
                    </div>

                    <div class="InputRow Large">
                      <v-select 
                        v-model.trim="underlyingHidroAplicaSelect" 
                        @blur="" 
                        :items="underlyingCatAplica" 
                        item-text="data" 
                        label="Total value" 
                        item-value="id" 
                        clearable
                        :disabled="underlyingCatAplica.length === 0"
                      >
                      </v-select>
                    </div>

                    <div class="InputRow">
                      <v-select 
                        v-model.trim="underlyingHidroValuesSelect" 
                        @blur="" 
                        :items="underlyingCatValues" 
                        item-text="data" 
                        item-value="id" 
                        label="Limit"
                        clearable
                        :disabled="underlyingCatValues.length === 0"
                      >
                      </v-select>
                    </div>

                    <div class="InputRow">
                      <currency-input 
                        v-model.trim="hidroRisk" 
                        @blur=""
                        :options="currencyOptions" 
                      />
                    </div>

                    <div class="InputRow">
                      <v-select 
                        v-model.trim="underlyingHidroValuesSelectTwo"
                        @blur=""
                        :items="underlyingCatValues"
                        item-text="data"
                        item-value="id"
                        label="Limit"
                        clearable
                        :disabled="underlyingCatValues.length === 0"
                      >
                      </v-select>
                    </div>

                    <div class="InputRow">
                      <currency-input 
                        v-model.trim="hidroRiskTwo" 
                        @blur="" 
                        :options="currencyOptions"
                      />
                    </div>
                  </div>

                  <!--Coverage B // ALOP-->
                  <div class="DynamicItemsContent mt-8" v-if="this.showAlopLines">
                    <div class="InputTitle d-flex justify-start align-center align-end">ALOP Coverage B, Earthquake,
                      Tremor or Volcanic Eruption</div>
                    <div class="InputsCont d-flex justify-space-between align-start flex-wrap">
                      <div class="InputRow">
                        <v-text-field 
                          type="number" 
                          suffix="DAY(S)"
                          v-model.trim="alopEarthquake" 
                          @blur=""
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Hydrometeorological Risk // ALOP -->
                  <div class="DynamicItemsContent mt-7" v-if="this.showAlopLines">
                    <div class="InputTitle d-flex justify-start align-center align-end">
                      ALOP Hidrometeorological Risk
                    </div>

                    <div class="InputsCont d-flex justify-space-between align-start flex-wrap">
                      <div class="InputRow">
                        <v-text-field 
                          type="number" 
                          suffix="DAY(S)"
                          v-model.trim="alopHidro" 
                          @blur=""
                        />
                      </div>
                    </div>
                  </div>

                  <!--Underlying Fire -->
                  <div class="TitleCont mt-6 d-flex justify-start align-center">
                    <h5>Underlying Fire &#38; EC Deductibles</h5>
                  </div>

                  <!--Contenedor de deducibles-->
                  <div class="UnderlyingCont d-flex align-start flex-wrap"
                    v-for="(item, index) in boundEngDeductibles" :key="index">
                    <!--Fila con todos los inputs-->
                    <div class="LineItems">
                      <div class="Row">
                        <v-combobox 
                          v-model.trim="item.underlyingFireText" :filter="filter"
                          :hide-no-data="!item.search" 
                          :items="underlyingFire" 
                          :search-input.sync="item.search"
                          @change="" 
                          hide-selected 
                          item-text="data"
                          item-value="id" 
                          label="Search for an option" 
                          clearable 
                          return-object
                          :disabled="underlyingFire.length === 0"
                        >
                          <template v-slot:no-data>
                            <v-list-item>
                              <span class="subheading">Creating new </span>

                              <v-chip label small> {{ item.search }} </v-chip>
                            </v-list-item>
                          </template>
                          
                          <template v-slot:selection="{ attrs, item }">
                            <span v-if="typeof item === 'object'" v-bind="attrs">
                              {{ item.data }}
                            </span>
                            <span v-else v-bind="attrs">
                              {{ item }}
                            </span>
                          </template>
                        </v-combobox>
                      </div>

                      <div class="Row Small">
                        <v-select 
                          v-model.trim="item.underlyingFireNumberSelect"
                          @input="item.underlyingFireNumberSelect.$touch()"
                          @blur="" 
                          :items="underlyingCat"
                          item-text="data" 
                          item-value="id" 
                          clearable 
                          :disabled="underlyingCat.length === 0"
                        >
                        </v-select>
                      </div>

                      <div class="Row Large">
                        <v-select 
                          v-model.trim="item.underlyingFireAplicaSelect"
                          @input="item.underlyingFireAplicaSelect.$touch()"
                          @blur="" 
                          :items="underlyingFireAplica"
                          item-text="data" 
                          label="Total value" 
                          item-value="id" 
                          clearable
                          :disabled="underlyingFireAplica.length === 0"
                        >
                        </v-select>
                      </div>

                      <div class="Row">
                        <v-select 
                          v-model.trim="item.underlyingFireValuesSelect"
                          @input="item.underlyingFireValuesSelect.$touch()"
                          @blur="" 
                          :items="underlyingCatValues"
                          item-text="data" 
                          item-value="id" 
                          clearable
                          :disabled="underlyingCatValues.length === 0"
                        >
                        </v-select>
                      </div>

                      <div class="Row">
                        <currency-input 
                          v-model.trim="item.underlyingFireAmount"
                          @input="item.underlyingFireAmount.$touch()"
                          @blur="" 
                          :options="currencyOptions"
                        />
                      </div>

                      <div class="Row">
                        <v-select 
                          v-model.trim="item.underlyingFireValuesSelectTwo"
                          @input="item.underlyingFireValuesSelectTwo.$touch()"
                          @blur="" 
                          :items="underlyingCatValues"
                          item-text="data" 
                          item-value="id" 
                          clearable
                          :disabled="underlyingCatValues.length === 0"
                        >
                        </v-select>
                      </div>

                      <div class="Row">
                        <currency-input 
                          v-model.trim="item.underlyingFireAmountTwo"
                          @input="item.underlyingFireAmountTwo.$touch()"
                          @blur="" 
                          :options="currencyOptions"
                        />
                      </div>

                      <!-- botón de eliminado -->
                      <v-icon small @click="removeField(index)" class="mt-4"> mdi-minus-circle </v-icon>
                    </div>
                  </div>

                  <!--Boton para añadir deducible-->
                  <div class="ButtonCont">
                    <v-btn class="Btn" text rounded @click="addFields()" :loading="buttonLoader">
                      <v-icon class="mr-2"> mdi-plus-circle </v-icon>

                      Add Deductible
                    </v-btn>
                  </div>
                </div>
              </template>

              <!-- <MovementValues type="Inclusion Risk" :accountComplete="accountComplete" ref="componente"
                @onResultados="onResultados" /> -->

              <div class="input-row w-100 d-flex flex-wrap">
                <div class="input-col">
                  <div class="inner-title">Additional</div>

                  <div class="input-cont">
                    <v-autocomplete label="Clause" v-model="clause" :items="clauseList" item-value="clause"
                      item-text="clause" />
                  </div>
                </div>

                <div class="input-col">
                  <div class="inner-title" style="opacity: 0">|</div>

                  <div class="input-cont">
                    <v-menu v-model="menu3" :close-on-content-click="false" :nudge-right="40"
                      transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="premiumPaymentDate" label="Premium payment date" readonly v-bind="attrs"
                          v-on="on"></v-text-field>
                      </template>

                      <v-date-picker v-model="premiumPaymentDate" @input="menu3 = false"></v-date-picker>
                    </v-menu>
                  </div>
                </div>
              </div> 
            </v-stepper-content>

            <v-stepper-content step="2">
              <div class="detail-date">
                <div class="table-title-detail table-title-detail--large">
                  Detail
                </div>

                <div class="input-col">
                  <div class="input-cont">
                    <v-menu v-model="menu4" :close-on-content-click="false" :nudge-right="40"
                      transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="premiumPaymentDate" label="Premium payment date" readonly disabled
                          v-bind="attrs" v-on="on"></v-text-field>
                      </template>
                    </v-menu>
                  </div>
                </div>

                <div class="input-col">
                  <div class="input-cont">
                    <v-autocomplete label="Clause" v-model="clause" :items="clauseList" item-value="clause"
                      item-text="clause" disabled />
                  </div>
                </div>
              </div>

              <div class="table-container input-row justify-center">
                <div class="title-col">
                  <div class="table-title-space"></div>

                  <div class="col-subtitle">All Risk</div>

                  <div class="col-subtitle">ALOP</div>

                  <div class="col-subtitle">Total</div>

                  <div class="table-subtitle"></div>
                </div>

                <template v-for="item in detailValues">
                  <div v-if="item.id === 1" class="table-col">
                    <div>
                      <div class="table-title">{{ item.name }}</div>

                      <div class="input-row">
                        <div class="inner-col">
                          <!--<div class="table-subtitle">Total premium</div>-->
                          <div class="table-input blue-input">
                            {{ formatCurrency(item.premiumAllRisk) }}
                          </div>

                          <div class="table-input blue-input">
                            {{ formatCurrency(item.premiumAlop) }}
                          </div>

                          <div class="table-input">
                            {{ formatCurrency(item.premiumTotal) }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <template v-for="item in detailValues">
                  <div v-if="item.id === 2" :key="item.id" class="table-col">
                    <div>
                      <div class="table-title">{{ item.name }}</div>

                      <div class="input-row">
                        <div class="inner-col">
                          <!--<div class="table-subtitle">Total premium</div>-->
                          <div class="table-input blue-input">
                            {{ formatCurrency(item.premiumAllRisk) }}
                          </div>

                          <div class="table-input blue-input">
                            {{ formatCurrency(item.premiumAlop) }}
                          </div>

                          <div class="table-input">
                            {{ formatCurrency(item.premiumTotal) }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </v-stepper-content>

            <v-stepper-content step="3">
              <div class="inner-title">Endorsement Report</div>

              <div class="files-submit flex justify-content-start align-items-start align-content-start">
                <AppFile v-for="(item, clave) in files" :key="clave" :fileId="item.fileId" :fileName="item.fileName"
                  :fileDownloadLink="item.fileDownloadLink" :loaded="item.loaded" :error="item.error"
                  :errorMessage="item.errorMessage" :loading="item.loading" :fileType="item.fileType"
                  :fileTypeMessage="item.fileTypeMessage" @removeFileById="removeFileById($event)"
                  @errors="errors($event)" @loading="loadingFile($event)" @loadFile="updateFile($event)" />
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </div>
      </div>

      <Sublimes :boundSublimes="boundSublimes" :quotation="quotation" :boundSublimitsEng="boundSublimitsEng" v-if="e1 == 1" />

      <EndorsementDocuments @setEndorsementDocuments="setEndorsementDocuments" v-show="e1 == 1 || e1 == 3" />      

      <AdmittedPremiumTableEngineering v-if="e1 == 2" @setTotalPremium="setTotalPremium" :detailValues="totalPremium" />

      <div class="stepper-btn mt-7 mb-3 d-flex justify-end align-center">
        <v-btn :outlined="e1 == 3 ? false : true" rounded large :text="e1 == 3 ? true : false"
          :class="e1 == 3 ? 'blue-btn' : 'clear-btn'" :color="e1 == 3 ? 'none' : '#003D6D'" @click="goNext(e1)">
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
import MovementValues from "./MovementValuesEng.vue";
import DocumentsEndorsement from "../../components/DocumentsEndorsement.vue";
import InputDaysDiference from "../../components/DaysDiference.vue";
import AdmittedPremiumTable from "../../components/AdmittedPremiumTable.vue";
import AdmittedPremiumTableEngineering from "../../components/AdmittedPremiumTableEngineering.vue";
import CurrencyInput from '@/components/CurrencyInput/CurrencyInput.vue';
import Sublimes from '../../components/Sublimes.vue'
/* services */
import { getFiles } from "../../services/mock-files.service";
import netPremiumEng from "../services/netpremium.service";
import EndorsementService from "../../services/endorsement.service";
import AccountCompleteService from "@/modules/home/services/account-complete.service";
import PaymentService from "@/modules/home/services/payments.service";
import { netPremiumInclusionRiskEng, netPremiumInclusionRiskAutoCalcs } from "../class/netPremiumInclusionRiskEng";
import Catalog from '../../services/catalog.service'
/* libs */
import Decimal from "@/lib/decimal";
import EndorsementDocuments from "../../components/EndorsementDocuments.vue";

export default {
  name: "ChangeOfTechnicalConditions",
  components: {
    AppFile,
    MovementValues,
    DocumentsEndorsement,
    InputDaysDiference,
    AdmittedPremiumTable,
    AdmittedPremiumTableEngineering,
    EndorsementDocuments,
    CurrencyInput,
    Sublimes,
  },
  props: {
    type: { type: String, default: "Inclusion Risk" },
    backToCreateEndorsement: {
      type: Function,
    },
    accountComplete: { type: Object },
    changeDateEndorsement: {
      type: Function,
    },
    dateSaved: { type: String },
    showInfoEndorsement: { type: Boolean }
  },
  data() {
    const underlyingCatDeductibles = this.accountComplete.technical_conditions.deductibles.underlyingCatDeductibles[0]
    const underlyingFireECDeductibles = this.accountComplete.technical_conditions.deductibles.underlyingFireEcDeductibles
    const sublime = this.accountComplete.technical_conditions.sublime;
    return {
      buttonLoader: false,
      endorsementDateError: false,
      expiryDatetoCalc: this.accountComplete.deductibles.expiryDate,
      expiryDateReal: new Date(this.accountComplete.deductibles.expiryDate).toISOString()
        .substr(0, 10),
      menu3: false,
      menu4: false,
      clause: this.accountComplete.cartera.clausula,
      clauseList: [],
      cartera: {},
      premiumPaymentDate: new Date()
        .toISOString()
        .substr(0, 10),
      on: true,
      movementValues: [],
      netPremium: {},
      subscriptionId: this.$route.params.id,
      e1: 1,
      menu: false,
      menu2: false,
      effectiveDate: this.dateSaved,
      expiryDate: new Date(
        Date.now() + 31540000000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      admitedPremium: 0,
      files: [
        {
          fileId: 1,
          fileName: "Report Inclusion Risk",
          fileDownloadLink: "",
          loaded: false,
          error: false,
          errorMessage: "Could not load the file",
          loading: true,
          fileType: "xlsx",
          fileTypeMessage: "Download",
        },
      ],
      endorsementDocuments: [],
      insurable: [],
      detailValues: [
        {
          id: 1,
          name: "Original Currency",
          premiumAllRisk: 0,
          premiumAlop: 0,
          sluAllRisk: 0,
          sluAlop: 0,
        },
        {
          id: 2,
          name: "USD",
          premiumAllRisk: 0,
          premiumAlop: 0,
          sluAllRisk: 0,
          sluAlop: 0,
        },
      ],
      totalPremium: [
        {
          id: 1,
          name: "Original Currency",
          premiumAllRisk: 0,
          premiumAlop: 0,
          premiumTotal: 0,
          sluAllRisk: 0,
          sluAlop: 0,
          sluTotal: 0,
        },
        {
          id: 2,
          name: "USD",
          premiumAllRisk: 0,
          premiumAlop: 0,
          sluAllRisk: 0,
          sluAlop: 0,
        },
      ],
      currentMovementEndDate: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      effectiveDateError: false,
      endDateError: false,
      premiumPaymentDateError: true,
      endorsmentReporData: {},
      location: underlyingCatDeductibles.location,
      underlyingCat: [],
      underlyingCatSelect: underlyingCatDeductibles.underlying_cat_select,
      underlyingCatAplica: [],
      underlyingCatAplicaSelect: underlyingCatDeductibles.underlying_cat_aplica_select,
      underlyingCatValues: [],
      underlyingFireAplica: [],
      underlyingCatValuesSelect: underlyingCatDeductibles.underlying_cat_values_select,
      coverB: underlyingCatDeductibles.cover_b,
      underlyingCatValuesSelectTwo: underlyingCatDeductibles.underlying_cat_values_select_two,
      coverTwoB: underlyingCatDeductibles.cover_two_b,
      underlyingHidroSelect: underlyingCatDeductibles.underlying_hidro_select,
      underlyingHidroAplicaSelect: underlyingCatDeductibles.underlying_hidro_aplica_select,
      underlyingHidroValuesSelect: underlyingCatDeductibles.underlying_hidro_values_select,
      hidroRisk: underlyingCatDeductibles.hidro_risk,
      underlyingHidroValuesSelectTwo: underlyingCatDeductibles.underlying_hidro_values_select_two,
      hidroRiskTwo: underlyingCatDeductibles.hidro_risk_two,
      alopEarthquake: underlyingCatDeductibles.alop_earthquake,
      showAlopLines: true,
      alopHidro: underlyingCatDeductibles.alop_hidro,
      boundEngDeductibles:underlyingFireECDeductibles.map(u => {
        return {
          id: u.id,
          underlyingFireText: u.underlying_fire_text,
          search: u.search,
          data: '',
          underlyingFireNumberSelect: u.underlying_fire_number_select,
          underlyingFireAplicaSelect: u.underlying_fire_aplica_select,
          underlyingFireValuesSelect: u.underlying_fire_values_select,
          underlyingFireAmount: u.underlying_fire_amount,
          underlyingFireValuesSelectTwo: u.underlying_fire_values_select_two,
          underlyingFireAmountTwo: u.underlying_fire_amount_two,
        }
      }),
      underlyingFire: [],
      currencyOptions: {
        currency: 'MXN',
        currencyDisplay: 'narrowSymbol',
        locale: 'en-US',
      },
      boundSublimes: {
        sublimits1: sublime.catSublimes.sublimits1,
        sublimits2: sublime.catSublimes.sublimits2,
      },
      quotation: {
        exchangeRate: this.accountComplete.deductibles.exchangeRate,
      },
      boundSublimitsEng: sublime.allOtherSublimits.map(s => {
        return {
          id: s.id,
          endosoSelect: s.endoso_select,
          endosoText: s.endoso_text,
          endosoUsd: s.endoso_usd,
        }
      }),
      buttonTitle: 'Next',
      buttonTitleBack: 'Cancel',
    };
  },
  created() { },
  async beforeMount() {
    this.clauseList = await PaymentService.getClauses();
    this.underlyingCat = await Catalog.getUnderlyingCat();
    this.underlyingCatAplica = await Catalog.getUnderlyingCatAplica()
    this.underlyingCatValues = await Catalog.getUnderlyingCatValues();
    this.underlyingFireAplica = await Catalog.getUnderlyingFireAplica();
    this.underlyingFire = await Catalog.getUnderlyingFire();

    //console.log('accountComplete --->', this.accountComplete)

    //console.log('underlyingFireAplica', this.underlyingFire);
  },
  watch: {
    e1: async function () {
      if (this.e1 === 1) {
        this.isEdited = {}
        this.buttonTitle = 'Next';
        this.buttonTitleBack = 'Cancel';
      }

      if (this.e1 === 2) {
        this.buttonTitle = 'Next';
        this.buttonTitleBack = 'Return';
        this.calcPremium();
      }

      if (this.e1 === 3) {
        this.buttonTitle = 'Finalize'
        this.buttonTitleBack = 'Return';
        const premiumOriginal = this.detailValues.find((el) => el.id === 1);
        const premiumUSD = this.detailValues.find((el) => el.id === 2);


        // Obteniendo los calculos de Net premium
        const tiv = this.accountComplete.tiv;
        const tivMovement = {
          allRisk: tiv.insurable.allRisk,
          alop:tiv.insurable.alop,

          allRiskRate: tiv.premium.allRiskRate,
          alopRate: tiv.premium.alopRate,
        }

        const dates = {
          effetiveDate: new Date(this.accountComplete.deductibles.inceptionDate).toISOString().substring(0, 10),
          expiryDate: new Date(this.accountComplete.deductibles.expiryDate).toISOString().substring(0, 10),
          endormenteffetiveDate: new Date(this.effectiveDate),
          movementEndDate: new Date(this.expiryDateReal),
        }

        const options = {
          isEdited:this.isEdited,
          dataEdited: {
            // totalPremium
            premiumAllRisk:this.totalPremium[0].premiumAllRisk,
            premiumAlop:this.totalPremium[0].premiumAlop,

            // premiumSlu
            sluAllRisk:this.totalPremium[0].sluAllRisk,
            sluAlop:this.totalPremium[0].sluAlop,

          },
        }

        const sluLine = this.accountComplete.tiv?.boundInsurableProp.sluLine;
        const resultOriginalCurenncy = await netPremiumInclusionRiskAutoCalcs(
          tivMovement,
          this.accountComplete.deductibles,
          sluLine,
          false,
          dates,
          options
        )
        const resultUSD = await netPremiumInclusionRiskAutoCalcs(
          tivMovement,
          this.accountComplete.deductibles,
          sluLine,
          true,
          dates,
          options
        )


        // Obteniendo premium payment date
        const premiumPaymentDate = new Date(
          this.premiumPaymentDate
        ).toISOString();

        // Obteniendo la clausula
        const clause = this.clause;

        // Guardando los datos de cartera nuevos
        this.cartera = {
          premiumPaymentDate,
          clausula: clause,
        };

        // Construyendo el objeto para generar el excel
        const endorsmentReporData = {
          cartera: this.cartera,
          totalValues: {
            allRisk: premiumOriginal.premiumAllRisk,
            alop: premiumOriginal.premiumAlop,
            total: premiumOriginal.premiumTotal,
            allRiskUsd: premiumUSD.premiumAllRisk,
            alopUsd: premiumUSD.premiumAlop,
            totalUsd: premiumUSD.premiumTotal,
          },
          movementValues: {
            allRisk: 0,
            alop: 0,
            total: 0,
            allRiskUsd: 0,
            alopUsd: 0,
            totalUsd: 0,
          },
          premium: {
            allRisk: this.totalPremium[0].premiumAllRisk,
            alop: this.totalPremium[0].premiumAlop,
            totalInsured: this.totalPremium[0].premiumTotal,
            allRiskRate: this.accountComplete.tiv.premium.allRiskRate,
            alopRate: this.accountComplete.tiv.premium.alopRate,
            allRiskUsd: this.toUsd(this.totalPremium[0].premiumAllRisk),
            alopUsd: this.toUsd(this.totalPremium[0].premiumAlop),
            totalUsd: this.toUsd(this.totalPremium[0].premiumTotal),
          },
          boundInsurableProp: this.accountComplete.tiv?.boundInsurableProp,
          deductibles: this.accountComplete.deductibles,
          netPremium: {
            ...resultOriginalCurenncy.data,
            allRiskSluShare: resultOriginalCurenncy.data.allRiskPremiumSlu,
            alopSluShare: resultOriginalCurenncy.data.alopPremiumSlu,
            sluShareTotal: resultOriginalCurenncy.data.totalPremiumSlu,
          },
          netPremiumUSD: {
            ...resultUSD.data,
            allRiskSluShare: resultUSD.data.allRiskPremiumSlu,
            alopSluShare: resultUSD.data.alopPremiumSlu,
            sluShareTotal: resultUSD.data.totalPremiumSlu,
          },
        };

        // Guardar los valores de netPremium
        this.netPremium = {
          originalValues: {
            ...resultOriginalCurenncy.data,
            allRiskSluShare: resultOriginalCurenncy.data.allRiskPremiumSlu,
            alopSluShare: resultOriginalCurenncy.data.alopPremiumSlu,
            sluShareTotal: resultOriginalCurenncy.data.totalPremiumSlu,
          },
          usdValues: {
            ...resultUSD.data,
            allRiskSluShare: resultUSD.data.allRiskPremiumSlu,
            alopSluShare: resultUSD.data.alopPremiumSlu,
            sluShareTotal: resultUSD.data.totalPremiumSlu,
          },
        };

        this.endorsmentReporData = endorsmentReporData;

        // Invoca el  servicio para generar el excel
        const fileLink = await EndorsementService.getEndorsmentReport({
          subscriptionId: this.subscriptionId,
          endorsmentType: 11,
          endorsmentReporData,
        });

        const file = this.files.find((file) => file.fileId === 1);

        if (!fileLink) {
          file.error = true;
        } else {
          file.fileDownloadLink = fileLink;
          file.loaded = true;
          file.loading = false;
        }

      }
    },
  },
  methods: {
    addFields() {
      this.buttonLoader = true;
      const id = this.boundEngCatDeductibles;
      this.boundEngDeductibles.push({
          id,
          underlyingFireText: '',
          search: '',
          data: '',
          underlyingFireNumberSelect: '',
          underlyingFireAplicaSelect: '',
          underlyingFireValuesSelect: '',
          underlyingFireAmount: '',
          underlyingFireValuesSelectTwo: '',
          underlyingFireAmountTwo: '',
        })
      this.buttonLoader = false;
    },
    removeField(index) {
      this.buttonLoader = true;
      const id = this.boundEngDeductibles[index].id;
      this.boundEngDeductibles.splice(index, 1);
      this.buttonLoader = false;
    },
    filter(item, queryText, itemText) {
      if (item.header) return false;

      const hasValue = (val) => (val != null ? val : '');

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1;
    },
    toUsd(value) {
      const exchangeRate = this.accountComplete.deductibles.exchangeRate
      return Decimal.div(value, exchangeRate).toNumber()
    },
    setTotalPremium({ id, value, concept }) {
      const totalPremium = this.totalPremium.find((el) => el.id === id);
      totalPremium[concept] = value;
    },
    formatCurrency(amount) {
      if (isNaN(amount)) {
        return "Invalid data";
      }

      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      });
      return formatter.format(amount);
    },

    calcPremium(){

      const tiv = this.accountComplete.tiv;

      this.detailValues[0]["premiumAllRisk"] = tiv.insurable.allRisk;
      this.detailValues[0]["premiumAlop"] = tiv.insurable.alop;
      this.detailValues[0]["premiumTotal"] = tiv.insurable.total;

      this.detailValues[1]["premiumAllRisk"] = tiv.insurable.allRiskUsd;
      this.detailValues[1]["premiumAlop"] = tiv.insurable.alopUsd;
      this.detailValues[1]["premiumTotal"] = tiv.insurable.totalUsd;


      const tivMovement = {
        allRisk: tiv.insurable.allRisk,
        alop:tiv.insurable.alop,

        allRiskRate: tiv.premium.allRiskRate,
        alopRate: tiv.premium.alopRate,
      }

      const dates = {
        effetiveDate:new Date(this.accountComplete.deductibles.inceptionDate).toISOString().substring(0,10),
        expiryDate:new Date(this.accountComplete.deductibles.expiryDate).toISOString().substring(0,10),
        endormenteffetiveDate: new Date (this.effectiveDate),
        movementEndDate:new Date(this.expiryDateReal),
      }

      this.calcTotalPremium = new netPremiumInclusionRiskEng(
        tivMovement,
        this.accountComplete.deductibles,
        this.accountComplete.tiv?.boundInsurableProp.sluLine,
        false,
        dates
      );

      const totalPremiumResult = this.calcTotalPremium.calculateTotalPremium();

      const totalPremium = this.totalPremium.find((el) => el.id === 1);

      totalPremium.premiumAllRisk = totalPremiumResult.allRiskTotalPremium;
      totalPremium.premiumAlop = totalPremiumResult.alopTotalPremium;
      totalPremium.premiumTotal = totalPremiumResult.total;

      totalPremium.sluAllRisk =  this.calcTotalPremium.allRiskPremiumSlu();
      totalPremium.sluAlop =  this.calcTotalPremium.alopPremiumSlu();
      totalPremium.sluTotal =  this.calcTotalPremium.totalPremiumSlu();


    },

    async stepone() {
      this.e1 = 2;
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
    async downloadFile() {
      console.log("downloadFile");
    },

    setEndorsementDocuments({ files }) {
      this.endorsementDocuments = files
    },

    async submit() {
      this.e1 = 1;

      const OriginalUnderlyingCatDeductibles = this.accountComplete.technical_conditions.deductibles.underlyingCatDeductibles[0]

      // Obteniendo los inputs del usuario
      const technicalConditions = {
        deductibles:{
          underlyingCatDeductibles:[
            {
              ...OriginalUnderlyingCatDeductibles,
              location: this.location,
              underlying_cat_select: this.underlyingCatSelect,
              underlying_cat_aplica_select: this.underlyingCatAplicaSelect,
              underlying_cat_values_select: this.underlyingCatValuesSelect,
              cover_b: this.coverB,
              underlying_cat_values_select_two: this.underlyingCatValuesSelectTwo,
              cover_two_b: this.coverTwoB,
              underlying_hidro_select: this.underlyingHidroSelect,
              underlying_hidro_aplica_select: this.underlyingHidroAplicaSelect,
              underlying_hidro_values_select: this.underlyingHidroValuesSelect,
              hidro_risk: this.hidroRisk,
              underlying_hidro_values_select_two: this.underlyingHidroValuesSelectTwo,
              hidro_risk_two: this.hidroRiskTwo,
              alop_earthquake: this.alopEarthquake,
              alop_hidro: this.alopHidro,
            },
          ],
          underlyingFireEcDeductibles: this.boundEngDeductibles.map(u => {
            return {
              id: u.id,
              underlying_fire_text: u.underlyingFireText,
              search: u.search,
              underlying_fire_number_select: u.underlyingFireNumberSelect,
              underlying_fire_aplica_select: u.underlyingFireAplicaSelect,
              underlying_fire_values_select: u.underlyingFireValuesSelect,
              underlying_fire_amount: u.underlyingFireAmount,
              underlying_fire_values_select_two: u.underlyingFireValuesSelectTwo,
              underlying_fire_amount_two: u.underlyingFireAmountTwo,
            }
          }),
        },

        sublime:{
          catSublimes:{
            sublimits1: this.boundSublimes.sublimits1,
            sublimits2:this.boundSublimes.sublimits2,
          },
          allOtherSublimits:this.boundSublimitsEng.map(s => {
            return {
              id: s.id,
              endoso_select: s.endosoSelect,
              endoso_text: s.endosoText,
              endoso_usd: s.endosoUsd,
            }
          }),
        }
      }

      // Obteniendo el insurable
      const tivTotal = this.detailValues.find((el) => el.id === 1);
      const tivTotalUsd = this.detailValues.find((el) => el.id === 2);

      // actualizando tiv.insurable de account complete
      const tivUpdate = {
        insurable: {

          allRisk: tivTotal.premiumAllRisk,
          alop: tivTotal.premiumAlop,
          total: tivTotal.premiumTotal,

          allRiskUsd: tivTotalUsd.premiumAllRisk,
          alopUsd: tivTotalUsd.premiumAlop,
          totalUsd: tivTotalUsd.premiumTotal,

        },
        premium: {
          allRiskRate: this.accountComplete.tiv.premium.allRiskRate,
          alopRate: this.accountComplete.tiv.premium.alopRate,
        },
        boundInsurableProp: this.accountComplete.tiv.boundInsurableProp,
      }


      // guardar la cuenta actualizada en BD
      const accountCompleteResponse =
        await AccountCompleteService.addAccountComplete(this.subscriptionId, {
          deductibles: this.accountComplete.deductibles,
          tiv: tivUpdate,
          netPremium: {
              originalValues:{
                netSluExcludingSurveyFeesTotal:this.accountComplete.net_premium.originalValues.netSluExcludingSurveyFeesTotal,
              }
          },
          technicalConditions,
          cartera: {
            ...this.accountComplete.cartera,
            ...this.cartera,
            admitedPremium: this.admitedPremium,
          },
        });

      //guardar registro del endoso
      await EndorsementService.addEndorsment({
        subscriptionId: this.subscriptionId,
        endorsmentType: 11,
        idUser: this.$store.state.auth.user.id,
        accountId: accountCompleteResponse.id,
        effectiveDate: this.effectiveDate,
        report: {
          endorsmentReporData: {
            ...this.endorsmentReporData,
            additionalInfo: {},
          },
          cartera: {
            ...this.accountComplete.cartera,
            ...this.cartera,
            admitedPremium: this.admitedPremium,
          },
        },
        files: this.endorsementDocuments,
      });

      this.$router.push(`/subscription`);
    },

    endDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) <= Date.parse(this.accountComplete.deductibles.inceptionDate)) {
        this.endDateError = true;
      } else {
        this.endDateError = false;
      }
    },

    premiumPaymentDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) <= Date.parse(this.currentMovementEndDate)) {
        this.premiumPaymentDateError = true;
      } else {
        this.premiumPaymentDateError = true;
      }
    },
    async endorsementDateValidation(event, incomingDate) {

      if (
        Date.parse(incomingDate) >=
        Date.parse(this.expiryDateReal)
      ) {
        this.endorsementDateError = true;
      } else {
        await this.changeDateEndorsement(incomingDate)
        this.endorsementDateError = false;
      }
    },

    goNext(e1) {
      this.$refs.targetRef.scrollIntoView({ behavior: 'smooth' });
      if (e1 == 1) {
        this.e1 = 2;
      } else if (e1 == 2) {
        this.e1 = 3;
      } else if (e1 == 3) {
        this.submit();
      }
    },

    goBack(e1) {
      this.$refs.targetRef.scrollIntoView({ behavior: 'smooth' });
      if (e1 == 1) {
        this.backToCreateEndorsement();
      } else if (e1 == 2) {
        this.e1 = 1;
      } else if (e1 == 3) {
        this.e1 = 2;
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
@import '~@/assets/style/Subscription/Bound.less';

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

  //CABEZA DE LA TABLA

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

.table-container {
  margin-top: 30px;
}

.title-col {
  width: 10%;
}

.table-col {
  width: 40%;

  .inner-col {
    width: 100%;
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
  height: 54px;
}

.table-subtitle {
  height: 60px;
  font-weight: 800;
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

.v-stepper__items {
  width: 100%;
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

.column-title {
  font-size: 16px;
  font-weight: 800;
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

.theme--light.v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step {
  background: rgb(186, 34, 34);
}

.v-stepper__header {
  justify-content: center;
  box-shadow: none;
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

.table-title-detail {
  &--large {
    width: 100%;
  }

  width: 100%;
  font-weight: 800;
  font-size: 16px;
  line-height: 110%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 5px;
}

.detail-date {
  width: 91%;
  height: auto;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 50px 0 20px;
}
.TitleCont {
  .v-btn {
    margin-left: 5px;
    letter-spacing: normal;
    color: #003d6d;

    .v-icon {
      font-size: 18px;
      margin-right: 10px;
    }
  }
}
.InputsCont {
  width: 95%;
  height: auto;

  .InputRow {
    width: 16%;
    height: 50px;
  }

  /*Largo de los inputs*/
  .Small {
    width: 10%;
  }
  .Large {
    width: 22%;
  }
  .ExtraLarge {
    width: 33%;
  }
}
.InputTitle {
  width: 95%;
  height: 30px;
  color: #547fa9;
  font-size: 14px;
  margin-bottom: 15px;
}
.DynamicItemsContent {
  width: 95%;
  height: auto;
  .InputsCont {
    width: 100%;
    height: auto;
  }
}

/*Underlying*/
.UnderlyingCont {
  width: 95%;
  height: auto;

  .LineItems {
    .flex();
    width: 100%;
    justify-content: space-between;

    .Row {
      width: 10%;
      height: 100%;
    }
    .Small {
      width: 12%;
    }
    .Large {
      width: 30%;
    }
  }

  /*Linea con dos inputs*/
  .TwoInputs {
    justify-content: flex-end;
    .Row {
      margin-left: 1%;
    }
  }
}
.ButtonCont {
  margin-top: 15px;
}
</style>
