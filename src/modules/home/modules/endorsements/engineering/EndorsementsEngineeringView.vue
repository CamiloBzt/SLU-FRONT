<template>
  <div>
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

    <div class="grid-cards" v-if="!endorsementHistory && !onCreatrEndorsement">
      <div
        class="card-item"
        v-for="(endorsement, index) in listEndorsement"
        :key="endorsement.id"
      >
        <v-card class="card-content pt-2 borertopcard">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-wrap text-h7">
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
            .EndorsementType.type === 'Extension' ||
          listEndorsement.find((element) => element.id === idDinamyc)
            .EndorsementType.type === 'change of technical conditions'
        "
      >
        <EndorsementHistoryTableEngineering
          :clause="value"
          :detailValues="totalPremiumHistoryTable"
          :effectiveDate="effectiveDate"
          :premiumPaymentDate="premiumPaymentDate"
          :expeditionDate="expeditionDate"
        />
        <AdmittedPremiumTableEngineering
          :detailValues="totalPremium"
          :exchangeRate="accountComplete.deductibles.exchangeRate"
        />
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
        <TableEndorsementDeductionsEngineeringVue
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

        <!-- Extension GPW -->
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
        <!-- Change of Technical Conditions -->
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
        <!-- Otros tipos de endorsement -->
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
        :insurableRisk="insurableRisk"
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
      <DeductionsChange
        v-if="endorsementType == 4"
        :backToCreateEndorsement="backToCreateEndorsement"
        :accountComplete="accountComplete"
        :changeDateEndorsement="changeDateEndorsement"
        :dateSaved="dateSaved"
        :showInfoEndorsement="showInfoEndorsement"
        :key="reloadEndorsementData"
      />
      <!-- <DeductionsChangeView v-if="endorsementType == 4"/> -->
      <MovementWithoutPremium
        v-if="endorsementType == 5"
        :backToCreateEndorsement="backToCreateEndorsement"
        :accountComplete="accountComplete"
        :changeDateEndorsement="changeDateEndorsement"
        :dateSaved="dateSaved"
        :showInfoEndorsement="showInfoEndorsement"
        :key="reloadEndorsementData"
      />
      <ChangeOfShare
        v-if="endorsementType == 6"
        :backToCreateEndorsement="backToCreateEndorsement"
        :accountComplete="accountComplete"
        :changeDateEndorsement="changeDateEndorsement"
        :dateSaved="dateSaved"
        :showInfoEndorsement="showInfoEndorsement"
        :key="reloadEndorsementData"
      />
      <ChangeOfPeriod
        v-if="endorsementType == 8"
        :backToCreateEndorsement="backToCreateEndorsement"
        :accountComplete="accountComplete"
        :changeDateEndorsement="changeDateEndorsement"
        :dateSaved="dateSaved"
        :showInfoEndorsement="showInfoEndorsement"
        :key="reloadEndorsementData"
      />
      <ConstructionWorkStoppage
        :backToCreateEndorsement="backToCreateEndorsement"
        v-if="endorsementType == 9"
        :accountComplete="accountComplete"
        :changeDateEndorsement="changeDateEndorsement"
        :dateSaved="dateSaved"
        :showInfoEndorsement="showInfoEndorsement"
        :key="reloadEndorsementData"
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
      <PmdAdjustment
        v-if="endorsementType == 13"
        :backToCreateEndorsement="backToCreateEndorsement"
        :accountComplete="accountComplete"
        :changeDateEndorsement="changeDateEndorsement"
        :dateSaved="dateSaved"
        :showInfoEndorsement="showInfoEndorsement"
        :key="reloadEndorsementData"
      />
      <InternalAdjustmentsEngineering
        v-if="endorsementType == 15"
        :backToCreateEndorsement="backToCreateEndorsement"
        :accountComplete="accountComplete"
        :changeDateEndorsement="changeDateEndorsement"
        :dateSaved="dateSaved"
        :showInfoEndorsement="showInfoEndorsement"
        :key="reloadEndorsementData"
      />
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
import ExtensionGPW from "./components/ExtensionGPW";
import DeductionsChange from "./components/DeductionsChange";
import MovementWithoutPremium from "./components/MovementWithoutPremium.vue";
import ChangeOfShare from "./components/ChangeOfShare.vue";
import ChangeOfPeriod from "./components/ChangeOfPeriod.vue";
import DeductionsChangeView from "./modules/deductions-change/detail/DetailView.vue";
import ConstructionWorkStoppage from "./components/ConstructionWorkStoppage.vue";
import PmdAdjustment from "./components/PmdAdjustment.vue";
import EndorsementDocuments from "../components/EndorsementDocuments.vue";
import EndorsementHistoryTableEngineering from "../components/EndorsementHistoryTableEngineering.vue";
import AdmittedPremiumTableEngineering from "../components/AdmittedPremiumTableEngineering.vue";
import AppFile from "../components/AppFile.vue";
import TableEndorsementMovement from "../components/TableEndorsementMovement.vue";
import ChangeOfTechnicalConditions from "./components/ChangeOfTechnicalConditions.vue";
import InternalAdjustmentsEngineering from "./components/InternalAdjustmentsEngineering.vue";
import TableEndorsementDeductionsEngineeringVue from "../components/TableEndorsementDeductionsEngineering.vue";
import EndorsementReportCompleteTable from "./components/EndorsementReportCompleteTable.vue";
import ExtensionGPWReadOnly from "../property-quotator/components/ExtensionGPWReadOnly.vue";
import ChangeOfPeriodReadOnly from "../property-quotator/components/ChangeOfPeriodReadOnly.vue";
import ChangeOfTechnicalConditionsReadOnly from "../property-quotator/components/ChangeOfTechnicalConditionsReadOnly.vue";
// Services
import { BarNavData } from "./services/mock-bar-nav.service.js";
import { GetCloseAccount } from "./services/mock-get-close-account.service";
import AccountCompleteService from "@/modules/home/services/account-complete.service";
import EndorsementService from "../services/endorsement.service";
import moment from "moment";
import { mapActions } from "vuex";

export default {
  name: "EndorsementsView",
  components: {
    AppCloseAccount,
    BarNavGeneral,
    InclusionRisk,
    ExclusionRisk,
    Extension,
    ExtensionGPW,
    DeductionsChange,
    MovementWithoutPremium,
    ChangeOfShare,
    ChangeOfPeriod,
    DeductionsChangeView,
    ConstructionWorkStoppage,
    PmdAdjustment,
    EndorsementDocuments,
    EndorsementHistoryTableEngineering,
    AdmittedPremiumTableEngineering,
    AppFile,
    ChangeOfTechnicalConditions,
    InternalAdjustmentsEngineering,
    TableEndorsementMovement,
    TableEndorsementDeductionsEngineeringVue,
    EndorsementReportCompleteTable,
    ExtensionGPWReadOnly,
    ChangeOfPeriodReadOnly,
    ChangeOfTechnicalConditionsReadOnly,
  },
  props: {
    type: { type: String, default: "Inclusion Risk" },
    // backToCreateEndorsement: {
    // type: Function,
    // },
    // accountComplete: { type: Object },
  },
  data() {
    return {
      selectedEndorsementId: 0,
      onCreatrEndorsement: false,
      idEndorsementDinamic: null,
      value: "",
      effectiveDate: "11/11/23",
      premiumPaymentDate: "11/11/23",
      expeditionDate: "11/11/23",
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
      titleCard: "",
      formatEndorsement5: 0,
      endorsementHistory: false,
      endorsementDocuments: [],
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
      totalPremiumHistoryTable: [
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
          premiumAllRisk: 0,
          premiumAlop: 0,
          premiumTotal: 0,
          premiumAllRisk2: 0,
          premiumAlop2: 0,
          premiumTotal2: 0,
        },
        {
          id: 2,
          allRisk: "All Risk",
          alop: "ALOP",
          total: "Total",
        },
      ],
      premiumSlu: [
        {
          id: 1,
          name1: "Original Currency",
          name2: "USD",
          premiumAllRisk: 0,
          premiumAlop: 0,
          premiumTotal: 0,
          premiumAllRisk2: 0,
          premiumAlop2: 0,
          premiumTotal2: 0,
        },
        {
          id: 2,
          allRisk: "All Risk",
          alop: "ALOP",
          total: "Total",
        },
      ],
      netPremium: [
        {
          id: 1,
          name1: "Original Currency",
          name2: "USD",
          premiumAllRisk: 0,
          premiumAlop: 0,
          premiumTotal: 0,
          premiumAllRisk2: 0,
          premiumAlop2: 0,
          premiumTotal2: 0,
        },
        {
          id: 2,
          allRisk: "All Risk",
          alop: "ALOP",
          total: "Total",
        },
      ],
    };
  },
  computed: {
    cleanReport() {
      return Object.assign({}, this.informationCard.report);
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

        // Installments de Extension GPW para ingeniería
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

        // Premium calculations para ingeniería (AllRisk/ALOP)
        originalValues: {
          lastInformation: {
            totalPremiumMovement:
              (report?.movementValues?.allRisk || 0) +
              (report?.movementValues?.alop || 0),
            PremiumSlu: report?.netPremium?.sluShareTotal || 0,
            netPremium: report?.netPremium?.netTotal || 0,
            total: report?.premium?.totalInsured || 0,
          },
          newInformation: {
            totalPremiumMovement:
              (report?.premium?.allRisk || 0) + (report?.premium?.alop || 0),
            PremiumSlu: report?.netPremium?.sluShareTotal || 0,
            netPremium: report?.netPremium?.netTotal || 0,
            total: report?.premium?.totalInsured || 0,
          },
        },

        usdValues: {
          lastInformation: {
            totalPremiumMovement:
              (report?.movementValues?.allRiskUsd || 0) +
              (report?.movementValues?.alopUsd || 0),
            PremiumSlu: report?.netPremiumUSD?.sluShareTotal || 0,
            netPremium: report?.netPremiumUSD?.netTotal || 0,
            total: report?.premium?.totalUsd || 0,
          },
          newInformation: {
            totalPremiumMovement:
              (report?.premium?.allRiskUsd || 0) +
              (report?.premium?.alopUsd || 0),
            PremiumSlu: report?.netPremiumUSD?.sluShareTotal || 0,
            netPremium: report?.netPremiumUSD?.netTotal || 0,
            total: report?.premium?.totalUsd || 0,
          },
        },
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

        // Technical conditions changes - ajustado para ingeniería
        technicalConditionsChanges: {
          deductibles: report?.technicalConditions?.deductibles || [],
          sublimits: report?.technicalConditions?.sublime || [],
        },

        // Additional information
        clause: report?.cartera?.clausula || "",
        premiumPaymentDate: formatDate(report?.cartera?.premiumPaymentDate),

        // Premium calculations para ingeniería (AllRisk/ALOP en lugar de Damage/BI/Stocks)
        originalValues: {
          totalPremiumMovement:
            (report?.movementValues?.allRisk || 0) +
            (report?.movementValues?.alop || 0),
          premiumSlu: report?.netPremium?.sluShareTotal || 0,
          netPremium: report?.netPremium?.netTotal || 0,
          total: report?.premium?.totalInsured || 0,
        },

        usdValues: {
          totalPremiumMovement:
            (report?.movementValues?.allRiskUsd || 0) +
            (report?.movementValues?.alopUsd || 0),
          premiumSlu: report?.netPremiumUSD?.sluShareTotal || 0,
          netPremium: report?.netPremiumUSD?.netTotal || 0,
          total: report?.premium?.totalUsd || 0,
        },
      };
    },
  },
  methods: {
    ...mapActions(["saveEndorsmentType"]),
    getClauseName(id) {
      const clause = this.catalogEndorsements.find((c) => c.id === id);
      return clause ? clause.clause : "";
    },
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
      if (this.movementsValue != "") {
        this.onCreatrEndorsement = true;
        this.disabledSelect = true;
        this.showEndorsement = true;
        this.endorsementType = this.movementsValue;
        await this.saveEndorsmentType(this.movementsValue);
      }
    },
    async backToCreateEndorsement() {
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
    },
    async backHistoryTableToId(id) {
      this.selectedEndorsementId = id;
      this.showEndorsement = false;
      this.disabledSelect = true;
      this.endorsementHistory = true;
      this.idDinamyc = id;
      this.informationCard = await EndorsementService.getEndorsementById(id);
      console.log("informationCard =>", this.informationCard);
      this.clause = this.informationCard.report.cartera.clausula;
      this.premiumPaymentDate =
        this.informationCard.report.cartera.premiumPaymentDate;
      this.expeditionDate = this.informationCard.created_at;
      this.endorsementDocuments = this.informationCard.EndorsementDocuments;

      this.value = this.informationCard.report.cartera.clausula;

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
        this.endorsementDocuments = this.informationCard.EndorsementDocuments;
      } else {
        // if(
        // 	this.listEndorsement.find(element => element.id === this.idDinamyc).EndorsementType.type === 'Increase insurable value/ inclusion risk' ||
        // 	this.listEndorsement.find(element => element.id === this.idDinamyc).EndorsementType.type === 'Reduction of insurable value/ Risk Exclusion' ||
        // 	this.listEndorsement.find(element => element.id === this.idDinamyc).EndorsementType.type === 'Extension'
        // ){

        // Primera Tabla
        const reportData =
          this.informationCard.report.endorsmentReporData || {};
        const mv = reportData.movementValues || {};
        this.totalPremiumHistoryTable[0].premiumAllRisk = mv.allRisk || 0;
        this.totalPremiumHistoryTable[0].premiumAlop = mv.alop || 0;
        this.totalPremiumHistoryTable[0].premiumTotal = mv.total || 0;

        this.totalPremiumHistoryTable[1].premiumAllRisk =
          mv.allRiskUsd || 0;
        this.totalPremiumHistoryTable[1].premiumAlop = mv.alopUsd || 0;
        this.totalPremiumHistoryTable[1].premiumTotal = mv.totalUsd || 0;

        // Segunda Tabla
        const premium = reportData.premium || {};
        const netPremium = reportData.netPremium || {};
        this.totalPremium[0].premiumAllRisk = premium.allRisk || 0;
        this.totalPremium[0].premiumAlop = premium.alop || 0;
        this.totalPremium[0].premiumTotal = premium.totalInsured || 0;
        this.totalPremium[0].sluAllRisk =
          netPremium.allRiskSluShare || 0;
        this.totalPremium[0].sluAlop =
          netPremium.alopSluShare || 0;
        this.totalPremium[0].sluTotal =
          netPremium.sluShareTotal || 0;
      }

      // Invoca el  servicio para generar el excel
      const fileLink = await EndorsementService.getEndorsmentReport({
        subscriptionId: this.subscriptionId,
        endorsmentType: 1,
        endorsmentReporData: this.informationCard.report.endorsmentReporData,
      });

      const file = this.files.find((file) => file.fileId === 1);

      if (!fileLink) {
        file.error = true;
      } else {
        file.fileDownloadLink = fileLink;
        file.loaded = true;
        file.loading = false;
      }
    },
    async changeDateEndorsement(selectedDate) {
      this.dateSaved = selectedDate;
      this.showInfoEndorsement = false;
      this.reloadEndorsementData = this.reloadEndorsementData + 1;
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
    },
    closeAccountById({ idOptionSelected }) {},
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
    this.catalogEndorsements = await EndorsementService.getEndorsementType();
    this.accountComplete =
      await AccountCompleteService.getLastAccountCompleteByIdSubscription(
        this.subscriptionId
      );
    this.listEndorsement =
      await EndorsementService.getEndorsementsBySubscriptionId(
        this.subscriptionId
      );

    this.formatEndorsement5 = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

    if (!this.accountComplete) router.back();

    if (this.accountComplete.reference.includes("PRO")) router.back();
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

.endorsement-title {
  font-weight: 800;
  font-size: 20px;
}

.editAccount {
  width: auto;
  color: #f59607;
  font-weight: 600;
  font-size: 19px;
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
  //box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
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
  gap: 10px; // puedes reducir a 10px para que no se acumulen
}
.card-reinsurer {
  width: calc(25% - 10px); // 4 tarjetas por fila, ajustando el gap
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
