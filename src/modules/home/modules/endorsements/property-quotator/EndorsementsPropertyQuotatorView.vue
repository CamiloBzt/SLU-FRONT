<template>
  <div ref="targetTopCreateEndorsement">
    <div class="create-endorsement">
      <div class="catalog">
        <div class="catalog-select">
          <v-autocomplete
            label="Movement Type"
            v-model="movementsValue"
            :items="catalogEndorsements"
            item-value="id"
            item-text="type"
            :disabled="disabledSelect"
          />
        </div>

        <div class="button-cont">
          <v-btn
            rounded
            large
            color="#003D6D"
            class="btn"
            @click="createEndorsement()"
            :disabled="disabledSelect"
          >
            Create endorsement
          </v-btn>
        </div>
      </div>
    </div>

    <div v-if="showEndorsement" class="ditrtibution-container mt-5">
      <InclusionRisk
        v-if="endorsementType == 1"
        :backToCreateEndorsement="backToCreateEndorsement"
        :accountComplete="accountComplete"
        :changeDateEndorsement="changeDateEndorsement"
        :dateSaved="dateSaved"
        :showInfoEndorsement="showInfoEndorsement"
        :key="reloadEndorsementData"
      />
      <ExclusionRisk
        v-if="endorsementType == 2"
        :backToCreateEndorsement="backToCreateEndorsement"
        :accountComplete="accountComplete"
        :changeDateEndorsement="changeDateEndorsement"
        :dateSaved="dateSaved"
        :showInfoEndorsement="showInfoEndorsement"
        :key="reloadEndorsementData"
      />
      <Extension
        v-if="endorsementType == 3"
        :backToCreateEndorsement="backToCreateEndorsement"
        :accountComplete="accountComplete"
        :changeDateEndorsement="changeDateEndorsement"
        :dateSaved="dateSaved"
        :showInfoEndorsement="showInfoEndorsement"
        :key="reloadEndorsementData"
      />
      <!---DeductionsChange
        v-if="endorsementType == 4"
        :backToCreateEndorsement="backToCreateEndorsement"
        :accountComplete="accountComplete"
        :changeDateEndorsement="changeDateEndorsement"
        :dateSaved="dateSaved"
        :showInfoEndorsement="showInfoEndorsement"
        :key="reloadEndorsementData"
        :isFirstEndorsement="this.listEndorsement.length < 1"
        :listendorsement="this.listEndorsement"
      /--->
      <MovementWithoutPremium
        v-if="endorsementType == 5"
        :backToCreateEndorsement="backToCreateEndorsement"
        :accountComplete="accountComplete"
        :changeDateEndorsement="changeDateEndorsement"
        :dateSaved="dateSaved"
        :showInfoEndorsement="showInfoEndorsement"
        :key="reloadEndorsementData"
      />
      <!---ChangeOfShare
        v-if="endorsementType == 6"
        :backToCreateEndorsement="backToCreateEndorsement"
        :accountComplete="accountComplete"
        :changeDateEndorsement="changeDateEndorsement"
        :dateSaved="dateSaved"
        :showInfoEndorsement="showInfoEndorsement"
        :key="reloadEndorsementData"
      /--->
      <!---RateChange
        v-if="endorsementType == 7"
        :backToCreateEndorsement="backToCreateEndorsement"
        :accountComplete="accountComplete"
        :changeDateEndorsement="changeDateEndorsement"
        :dateSaved="dateSaved"
        :showInfoEndorsement="showInfoEndorsement"
        :key="reloadEndorsementData"
      /--->
      <ChangeOfPeriod
        v-if="endorsementType == 8"
        :backToCreateEndorsement="backToCreateEndorsement"
        :accountComplete="accountComplete"
        :changeDateEndorsement="changeDateEndorsement"
        :dateSaved="dateSaved"
        :showInfoEndorsement="showInfoEndorsement"
        :key="reloadEndorsementData"
        :isFirstEndorsement="this.listEndorsement.length < 1"
        :listendorsement="this.listEndorsement"
      />
      <ExtensionGPW
        v-if="endorsementType == 10"
        :backToCreateEndorsement="backToCreateEndorsement"
        :accountComplete="accountComplete"
        :changeDateEndorsement="changeDateEndorsement"
        :dateSaved="dateSaved"
        :showInfoEndorsement="showInfoEndorsement"
        :key="reloadEndorsementData"
        :selectedEndorsementId="selectedEndorsementId"
        :listEndorsement="listEndorsement"
      />
      <ChangeOfTechnicalConditions
        v-if="endorsementType == 11"
        :backToCreateEndorsement="backToCreateEndorsement"
        :accountComplete="accountComplete"
        :changeDateEndorsement="changeDateEndorsement"
        :dateSaved="dateSaved"
        :showInfoEndorsement="showInfoEndorsement"
        :key="reloadEndorsementData"
      />
      <Cancellation
        v-if="endorsementType == 12"
        :backToCreateEndorsement="backToCreateEndorsement"
        :accountComplete="accountComplete"
        :dateSaved="dateSaved"
        :key="reloadEndorsementData"
        :listEndorsement="this.listEndorsement"
      />
      <PmdAdjustment
        v-if="endorsementType == 13"
        :backToCreateEndorsement="backToCreateEndorsement"
        :accountComplete="accountComplete"
        :changeDateEndorsement="changeDateEndorsement"
        :dateSaved="dateSaved"
        :showInfoEndorsement="showInfoEndorsement"
        :key="reloadEndorsementData"
      />
      <!---BiAdjustments
        v-if="endorsementType == 14"
        :backToCreateEndorsement="backToCreateEndorsement"
        :accountComplete="accountComplete"
        :changeDateEndorsementAndShare="changeDateEndorsementAndShare"
        :dateSaved="dateSaved"
        :showInfoEndorsement="showInfoEndorsement"
        :key="reloadEndorsementData"
        :newShare="newShare"
        :newExchangeRate="newExchangeRate"
      /--->
      <InternalAdjustments
        v-if="endorsementType == 15"
        :backToCreateEndorsement="backToCreateEndorsement"
        :accountComplete="accountComplete"
        :changeDateEndorsement="changeDateEndorsement"
        :dateSaved="dateSaved"
        :showInfoEndorsement="showInfoEndorsement"
        :key="reloadEndorsementData"
      />
    </div>

    <div class="grid-cards" v-if="!endorsementHistory && !onCreatrEndorsement">
      <div
        class="card-item"
        v-for="(endorsement, index) in listEndorsement"
        :key="endorsement.id"
      >
        <v-card class="card-content pt-2 borertopcard">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-wrap text-h7 text-reinsurerText">
                Endorsement [{{ index + 1 }}]:
                {{ endorsement.EndorsementType.type }}
              </div>
              <v-list-item-subtitle>
                {{ endorsement.effective_date | formattedDate }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-btn
              class="mx-auto"
              width="13.7rem"
              outlined
              rounded
              text
              textbottom
              @click="backHistoryTableToId(endorsement.id)"
            >
              See endorsement
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>

    <div v-if="endorsementHistory">
      <div class="endorsement-title">
        {{
          listEndorsement.find((element) => element.id === idDinamyc)
            .EndorsementType.type
        }}
      </div>
      <div class="editAccount" v-if="accountComplete.reference">
        {{ accountComplete.reference }}
      </div>
    </div>

    <!-- Vista para el endoso 1, 2 y 3 -->
    <div v-if="endorsementHistory">
      <div
        v-if="
          listEndorsement.find((element) => element.id === idDinamyc)
            .EndorsementType.type ===
            'Increase insurable value/ inclusion risk' ||
          listEndorsement.find((element) => element.id === idDinamyc)
            .EndorsementType.type ===
            'Reduction of insurable value/ Risk Exclusion' ||
          listEndorsement.find((element) => element.id === idDinamyc)
            .EndorsementType.type === 'Extension'
        "
      >
        <EndorsementHistoryTable
          :clause="clause"
          :effectiveDate="effectiveDate"
          :premiumPaymentDate="premiumPaymentDate"
          :expeditionDate="expeditionDate"
          :detailValues="totalPremiumHistoryTable"
        />
        <AdmittedPremiumTableHistory :detailValues="totalPremium" />
      </div>
    </div>

    <!-- Vista para el endoso 4 "Deductions Change" -->
    <div v-if="endorsementHistory">
      <div
        v-if="
          listEndorsement.find((element) => element.id === idDinamyc)
            .EndorsementType.type === 'Deductions Change'
        "
      >
        <TableEndorsementDeductions
          :clause="clause"
          :detailValues="detailValues"
          :detailPremiumSlu="premiumSlu"
          :detailNetPremium="netPremium"
        />
      </div>
    </div>

    <div v-if="endorsementHistory">
      <div
        class="formatEndorsementHistoryTable overflow-auto"
        v-if="
          listEndorsement.find((element) => element.id === idDinamyc)
            .EndorsementType.type !== 'Movement without premium'
        "
      >
        <div class="inner-title">Endorsement Report</div>
        <div
          v-if="
            informationCard &&
            typeof informationCard === 'object' &&
            informationCard.report &&
            informationCard.id_endorsement_type === 8
          "
        >
          <ChangeOfPeriodReadOnly :data="changeOfPeriodReadOnlyData" />
        </div>
        <div
          v-else-if="
            informationCard &&
            typeof informationCard === 'object' &&
            informationCard.report &&
            informationCard.id_endorsement_type === 10
          "
        >
          <ExtensionGPWReadOnly :data="extensionGPWReadOnlyData" />
        </div>
        <div
          v-else-if="
            informationCard &&
            typeof informationCard === 'object' &&
            informationCard.report &&
            informationCard.id_endorsement_type === 11
          "
        >
          <ChangeOfTechnicalConditionsReadOnly
            :data="technicalConditionsReadOnlyData"
          />
        </div>
        <div
          v-else-if="
            informationCard &&
            typeof informationCard === 'object' &&
            informationCard.report &&
            informationCard.id_endorsement_type !== 8 &&
            informationCard.id_endorsement_type !== 10 &&
            informationCard.id_endorsement_type !== 11
          "
        >
          <EndorsementReportCompleteTable :report="cleanReport" />
        </div>
        <div
          class="files-submit flex justify-content-start align-items-start align-content-start"
          v-if="
            endorsementHistory &&
            informationCard &&
            informationCard.id_endorsement_type !== 8 &&
            informationCard.id_endorsement_type !== 10 &&
            informationCard.id_endorsement_type !== 11
          "
        >
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
      </div>
    </div>

    <!-- Vista para el endoso 5 "Movement without premium" -->
    <div v-if="endorsementHistory">
      <div
        v-if="
          listEndorsement.find((element) => element.id === idDinamyc)
            .EndorsementType.type === 'Movement without premium'
        "
      >
        <TableEndorsementMovement
          :description="description"
          :effectiveDate="effectiveDate"
          :endDate="endDate"
          :admittedPremiumEndorsement5="admittedPremiumEndorsement5"
        />
      </div>
    </div>

    <EndorsementDocuments
      v-if="endorsementHistory && idEndorsementDinamic"
      :idEndorsement="idEndorsementDinamic"
      :endorsementDocuments="endorsementDocuments"
      :reloadFiles="reloadFiles"
      :key="idEndorsementDinamic"
    />

    <!-- Boton return para la vista de endosos creados -->
    <div
      v-if="endorsementHistory"
      class="stepper-btn mb-7 d-flex justify-end align-center"
    >
      <v-btn
        rounded
        large
        text
        class="blue-btn mt"
        @click="ReturnFromEndorsement()"
      >
        Return
      </v-btn>
    </div>
  </div>
</template>

<script>
import router from "../../../../../router";
import BarNavGeneral from "@/components/BarNavGeneral";
import AppCloseAccount from "@/application/components/AppCloseAccount";
import InclusionRisk from "./components/InclusionRisk";
import ExclusionRisk from "./components/ExclusionRisk";
import Extension from "./components/Extension";
import DeductionsChange from "./components/DeductionsChange";
import MovementWithoutPremium from "./components/MovementWithoutPremium.vue";
import ChangeOfShare from "./components/ChangeOfShare.vue";
import ChangeOfPeriod from "./components/ChangeOfPeriod.vue";
import ExtensionGPW from "./components/ExtensionGPW.vue";
import PmdAdjustment from "./components/PmdAdjustment.vue";
import InternalAdjustments from "./components/InternalAdjustments.vue";
import RateChange from "./components/RateChange.vue";
import EndorsementDocuments from "../components/EndorsementDocuments.vue";
import EndorsementHistoryTable from "../components/EndorsementHistoryTable.vue";
import AdmittedPremiumTableHistory from "../components/AdmittedPremiumTableHistory.vue";
import AppFile from "../components/AppFile.vue";
import EndorsementReportCompleteTable from "./components/EndorsementReportCompleteTable.vue";
import ExtensionGPWReadOnly from "./components/ExtensionGPWReadOnly.vue";
import TableEndorsementMovement from "../components/TableEndorsementMovement.vue";
import TableEndorsementDeductions from "../components/TableEndorsementDeductions.vue";
import ChangeOfTechnicalConditions from "./components/ChangeOfTechnicalConditions.vue";
import Cancellation from "./components/Cancellation.vue";
import ChangeOfPeriodReadOnly from "./components/ChangeOfPeriodReadOnly.vue";
import ChangeOfTechnicalConditionsReadOnly from "./components/ChangeOfTechnicalConditionsReadOnly.vue";
// Services
import { BarNavData } from "./services/mock-bar-nav.service.js";
import { GetCloseAccount } from "./services/mock-get-close-account.service";
import AccountCompleteService from "@/modules/home/services/account-complete.service";
import EndorsementService from "../services/endorsement.service";
import BiAdjustments from "./components/BiAdjustments";
import moment from "moment";
import { mapActions } from "vuex";
export default {
  name: "EndorsementsView",
  components: {
    AppFile,
    EndorsementReportCompleteTable,
    ExtensionGPWReadOnly,
    AppCloseAccount,
    BarNavGeneral,
    InclusionRisk,
    ExclusionRisk,
    Extension,
    DeductionsChange,
    MovementWithoutPremium,
    ChangeOfShare,
    ChangeOfPeriod,
    BiAdjustments,
    InternalAdjustments,
    RateChange,
    ExtensionGPW,
    PmdAdjustment,
    EndorsementDocuments,
    EndorsementHistoryTable,
    AdmittedPremiumTableHistory,
    TableEndorsementMovement,
    TableEndorsementDeductions,
    ChangeOfTechnicalConditions,
    Cancellation,
    ChangeOfPeriodReadOnly,
    ChangeOfTechnicalConditionsReadOnly,
  },
  props: {
    type: { type: String, default: "Inclusion Risk" },
    // backToCreateEndorsement: {
    //   type: Function,
    // },
    // accountComplete: { type: Object },
  },
  data() {
    return {
      newShare: "",
      newExchangeRate: "",
      selectedEndorsementId: 0,
      onCreatrEndorsement: false,
      idEndorsementDinamic: null,
      premiumPaymentDate: "11/11/23",
      expeditionDate: "11/11/23",
      effectiveDate: "11/11/23",
      endDate: "11/11/24",
      admittedPremiumEndorsement5: "$10,900",
      description: "Este es un gran ejemplo para hacer pruebas",
      clause: "",
      idDinamyc: 0,
      dateSaved: "",
      showInfoEndorsement: false,
      reloadEndorsementData: 0,
      accountComplete: {},
      catalogEndorsements: [],
      movementsValue: "",
      disabledSelect: false,
      showEndorsement: false,
      loading: false,
      endorsements: [],
      endorsementType: "",
      BarNavData: [],
      CloseAccountData: [],
      insurableRisk: {},
      subscriptionId: this.$route.params.id,
      listEndorsement: [],
      informationCard: "",
      endorsementHistory: false,
      endorsementDocuments: [],
      totalPremium: [
        {
          id: 1,
          name: "Original Currency",
          premiumDamage: 0,
          premiumBi: 0,
          premiumStocks: 0,
          premiumTotal: 0,
          sluDamage: 0,
          sluBi: 0,
          sluStocks: 0,
          sluTotal: 0,
        },
        {
          id: 2,
          name: "USD",
          premiumDamage: 0,
          premiumBi: 0,
          premiumStocks: 0,
          premiumTotal: 0,
          sluDamage: 0,
          sluBi: 0,
          sluStocks: 0,
          sluTotal: 0,
        },
      ],
      totalPremiumHistoryTable: [
        {
          id: 1,
          name: "Original Currency",
          premiumDamage: 0,
          premiumBi: 0,
          premiumStocks: 0,
          premiumTotal: 0,
          sluDamage: 0,
          sluBi: 0,
          sluStocks: 0,
          sluTotal: 0,
        },
        {
          id: 2,
          name: "USD",
          premiumDamage: 0,
          premiumBi: 0,
          premiumStocks: 0,
          premiumTotal: 0,
          sluDamage: 0,
          sluBi: 0,
          sluStocks: 0,
          sluTotal: 0,
        },
      ],
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
      detailValues: [
        {
          id: 1,
          name1: "Original Currency",
          name2: "USD",
          premiumDamage: 0,
          premiumBi: 0,
          premiumStocks: 0,
          premiumTotal: 0,
          premiumDamage2: 0,
          premiumBi2: 0,
          premiumStocks2: 0,
          premiumTotal2: 0,
        },
        {
          id: 2,
          damage: "Damage",
          bi: "Bi",
          stocks: "Stocks",
          total: "Total",
        },
      ],
      premiumSlu: [
        {
          id: 1,
          name1: "Original Currency",
          name2: "USD",
          premiumDamage: 0,
          premiumBi: 0,
          premiumStocks: 0,
          premiumTotal: 0,
          premiumDamage2: 0,
          premiumBi2: 0,
          premiumStocks2: 0,
          premiumTotal2: 0,
        },
        {
          id: 2,
          damage: "Damage",
          bi: "Bi",
          stocks: "Stocks",
          total: "Total",
        },
      ],
      netPremium: [
        {
          id: 1,
          name1: "Original Currency",
          name2: "USD",
          premiumDamage: 0,
          premiumBi: 0,
          premiumStocks: 0,
          premiumTotal: 0,
          premiumDamage2: 0,
          premiumBi2: 0,
          premiumStocks2: 0,
          premiumTotal2: 0,
        },
        {
          id: 2,
          damage: "Damage",
          bi: "Bi",
          stocks: "Stocks",
          total: "Total",
        },
      ],
      errorInReport: false,
    };
  },

  methods: {
    ...mapActions(["saveEndorsmentType"]),
    async reloadFiles() {
      this.informationCard = await EndorsementService.getEndorsementById(
        this.idDinamyc
      );
      this.endorsementDocuments = this.informationCard.EndorsementDocuments;
    },
    ReturnFromEndorsement() {
      this.endorsementHistory = false;
      this.disabledSelect = false;
      this.showEndorsement = false;
    },
    async createEndorsement() {
      if (this.movementsValue != "" && this.accountComplete) {
        this.onCreatrEndorsement = true;
        this.disabledSelect = true;
        this.showEndorsement = true;
        this.endorsementType = this.movementsValue;
        await this.saveEndorsmentType(this.movementsValue);
      } else if (!this.accountComplete) {
        console.warn(
          "Cannot create endorsement: No account complete data available"
        );
      }
    },
    async backToCreateEndorsement() {
      this.$refs.targetTopCreateEndorsement.scrollIntoView({
        behavior: "smooth",
      });
      this.onCreatrEndorsement = false;
      this.movementsValue = "";
      this.disabledSelect = false;
      this.showEndorsement = false;
      this.loading = false;
      this.endorsements = [];
      this.endorsementType = "";
      this.listEndorsement =
        await EndorsementService.getEndorsementsBySubscriptionId(
          this.subscriptionId
        );
      this.ReturnFromEndorsement();
    },
    async changeDateEndorsement(selectedDate) {
      this.dateSaved = selectedDate;
      this.showInfoEndorsement = false;
      this.accountComplete =
        await AccountCompleteService.getAccountCompleteByIdSubscriptionDate(
          this.subscriptionId,
          selectedDate
        );
      if (!this.accountComplete) {
        this.accountComplete =
          await AccountCompleteService.getLastAccountCompleteByIdSubscription(
            this.subscriptionId
          );
      }
      this.showInfoEndorsement = true;
      this.reloadEndorsementData = this.reloadEndorsementData + 1;
    },
    async changeDateEndorsementAndShare(
      selectedDate,
      shareModified,
      exchangeRateModified
    ) {
      this.newShare = shareModified;
      this.newExchangeRate = exchangeRateModified;
      this.dateSaved = selectedDate;
      this.showInfoEndorsement = false;
      this.accountComplete =
        await AccountCompleteService.getAccountCompleteByIdSubscriptionDate(
          this.subscriptionId,
          selectedDate
        );
      if (!this.accountComplete) {
        this.accountComplete =
          await AccountCompleteService.getLastAccountCompleteByIdSubscription(
            this.subscriptionId
          );
      }
      this.showInfoEndorsement = true;
      this.reloadEndorsementData = this.reloadEndorsementData + 1;
    },
    closeAccountById({ idOptionSelected }) {},

    async backHistoryTableToId(id) {
      this.selectedEndorsement = id;
      this.disabledSelect = true;
      this.endorsementHistory = true;
      this.idDinamyc = id;
      this.informationCard = await EndorsementService.getEndorsementById(id);

      if (!this.informationCard) {
        console.warn("No existe id:", id);
        return;
      }

      if (!this.informationCard.report) {
        console.warn("El endoso no tiene un 'report' definido.");
        return;
      }

      if (!this.informationCard.report.cartera) {
        console.warn("El objeto 'report' no tiene 'cartera'.");
        return;
      }

      // Verificar que accountComplete esté disponible
      if (!this.accountComplete) {
        console.warn("No accountComplete available");
        return;
      }

      // Si todo está bien, ahora sí accedemos:
      this.clause = this.informationCard.report.cartera.clausula;

      this.premiumPaymentDate =
        this.informationCard.report.cartera.premiumPaymentDate;

      this.expeditionDate = this.informationCard.created_at;

      this.effectiveDate = this.informationCard.effective_date;

      this.endorsementDocuments = this.informationCard.EndorsementDocuments;

      this.idEndorsementDinamic = this.informationCard.id;

      /**RECUPERANDO INFO PARA ENDOSO 5 */
      if (
        this.listEndorsement.find((element) => element.id === this.idDinamyc)
          .EndorsementType.type === "Movement without premium"
      ) {
        this.description = this.informationCard.report.cartera.description;
        this.effectiveDate = this.informationCard.report.cartera.effectiveDate;
        (this.endDate = new Date(this.informationCard.report.cartera.endDate)
          .toISOString()
          .substr(0, 10)),
          (this.admittedPremiumEndorsement5 = "");
      }

      if (!this.informationCard.report.endorsmentReporData) {
        this.value = this.informationCard.report.cartera.clausula;
        this.endorsementDocuments = this.informationCard.EndorsementDocuments;
        this.endorsementHistory = true;
      } else {
        this.endorsementDocuments = this.informationCard.EndorsementDocuments;
        if (this.informationCard.id_endorsement_type == 3) {
          // Si es Extension (endorsement type 3), usamos totalValues
          this.totalPremiumHistoryTable[0].premiumDamage =
            this.informationCard.report.endorsmentReporData.totalValues.damage;
          this.totalPremiumHistoryTable[0].premiumBi =
            this.informationCard.report.endorsmentReporData.totalValues.bi;
          this.totalPremiumHistoryTable[0].premiumStocks =
            this.informationCard.report.endorsmentReporData.totalValues.stocks;
          this.totalPremiumHistoryTable[0].premiumTotal =
            this.informationCard.report.endorsmentReporData.totalValues.total;

          this.totalPremiumHistoryTable[1].premiumDamage =
            this.informationCard.report.endorsmentReporData.totalValues.damageUsd;
          this.totalPremiumHistoryTable[1].premiumBi =
            this.informationCard.report.endorsmentReporData.totalValues.biUsd;
          this.totalPremiumHistoryTable[1].premiumStocks =
            this.informationCard.report.endorsmentReporData.totalValues.stocksUsd;
          this.totalPremiumHistoryTable[1].premiumTotal =
            this.informationCard.report.endorsmentReporData.totalValues.totalUsd;
        } else {
          // Si no es tipo 3, se usa el bloque actual con movementValues
          this.totalPremiumHistoryTable[0].premiumDamage =
            this.informationCard.report.endorsmentReporData.movementValues.damage;
          this.totalPremiumHistoryTable[0].premiumBi =
            this.informationCard.report.endorsmentReporData.movementValues.bi;
          this.totalPremiumHistoryTable[0].premiumStocks =
            this.informationCard.report.endorsmentReporData.movementValues.stocks;
          this.totalPremiumHistoryTable[0].premiumTotal =
            this.informationCard.report.endorsmentReporData.movementValues.total;

          this.totalPremiumHistoryTable[1].premiumDamage =
            this.informationCard.report.endorsmentReporData.movementValues.damageUsd;
          this.totalPremiumHistoryTable[1].premiumBi =
            this.informationCard.report.endorsmentReporData.movementValues.biUsd;
          this.totalPremiumHistoryTable[1].premiumStocks =
            this.informationCard.report.endorsmentReporData.movementValues.stocksUsd;
          this.totalPremiumHistoryTable[1].premiumTotal =
            this.informationCard.report.endorsmentReporData.movementValues.totalUsd;
        }

        // Segunda Tabla
        this.totalPremium[0].premiumDamage =
          this.informationCard.report.endorsmentReporData.premium.propertyDamage;
        this.totalPremium[0].premiumBi =
          this.informationCard.report.endorsmentReporData.premium.businessInterruption;
        this.totalPremium[0].premiumStocks =
          this.informationCard.report.endorsmentReporData.premium.stock;
        this.totalPremium[0].premiumTotal =
          this.informationCard.report.endorsmentReporData.premium.total;
        this.totalPremium[0].sluDamage =
          this.informationCard.report.endorsmentReporData.netPremium.damageSluShare;
        this.totalPremium[0].sluBi =
          this.informationCard.report.endorsmentReporData.netPremium.biSluShare;
        this.totalPremium[0].sluStocks =
          this.informationCard.report.endorsmentReporData.netPremium.stocksSluShare;
        this.totalPremium[0].sluTotal =
          this.informationCard.report.endorsmentReporData.netPremium.sluShareTotal;

        this.totalPremium[1].premiumDamage =
          this.informationCard.report.endorsmentReporData.premium.propertyDamageUsd;
        this.totalPremium[1].premiumBi =
          this.informationCard.report.endorsmentReporData.premium.businessInterruptionUsd;
        this.totalPremium[1].premiumStocks =
          this.informationCard.report.endorsmentReporData.premium.stockUsd;
        this.totalPremium[1].premiumTotal =
          this.informationCard.report.endorsmentReporData.premium.totalUsd;
        this.totalPremium[1].sluDamage =
          this.informationCard.report.endorsmentReporData.netPremiumUSD.damageSluShare;
        this.totalPremium[1].sluBi =
          this.informationCard.report.endorsmentReporData.netPremiumUSD.biSluShare;
        this.totalPremium[1].sluStocks =
          this.informationCard.report.endorsmentReporData.netPremiumUSD.stocksSluShare;
        this.totalPremium[1].sluTotal =
          this.informationCard.report.endorsmentReporData.netPremiumUSD.sluShareTotal;
      }

      // Invoca el  servicio para generar el excel
      let fileLink = {};
      let file = {};
      try {
        fileLink = await EndorsementService.getEndorsmentReport({
          subscriptionId: this.subscriptionId,
          endorsmentType: this.informationCard.id_endorsement_type,
          endorsmentReporData: this.informationCard.report.endorsmentReporData,
        });

        file = this.files.find((file) => file.fileId === 1);

        if (!fileLink) {
          file.error = true;
        } else {
          file.fileDownloadLink = fileLink;
          file.loaded = true;
          file.loading = false;
        }
      } catch (error) {
        file.loaded = true;
        this.errorInReport = true;
      }
    },
    getClauseName(id) {
      const clause = this.catalogEndorsements.find((c) => c.id === id);
      return clause ? clause.clause : "";
    },
  },
  filters: {
    formattedDate(date) {
      return moment(date).format("YYYY/MM/DD");
    },
  },
  async beforeMount() {
    this.BarNavData = await BarNavData();
    this.CloseAccountData = await GetCloseAccount();
  },

  async mounted() {
    try {
      this.catalogEndorsements = await EndorsementService.getEndorsementType();
      this.accountComplete =
        await AccountCompleteService.getLastAccountCompleteByIdSubscription(
          this.subscriptionId
        );
      this.listEndorsement =
        await EndorsementService.getEndorsementsBySubscriptionId(
          this.subscriptionId
        );
      console.log("listEndorsement =>", this.listEndorsement);

      if (!this.accountComplete) {
        console.warn(
          "No account complete found for subscription:",
          this.subscriptionId
        );
        router.back();
        return;
      }

      // Verificar que accountComplete tenga la estructura necesaria antes de acceder
      if (this.accountComplete?.tiv?.boundInsurableProp?.sluLine) {
        this.newShare =
          this.accountComplete.tiv.boundInsurableProp.sluLine.toString();
      } else {
        this.newShare = "0";
      }

      if (this.accountComplete?.deductibles?.exchangeRate) {
        this.newExchangeRate =
          this.accountComplete.deductibles.exchangeRate.toString();
      } else {
        this.newExchangeRate = "1";
      }

      //if (!this.accountComplete.reference.includes("PRO")) router.back();
    } catch (error) {
      console.error("Error loading endorsement data:", error);
      router.back();
    }
  },
  computed: {
    cleanReport() {
      return this.informationCard && this.informationCard.report
        ? Object.assign({}, this.informationCard.report)
        : {};
    },
    changeOfPeriodReadOnlyData() {
      const info = this.informationCard;
      const report = info?.report?.endorsmentReporData || {};

      const formatDate = (dateStr) =>
        dateStr ? new Date(dateStr).toLocaleDateString("en-US") : "";

      const calculateDays = (start, end) => {
        if (!start || !end) return 0;
        const startDate = new Date(start);
        const endDate = new Date(end);
        return Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
      };

      // Obtener fechas del endorsement
      const currentDeductibles = this.accountComplete?.deductibles || {};
      const newDeductibles = report?.deductibles || {};

      return {
        endorsementEffectiveDate: formatDate(info.effective_date),

        // Current period information
        currentInceptionDate: formatDate(currentDeductibles.inceptionDate),
        currentExpiryDate: formatDate(currentDeductibles.expiryDate),
        currentPolicyDays: calculateDays(
          currentDeductibles.inceptionDate,
          currentDeductibles.expiryDate
        ),

        // New period information
        newInceptionDate: formatDate(newDeductibles.inceptionDate),
        newExpiryDate: formatDate(newDeductibles.expiryDate),
        newPolicyDays: calculateDays(
          newDeductibles.inceptionDate,
          newDeductibles.expiryDate
        ),

        // Additional information
        clause: report?.cartera?.clausula || "",
        premiumPaymentDate: formatDate(report?.cartera?.premiumPaymentDate),

        // Premium calculations (estas ya están en el endorsement guardado)
        originalValues: {
          lastInformation: {
            totalPremiumMovement:
              report?.movementValues?.lastPremiumMovement || 0,
            PremiumSlu: report?.netPremium?.lastPremiumSlu || 0,
            netPremium: report?.netPremium?.lastNetPremium || 0,
            total: report?.totals?.lastTotal || 0,
          },
          newInformation: {
            totalPremiumMovement:
              report?.movementValues?.newPremiumMovement || 0,
            PremiumSlu: report?.netPremium?.sluShareTotal || 0,
            netPremium: report?.netPremium?.netTotal || 0,
            total: report?.totals?.newTotal || 0,
          },
        },

        usdValues: {
          lastInformation: {
            totalPremiumMovement:
              report?.movementValues?.lastPremiumMovementUsd || 0,
            PremiumSlu: report?.netPremiumUSD?.lastPremiumSlu || 0,
            netPremium: report?.netPremiumUSD?.lastNetPremium || 0,
            total: report?.totals?.lastTotalUsd || 0,
          },
          newInformation: {
            totalPremiumMovement:
              report?.movementValues?.newPremiumMovementUsd || 0,
            PremiumSlu: report?.netPremiumUSD?.sluShareTotal || 0,
            netPremium: report?.netPremiumUSD?.netTotal || 0,
            total: report?.totals?.newTotalUsd || 0,
          },
        },
      };
    },
    extensionGPWReadOnlyData() {
      const info = this.informationCard;
      const report = info?.report?.endorsmentReporData || {};
      const additionalInfo = report?.additionalInfo || {};

      const formatDate = (dateStr) =>
        dateStr ? new Date(dateStr).toISOString().substr(0, 10) : "";

      const daysDiff = (start, end) => {
        const s = new Date(start);
        const e = new Date(end);
        return Math.floor((e - s) / (1000 * 60 * 60 * 24));
      };

      return {
        endorsementEffectiveDate: formatDate(info.effective_date),
        expiryDate: formatDate(report?.deductibles?.expiryDate),
        days: daysDiff(info.effective_date, report?.deductibles?.expiryDate),

        installments:
          additionalInfo.paymentsWarranty?.map((item) => ({
            id: item.id,
            installment: item.installment,
            percent: item.percent,
            date: formatDate(item.date),
            idClause: item.idClause,
            days_of_prior_notice: item.days_of_prior_notice,
            showCalendar: false,
          })) || [],

        reason: additionalInfo.detailDescription || "",
        premiumPaymentDate: formatDate(report?.cartera?.premiumPaymentDate),
        additionalClause: report?.cartera?.clausula || report?.clause,
      };
    },
    technicalConditionsReadOnlyData() {
      const info = this.informationCard;
      const report = info?.report?.endorsmentReporData || {};

      const formatDate = (dateStr) =>
        dateStr ? new Date(dateStr).toLocaleDateString("en-US") : "";

      const calculateDays = (start, end) => {
        if (!start || !end) return 0;
        const startDate = new Date(start);
        const endDate = new Date(end);
        return Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
      };

      return {
        endorsementEffectiveDate: formatDate(info.effective_date),
        expiryDate: formatDate(this.accountComplete?.deductibles?.expiryDate),
        days: calculateDays(
          info.effective_date,
          this.accountComplete?.deductibles?.expiryDate
        ),

        // Technical conditions changes - you may need to adjust this based on your data structure
        technicalConditionsChanges: {
          deductibles: report?.technicalConditions?.deductibles || [],
          sublimits: report?.technicalConditions?.sublime || [],
        },

        // Additional information
        clause: report?.cartera?.clausula || "",
        premiumPaymentDate: formatDate(report?.cartera?.premiumPaymentDate),

        // Premium calculations
        originalValues: {
          totalPremiumMovement:
            report?.movementValues?.totalPremiumMovement || 0,
          premiumSlu: report?.netPremium?.sluShareTotal || 0,
          netPremium: report?.netPremium?.netTotal || 0,
          total: report?.premium?.total || 0,
        },

        usdValues: {
          totalPremiumMovement:
            report?.movementValues?.totalPremiumMovementUsd || 0,
          premiumSlu: report?.netPremiumUSD?.sluShareTotal || 0,
          netPremium: report?.netPremiumUSD?.netTotal || 0,
          total: report?.premium?.totalUsd || 0,
        },
      };
    },
  },
};
</script>

<style lang="less" scoped>
.ditrtibution-container {
  width: 100%;
  height: auto;

  @media (max-width: 650px) {
    overflow-x: hidden;
  }
}

.create-endorsement {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;

  .catalog {
    width: 100%;
    display: flex;

    .catalog-select {
      width: 25%;
    }
  }

  .button-cont {
    margin-left: 20px;
    margin-top: 20;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .btn {
      border-radius: 5px;
      color: white;
      width: 200px;
      height: 35px;
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

.editAccount {
  width: auto;
  color: #f59607;
  font-weight: 600;
  font-size: 19px;
}

.endorsement-title {
  font-weight: 800;
  font-size: 20px;
}

.color_endorsement {
  background-color: #183d6d;
}

.cards_endorsement {
  display: flex;
  flex-wrap: wrap;
  margin-left: -8px;
  margin-right: -8px;
}

.endorsement-card {
  width: 25%;
  padding: 0 8px; /* compensa el margin negativo del contenedor */
  box-sizing: border-box;
  margin-bottom: 16px;
}

.fill-card {
  height: 12.5rem;
  width: 100%;
}

.margin_cards {
  margin-bottom: 1rem;
}

.inner-title {
  width: 100%;
  font-size: 20px;
  font-weight: 800;
  margin: 15px 0;
}

.formatEndorsementHistoryTable {
  width: 100%;
  height: auto;
  border-radius: 5px;
  background: white;
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  padding: 0 20px;
  padding-bottom: 2rem;
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
.mt {
  margin-top: 30px;
}

.v-list--three-line .v-list-item,
.v-list-item--three-line {
  min-height: 135px;
}

.cards-reinsurer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.card-reinsurer {
  width: calc(25% - 10px);
  height: 12.5rem;
}
.grid-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 4 columnas
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
}

.card-item {
  width: 100%;
}

.card-content {
  height: 12.5rem;
}
.text-reinsurerText {
  font-weight: 600;
}
</style>
