<template>
  <div class="outter-wrapper" ref="targetRef">
    <div class="endorsement-title">Change of technical conditions</div>
    <div class="editAccount" v-if="accountComplete.reference">
      {{ accountComplete.reference }}
    </div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1> 1" step="1" color="#F59607">
          Endorsement
        </v-stepper-step>
        <v-stepper-step :complete="e1> 2" step="2" color="#F59607">
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
                      min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="effectiveDate"
                          label="Endorsement effective date"
                          v-bind="attrs"
                          v-on="on">
                        </v-text-field>
                      </template>
                      <v-date-picker
                        v-model="effectiveDate"
                        @input="menu2 = false"
                        @change="endDateValidation($event, effectiveDate)">
                      </v-date-picker>
                    </v-menu>
                    <div v-if="this.endorsementDateError" class="error-message">
                      The new Endorsement effective date must be lower than
                      expiry date.
                    </div>
                    <div v-if="!showInfoEndorsement" class="error-message">
                      Please provide a valid endorsement effective date.
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
                      min-width="auto">
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
              <div v-if="showInfoEndorsement">
                <!-- Sección de Deducibles -->
                <div class="technical-conditions-section">
                  <div class="section-title">
                    <v-icon class="mr-2">mdi-shield-outline</v-icon>
                    Current Deductibles
                  </div>
                  <div>
                    <div class="ExpandContent justify-center">
                      <div
                        class="TitleCont d-flex justify-space-between align-center">
                        <h5>Location</h5>
                      </div>
                      <!--Coverage B // ALOP-->
                      <div class="DynamicItemsContent">
                        <div
                          class="InputsCont d-flex justify-space-between align-start flex-wrap">
                          <div class="InputRow">
                            <v-text-field
                              v-model.trim="location"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="TitleCont d-flex justify-start align-center">
                        <h5>Underlying Cat Deductibles</h5>
                      </div>
                      <div
                        class="InputTitle d-flex justify-start align-center align-end">
                        Coverage B, Earthquake, Tremor or Volcanic Eruption
                      </div>
                      <div
                        class="InputsCont d-flex justify-space-between align-start flex-wrap">
                        <div class="InputRow Small">
                          <v-select
                            v-model.trim="underlyingCatSelect"
                            :items="underlyingCat"
                            item-text="data"
                            item-value="id"
                            clearable
                            :disabled="underlyingCat.length === 0">
                          </v-select>
                        </div>
                        <div class="InputRow Large">
                          <v-select
                            v-model.trim="underlyingCatAplicaSelect"
                            :items="underlyingCatAplica"
                            item-text="data"
                            label="Total value"
                            item-value="id"
                            clearable
                            :disabled="underlyingCatAplica.length === 0">
                          </v-select>
                        </div>
                        <div class="InputRow">
                          <v-text-field value="Minimum" readonly />
                        </div>
                        <div class="InputRow">
                          <currency-input
                            v-model.trim="coverB"
                            :options="currencyOptions"
                          />
                        </div>
                        <div class="InputRow">
                          <v-text-field value="Maximum" readonly />
                        </div>
                        <div class="InputRow">
                          <currency-input
                            v-model.trim="coverTwoB"
                            :options="currencyOptions"
                          />
                        </div>
                      </div>
                      <!--Hydrometeorological Risk-->
                      <div
                        class="InputTitle d-flex justify-start align-end mt-7">
                        Hidrometeorological Risk
                      </div>
                      <div
                        class="InputsCont d-flex justify-space-between align-start flex-wrap">
                        <div class="InputRow Small">
                          <v-select
                            v-model.trim="underlyingHidroSelect"
                            :items="underlyingCat"
                            item-text="data"
                            item-value="id"
                            clearable
                            :disabled="underlyingCat.length === 0">
                          </v-select>
                        </div>
                        <div class="InputRow Large">
                          <v-select
                            v-model.trim="underlyingHidroAplicaSelect"
                            :items="underlyingCatAplica"
                            item-text="data"
                            label="Total value"
                            item-value="id"
                            clearable
                            :disabled="underlyingCatAplica.length === 0">
                          </v-select>
                        </div>
                        <div class="InputRow">
                          <v-text-field value="Minimum" readonly />
                        </div>
                        <div class="InputRow">
                          <currency-input
                            v-model.trim="hidroRisk"
                            :options="currencyOptions"
                          />
                        </div>
                        <div class="InputRow">
                          <v-text-field value="Maximum" readonly />
                        </div>
                        <div class="InputRow">
                          <currency-input
                            v-model.trim="hidroRiskTwo"
                            :options="currencyOptions"
                          />
                        </div>
                      </div>
                      <!--Coverage B // ALOP-->
                      <div
                        class="DynamicItemsContent mt-8"
                        v-if="this.showAlopLines">
                        <div
                          class="InputTitle d-flex justify-start align-center align-end">
                          ALOP Coverage B, Earthquake, Tremor or Volcanic
                          Eruption
                        </div>
                        <div
                          class="InputsCont d-flex justify-space-between align-start flex-wrap">
                          <div class="InputRow">
                            <v-text-field
                              type="number"
                              suffix="DAY(S)"
                              v-model.trim="alopEarthquake"
                            />
                          </div>
                        </div>
                      </div>
                      <!-- Hydrometeorological Risk // ALOP -->
                      <div
                        class="DynamicItemsContent mt-7"
                        v-if="this.showAlopLines">
                        <div
                          class="InputTitle d-flex justify-start align-center align-end">
                          ALOP Hidrometeorological Risk
                        </div>
                        <div
                          class="InputsCont d-flex justify-space-between align-start flex-wrap">
                          <div class="InputRow">
                            <v-text-field
                              type="number"
                              suffix="DAY(S)"
                              v-model.trim="alopHidro"
                            />
                          </div>
                        </div>
                      </div>
                      <!--Underlying Fire -->
                      <div
                        class="TitleCont mt-6 d-flex justify-start align-center">
                        <h5>Underlying Fire &#38; EC Deductibles</h5>
                      </div>
                      <!--Contenedor de deducibles-->
                      <div
                        class="UnderlyingCont d-flex align-start flex-wrap"
                        v-for="(item, index) in boundEngDeductibles"
                        :key="index">
                        <!--Fila con todos los inputs-->
                        <div class="LineItems">
                          <div class="Row">
                            <v-combobox
                              v-model.trim="item.underlyingFireText"
                              :filter="filter"
                              :hide-no-data="!item.search"
                              :items="underlyingFire"
                              :search-input.sync="item.search"
                              hide-selected
                              item-text="data"
                              item-value="id"
                              label="Search for an option"
                              clearable
                              return-object
                              :disabled="underlyingFire.length === 0">
                              <template v-slot:no-data>
                                <v-list-item>
                                  <span class="subheading">Creating new </span>
                                  <v-chip label small>
                                    {{ item.search }}
                                  </v-chip>
                                </v-list-item>
                              </template>
                              <template v-slot:selection="{ attrs, item }">
                                <span
                                  v-if="typeof item === 'object'"
                                  v-bind="attrs">
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
                              :items="underlyingCat"
                              item-text="data"
                              item-value="id"
                              clearable
                              :disabled="underlyingCat.length === 0">
                            </v-select>
                          </div>
                          <div class="Row Large">
                            <v-select
                              v-model.trim="item.underlyingFireAplicaSelect"
                              :items="underlyingFireAplica"
                              item-text="data"
                              label="Total value"
                              item-value="id"
                              clearable
                              :disabled="underlyingFireAplica.length === 0">
                            </v-select>
                          </div>
                          <div class="Row">
                            <v-text-field value="Minimum" readonly />
                          </div>
                          <div class="Row">
                            <currency-input
                              v-model.trim="item.underlyingFireAmount"
                              :options="currencyOptions"
                            />
                          </div>
                          <div class="Row">
                            <v-text-field value="Maximum" readonly />
                          </div>
                          <div class="Row">
                            <currency-input
                              v-model.trim="item.underlyingFireAmountTwo"
                              :options="currencyOptions"
                            />
                          </div>
                          <!-- botón de eliminado -->
                          <v-icon
                            small
                            @click="removeField(index)"
                            class="mt-4">
                            mdi-minus-circle
                          </v-icon>
                        </div>
                      </div>
                      <!--Boton para añadir deducible-->
                      <div class="ButtonCont">
                        <v-btn
                          class="Btn"
                          text
                          rounded
                          @click="addFields()"
                          :loading="buttonLoader">
                          <v-icon class="mr-2"> mdi-plus-circle </v-icon>
                          Add Deductible
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Sección de Sublímites -->
                <div class="technical-conditions-section">
                  <div class="section-title">
                    <v-icon class="mr-2">mdi-format-list-numbered</v-icon>
                    Current Sublimits
                  </div>
                  <div>
                    <Sublimes
                      :boundSublimes="boundSublimes"
                      :quotation="quotation"
                      :boundSublimitsEng="boundSublimitsEng"
                    />
                  </div>
                </div>
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
                  <div v-if="!clause" class="error-message">
                    Please select a clause.
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
                      min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="premiumPaymentDate"
                          label="Premium payment date"
                          v-bind="attrs"
                          v-on="on"></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="premiumPaymentDate"
                        @input="menu3 = false"></v-date-picker>
                    </v-menu>
                  </div>
                </div>
              </div>
            </v-stepper-content>
            <v-stepper-content step="2">
              <div class="detail-date">
                <div class="table-title-detail table-title-detail--large">
                  Admitted Premium Details
                </div>
                <div class="input-col">
                  <div class="input-cont">
                    <v-menu
                      v-model="menu4"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="premiumPaymentDate"
                          label="Premium payment date"
                          readonly
                          disabled
                          v-bind="attrs"
                          v-on="on"></v-text-field>
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
              <!-- Solo mostrar tabla de prima admitida -->
              <AdmittedPremiumTableEngineering
                @setTotalPremium="setTotalPremium"
                :detailValues="totalPremium"
                :exchangeRate="accountComplete.deductibles.exchangeRate"
              />
            </v-stepper-content>
            <v-stepper-content step="3">
              <div class="inner-title">Endorsement Report</div>
              <div v-if="cleanReport && cleanReport.endorsmentReporData">
                <EndorsementReportCompleteTable :report="cleanReport" />
              </div>
              <div
                class="files-submit flex justify-content-start align-items-start align-content-start">
                <AppFile
                  v-for="(item, clave) in files"
                  :key="clave"
                  :fileId="item.fileId"
                  :fileName="item.fileName"
                  :fileDownloadLink="item.fileDownloadLink"
                  :loaded="item.loaded"
                  :error="item.error"
                  :errorMessage="item.errorMessage"
                  :loading="item.loading"
                  :fileType="item.fileType"
                  :fileTypeMessage="item.fileTypeMessage"
                  @removeFileById="removeFileById($event)"
                  @errors="errors($event)"
                  @loading="loadingFile($event)"
                  @loadFile="updateFile($event)"
                />
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </div>
      </div>
      <EndorsementDocuments
        ref="endorsementDocs"
        :idEndorsement="createdEndorsementId"
        :endorsementDocuments="endorsementDocuments"
        @setEndorsementDocuments="setEndorsementDocuments"
        v-show="e1 == 1 || e1 == 3"
      />
      <div class="stepper-btn mt-7 mb-3 d-flex justify-end align-center">
        <v-btn
          :outlined="e1 == 3 ? false : true"
          rounded
          large
          :text="e1 == 3 ? true : false"
          :class="e1 == 3 ? 'blue-btn' : 'clear-btn'"
          :color="e1 == 3 ? 'none' : '#003D6D'"
          @click="goNext(e1)"
          :disabled="validationFirstStep">
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
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
import AdmittedPremiumTableEngineering from "../../components/AdmittedPremiumTableEngineering.vue";
import AppFile from "../../components/AppFile.vue";
import InputDaysDiference from "../../components/DaysDiference.vue";
import DocumentsEndorsement from "../../components/DocumentsEndorsement.vue";
import Sublimes from "../../components/Sublimes.vue";
import EndorsementReportCompleteTable from "./EndorsementReportCompleteTable.vue";
import MovementValues from "./MovementValuesEng.vue";
/* services */
import AccountCompleteService from "@/modules/home/services/account-complete.service";
import PaymentService from "@/modules/home/services/payments.service";
import Catalog from "../../services/catalog.service";
import EndorsementService from "../../services/endorsement.service";
import {
  netPremiumInclusionRiskAutoCalcs,
  netPremiumInclusionRiskEng,
} from "../class/netPremiumInclusionRiskEng";
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
    AdmittedPremiumTableEngineering,
    EndorsementDocuments,
    CurrencyInput,
    Sublimes,
    EndorsementReportCompleteTable,
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
    showInfoEndorsement: { type: Boolean },
  },
  data() {
    // Validaciones defensivas para evitar errores cuando los datos no están disponibles
    const technicalConditions = this.accountComplete?.technical_conditions;
    const deductibles = technicalConditions?.deductibles;
    const underlyingCatDeductibles =
      deductibles?.underlyingCatDeductibles?.[0] || {};
    const underlyingFireECDeductibles =
      deductibles?.underlyingFireEcDeductibles || [];
    const sublime = technicalConditions?.sublime || {
      catSublimes: {},
      allOtherSublimits: [],
    };
    return {
      // Variables de estado del stepper y botones
      e1: 1,
      buttonTitle: "Next",
      buttonTitleBack: "Cancel",
      // Variables de validación y errores
      endorsementDateError: false,
      endDateError: false,
      effectiveDateError: false,
      premiumPaymentDateError: true,
      // Variables de fechas
      effectiveDate: this.dateSaved,
      expiryDatetoCalc: this.accountComplete?.deductibles?.expiryDate || null,
      expiryDateReal: this.accountComplete?.deductibles?.expiryDate
        ? new Date(this.accountComplete.deductibles.expiryDate)
            .toISOString()
            .substr(0, 10)
        : new Date().toISOString().substr(0, 10),
      premiumPaymentDate: new Date().toISOString().substr(0, 10),
      expiryDate: new Date(
        Date.now() + 31540000000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      currentMovementEndDate: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      // Variables de menús
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      buttonLoader: false,
      // Variables de datos principales
      clause: this.accountComplete?.cartera?.clausula || "",
      clauseList: [],
      cartera: {},
      subscriptionId: this.$route.params.id,
      admitedPremium: 0,
      on: true,
      // Variables de datos de negocio
      movementValues: [],
      netPremium: {},
      endorsmentReporData: {},
      endorsementDocuments: [],
      createdEndorsementId: 0,
      insurable: [],
      isEdited: {},
      // Archivos
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
      // Estructuras de datos para las tablas
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
          premiumTotal: 0,
          sluAllRisk: 0,
          sluAlop: 0,
          sluTotal: 0,
        },
      ],
      // Datos específicos de Engineering - Deducibles (con valores por defecto)
      location: underlyingCatDeductibles.location || "",
      underlyingCat: [],
      underlyingCatSelect:
        underlyingCatDeductibles.underlying_cat_select || null,
      underlyingCatAplica: [],
      underlyingCatAplicaSelect:
        underlyingCatDeductibles.underlying_cat_aplica_select || null,
      underlyingFireAplica: [],
      coverB: underlyingCatDeductibles.cover_b || "0",
      coverTwoB: underlyingCatDeductibles.cover_two_b || "0",
      underlyingHidroSelect:
        underlyingCatDeductibles.underlying_hidro_select || null,
      underlyingHidroAplicaSelect:
        underlyingCatDeductibles.underlying_hidro_aplica_select || null,
      hidroRisk: underlyingCatDeductibles.hidro_risk || "0",
      hidroRiskTwo: underlyingCatDeductibles.hidro_risk_two || "0",
      alopEarthquake: underlyingCatDeductibles.alop_earthquake || null,
      showAlopLines: true,
      alopHidro: underlyingCatDeductibles.alop_hidro || null,
      // Fire & EC Deductibles (con validación)
      boundEngDeductibles: underlyingFireECDeductibles.map((u) => {
        return {
          id: u.id || Math.random(),
          underlyingFireText: u.underlying_fire_text || "",
          search: u.search || "",
          data: "",
          underlyingFireNumberSelect: u.underlying_fire_number_select || null,
          underlyingFireAplicaSelect: u.underlying_fire_aplica_select || null,
          underlyingFireValuesSelect: u.underlying_fire_values_select || null,
          underlyingFireAmount: u.underlying_fire_amount || "",
          underlyingFireValuesSelectTwo:
            u.underlying_fire_values_select_two || null,
          underlyingFireAmountTwo: u.underlying_fire_amount_two || "",
        };
      }),
      underlyingFire: [],
      // Opciones de moneda
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
      // Sublímites específicos de Engineering (con validación)
      boundSublimes: {
        sublimits1: sublime.catSublimes?.sublimits1 || 0,
        sublimits2: sublime.catSublimes?.sublimits2 || 0,
      },
      quotation: {
        exchangeRate: this.accountComplete?.deductibles?.exchangeRate || 1,
      },
      boundSublimitsEng: (sublime.allOtherSublimits || []).map((s) => {
        return {
          id: s.id || Math.random(),
          endosoSelect: s.endoso_select || null,
          endosoText: s.endoso_text || "",
          endosoUsd: s.endoso_usd || 0,
        };
      }),
      // Configuración específica de Engineering
      quotationType: 1, // Para Engineering siempre es 1
      // Estructura de condiciones técnicas específica para Engineering (con validación)
      technicalConditions: {
        deductibles: {
          underlyingCatDeductibles: underlyingCatDeductibles.id
            ? [underlyingCatDeductibles]
            : [
                {
                  id: 1,
                  location: "",
                  underlying_cat_select: null,
                  underlying_cat_aplica_select: null,
                  underlying_cat_values_select: null,
                  cover_b: "0",
                  underlying_cat_values_select_two: null,
                  cover_two_b: "0",
                  underlying_hidro_select: null,
                  underlying_hidro_aplica_select: null,
                  underlying_hidro_values_select: null,
                  hidro_risk: "0",
                  underlying_hidro_values_select_two: null,
                  hidro_risk_two: "0",
                  alop_earthquake: null,
                  alop_hidro: null,
                },
              ],
          underlyingFireEcDeductibles:
            underlyingFireECDeductibles.length> 0
              ? underlyingFireECDeductibles
              : [],
        },
        sublime: sublime.catSublimes?.id
          ? sublime
          : {
              catSublimes: {
                id: 1,
                sublimits1: 0,
                sublimits2: 0,
              },
              allOtherSublimits: [],
            },
      },
    };
  },
  async beforeMount() {
    // Validar que tenemos los datos necesarios
    if (!this.accountComplete) {
      console.error("accountComplete is required but not provided");
      return;
    }
    if (!this.accountComplete.technical_conditions) {
      console.warn(
        "technical_conditions not found in accountComplete, using default structure"
      );
    }
    try {
      this.clauseList = await PaymentService.getClauses();
      this.underlyingCat = (await Catalog.getUnderlyingCat()) || [];
      this.underlyingCatAplica = (await Catalog.getUnderlyingCatAplica()) || [];
      this.underlyingFireAplica =
        (await Catalog.getUnderlyingFireAplica()) || [];
      this.underlyingFire = (await Catalog.getUnderlyingFire()) || [];
    } catch (error) {
      console.error("Error loading catalogs:", error);
      // Inicializar arrays vacíos en caso de error
      this.underlyingCat = [];
      this.underlyingCatAplica = [];
      this.underlyingFireAplica = [];
      this.underlyingFire = [];
    }
  },
  computed: {
    validationFirstStep() {
      const showInfoEndorsement = this.showInfoEndorsement;
      const clause = Boolean(this.clause);
      const endorsementDateError = !this.endorsementDateError;
      const result = !(showInfoEndorsement & clause & endorsementDateError);
      return result;
    },
    cleanReport() {
      return this.endorsmentReporData &&
        Object.keys(this.endorsmentReporData).length> 0
        ? {
            endorsmentReporData: this.endorsmentReporData,
            cartera: this.cartera,
          }
        : {};
    },
  },
  watch: {
    e1: async function () {
      if (this.e1 === 1) {
        this.isEdited = {};
        this.buttonTitle = "Next";
        this.buttonTitleBack = "Cancel";
      }
      if (this.e1 === 2) {
        this.buttonTitle = "Next";
        this.buttonTitleBack = "Return";
        this.calcPremium();
      }
      if (this.e1 === 3) {
        this.buttonTitle = "Finalize";
        this.buttonTitleBack = "Return";
        const premiumOriginal = this.detailValues.find((el) => el.id === 1);
        const premiumUSD = this.detailValues.find((el) => el.id === 2);
        // Obteniendo los calculos de Net premium
        const tiv = this.accountComplete.tiv;
        const tivMovement = {
          allRisk: tiv.insurable.allRisk,
          alop: tiv.insurable.alop,
          allRiskRate: tiv.premium.allRiskRate,
          alopRate: tiv.premium.alopRate,
        };
        const dates = {
          effetiveDate: new Date(this.accountComplete.deductibles.inceptionDate)
            .toISOString()
            .substring(0, 10),
          expiryDate: new Date(this.accountComplete.deductibles.expiryDate)
            .toISOString()
            .substring(0, 10),
          endormenteffetiveDate: new Date(this.effectiveDate),
          movementEndDate: new Date(this.expiryDateReal),
        };
        const options = {
          isEdited: this.isEdited,
          dataEdited: {
            // totalPremium
            premiumAllRisk: this.totalPremium[0].premiumAllRisk,
            premiumAlop: this.totalPremium[0].premiumAlop,
            // premiumSlu
            sluAllRisk: this.totalPremium[0].sluAllRisk,
            sluAlop: this.totalPremium[0].sluAlop,
          },
        };
        const sluLine = this.accountComplete.tiv?.boundInsurableProp.sluLine;
        const resultOriginalCurenncy = await netPremiumInclusionRiskAutoCalcs(
          tivMovement,
          this.accountComplete.deductibles,
          sluLine,
          false,
          dates,
          options
        );
        const resultUSD = await netPremiumInclusionRiskAutoCalcs(
          tivMovement,
          this.accountComplete.deductibles,
          sluLine,
          true,
          dates,
          options
        );
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
    coverB(val) {
      if (Number(val)> Number(this.coverTwoB)) {
        this.coverTwoB = val;
      }
    },
    hidroRisk(val) {
      if (Number(val)> Number(this.hidroRiskTwo)) {
        this.hidroRiskTwo = val;
      }
    },
  },
  methods: {
    addFields() {
      this.buttonLoader = true;
      const id = this.boundEngCatDeductibles;
      this.boundEngDeductibles.push({
        id,
        underlyingFireText: "",
        search: "",
        data: "",
        underlyingFireNumberSelect: "",
        underlyingFireAplicaSelect: "",
        underlyingFireValuesSelect: "",
        underlyingFireAmount: "",
        underlyingFireValuesSelectTwo: "",
        underlyingFireAmountTwo: "",
      });
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
      const hasValue = (val) => (val != null ? val : "");
      const text = hasValue(itemText);
      const query = hasValue(queryText);
      return (
        text.toString().toLowerCase().indexOf(query.toString().toLowerCase())>
        -1
      );
    },
    toUsd(value) {
      const exchangeRate = this.accountComplete.deductibles.exchangeRate;
      return Decimal.div(value, exchangeRate).toNumber();
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
    calcPremium() {
      const tiv = this.accountComplete.tiv;
      this.detailValues[0]["premiumAllRisk"] = tiv.insurable.allRisk;
      this.detailValues[0]["premiumAlop"] = tiv.insurable.alop;
      this.detailValues[0]["premiumTotal"] = tiv.insurable.total;
      this.detailValues[1]["premiumAllRisk"] = tiv.insurable.allRiskUsd;
      this.detailValues[1]["premiumAlop"] = tiv.insurable.alopUsd;
      this.detailValues[1]["premiumTotal"] = tiv.insurable.totalUsd;
      const tivMovement = {
        allRisk: tiv.insurable.allRisk,
        alop: tiv.insurable.alop,
        allRiskRate: tiv.premium.allRiskRate,
        alopRate: tiv.premium.alopRate,
      };
      const dates = {
        effetiveDate: new Date(this.accountComplete.deductibles.inceptionDate)
          .toISOString()
          .substring(0, 10),
        expiryDate: new Date(this.accountComplete.deductibles.expiryDate)
          .toISOString()
          .substring(0, 10),
        endormenteffetiveDate: new Date(this.effectiveDate),
        movementEndDate: new Date(this.expiryDateReal),
      };
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
      totalPremium.sluAllRisk = this.calcTotalPremium.allRiskPremiumSlu();
      totalPremium.sluAlop = this.calcTotalPremium.alopPremiumSlu();
      totalPremium.sluTotal = this.calcTotalPremium.totalPremiumSlu();
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
      this.endorsementDocuments = Array.isArray(files) ? [...files] : [];
    },
    async submit() {
      this.e1 = 1;
      const OriginalUnderlyingCatDeductibles =
        this.accountComplete.technical_conditions?.deductibles?.underlyingCatDeductibles?.[0] ||
        this.technicalConditions.deductibles.underlyingCatDeductibles[0] ||
        {};
      // Obteniendo los inputs del usuario
      const technicalConditions = {
        deductibles: {
          underlyingCatDeductibles: [
            {
              ...OriginalUnderlyingCatDeductibles,
              location: this.location,
              underlying_cat_select: this.underlyingCatSelect,
              underlying_cat_aplica_select: this.underlyingCatAplicaSelect,
              underlying_cat_values_select: null,
              cover_b: this.coverB,
              underlying_cat_values_select_two: null,
              cover_two_b: this.coverTwoB,
              underlying_hidro_select: this.underlyingHidroSelect,
              underlying_hidro_aplica_select: this.underlyingHidroAplicaSelect,
              underlying_hidro_values_select: null,
              hidro_risk: this.hidroRisk,
              underlying_hidro_values_select_two: null,
              hidro_risk_two: this.hidroRiskTwo,
              alop_earthquake: this.alopEarthquake,
              alop_hidro: this.alopHidro,
            },
          ],
          underlyingFireEcDeductibles: this.boundEngDeductibles.map((u) => {
            return {
              id: u.id,
              underlying_fire_text: u.underlyingFireText,
              search: u.search,
              underlying_fire_number_select: u.underlyingFireNumberSelect,
              underlying_fire_aplica_select: u.underlyingFireAplicaSelect,
              underlying_fire_values_select: u.underlyingFireValuesSelect,
              underlying_fire_amount: u.underlyingFireAmount,
              underlying_fire_values_select_two:
                u.underlyingFireValuesSelectTwo,
              underlying_fire_amount_two: u.underlyingFireAmountTwo,
            };
          }),
        },
        sublime: {
          catSublimes: {
            sublimits1: this.boundSublimes.sublimits1,
            sublimits2: this.boundSublimes.sublimits2,
          },
          allOtherSublimits: this.boundSublimitsEng.map((s) => {
            return {
              id: s.id,
              endoso_select: s.endosoSelect,
              endoso_text: s.endosoText,
              endoso_usd: s.endosoUsd,
            };
          }),
        },
      };
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
      };
      // guardar la cuenta actualizada en BD
      const accountCompleteResponse =
        await AccountCompleteService.addAccountComplete(this.subscriptionId, {
          ...this.accountComplete,
          deductibles: this.accountComplete.deductibles,
          tiv: tivUpdate,
          netPremium: {
            originalValues: {
              netSluExcludingSurveyFeesTotal:
                this.accountComplete.net_premium.originalValues
                  .netSluExcludingSurveyFeesTotal,
            },
          },
          technicalConditions,
          cartera: {
            ...this.accountComplete.cartera,
            ...this.cartera,
            admitedPremium: this.admitedPremium,
          },
        });
      //guardar registro del endoso
      const endorsementResponse = await EndorsementService.addEndorsment({
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
      if (endorsementResponse?.id) {
        this.createdEndorsementId = endorsementResponse.id;
        if (this.endorsementDocuments.length) {
          await this.$nextTick();
          await this.$refs.endorsementDocs.uploadPendingFiles();
        }
      }
      await this.backToCreateEndorsement();
      this.createdEndorsementId = 0;
      this.endorsementDocuments = [];
    },
    endDateValidation(event, incomingDate) {
      if (
        Date.parse(incomingDate) <=
        Date.parse(this.accountComplete.deductibles.inceptionDate)
      ) {
        this.endorsementDateError = true;
      } else {
        this.endorsementDateError = false;
        // Llamar al método del padre para habilitar showInfoEndorsement
        if (this.changeDateEndorsement) {
          this.changeDateEndorsement(incomingDate);
        }
      }
    },
    premiumPaymentDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) <= Date.parse(this.currentMovementEndDate)) {
        this.premiumPaymentDateError = true;
      } else {
        this.premiumPaymentDateError = true;
      }
    },
    goNext(e1) {
      this.$refs.targetRef.scrollIntoView({ behavior: "smooth" });
      if (e1 == 1) {
        this.e1 = 2;
      } else if (e1 == 2) {
        this.e1 = 3;
      } else if (e1 == 3) {
        this.submit();
      }
    },
    goBack(e1) {
      this.$refs.targetRef.scrollIntoView({ behavior: "smooth" });
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
@import "~@/assets/style/AccordionStyle.less";
@import "~@/assets/style/Subscription/Bound.less";
.endorsement-title {
  font-weight: 800;
  font-size: 20px;
}
.endorsement-wrapper {
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
    border-radius: 5px;
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
  border-radius: 0px;
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
    border-radius: 5px;
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
  border-radius: 5px;
}
.technical-conditions-section {
  width: 100%;
  margin: 30px 0;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
}
.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #003d6d;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
</style>
