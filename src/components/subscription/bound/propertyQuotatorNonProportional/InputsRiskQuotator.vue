<template>
  <div class="input-risk-quotator w-100">
    <div class="input-cont">
      <v-text-field label="Risk Reference" v-model="subscription_id" disabled />
    </div>
    <div class="input-cont">
      <v-select
        v-model.trim="analysis.status"
        @change="updateByColumn('status', $event)"
        label="Status"
        :items="catalogStatusEng"
        item-text="data"
        item-value="id"
        :disabled="disabled"
      ></v-select>
    </div>
    <div class="input-cont">
      <v-text-field
        label="Line"
        v-model="analysis.CatalogRiskType.key"
        disabled
      />
    </div>
    <div class="input-cont">
      <v-text-field :value="business" label="Business" disabled />
    </div>
    <div class="input-cont">
      <v-select
        v-model.trim="analysis.underwriter"
        @change="updateByColumn('underwriter', $event)"
        label="Underwriter*"
        :items="catalogUnderwriters"
        item-text="data"
        item-value="id"
        :disabled="disabled"
        hint="Required field"
        persistent-hint
        :rules="[(v) => !!v || 'Required field']"
      ></v-select>
    </div>
    <div class="input-cont">
      <v-select
        v-model.trim="analysis.uw_analist_1"
        @change="updateByColumn('uw_analist_1', $event)"
        label="UW Analist 1*"
        :items="catalogUnderwriters"
        item-text="data"
        item-value="id"
        :disabled="disabled"
        hint="Required field"
        persistent-hint
        :rules="[(v) => !!v || 'Required field']"
      >
      </v-select>
    </div>
    <div class="input-cont">
      <v-select
        v-model.trim="analysis.uw_analist_2"
        @change="updateByColumn('uw_analist_2', $event)"
        label="UW Analist 2"
        :items="catalogUnderwriters"
        item-text="data"
        item-value="id"
        :disabled="disabled"
      >
      </v-select>
    </div>
    <div class="input-cont">
      <v-text-field
        label="Underwriting Month"
        v-model="analysis.Quotation.underwriter_month"
        disabled
      />
    </div>
    <div class="input-cont">
      <v-text-field
        v-model="analysis.Quotation.inception_date"
        label="Inception"
        disabled
      ></v-text-field>
    </div>
    <div class="input-cont">
      <v-text-field
        v-model="analysis.Quotation.expiry_date"
        label="Expiry "
        disabled
      ></v-text-field>
    </div>
    <div class="input-cont">
      <v-text-field label="Term" :value="term" disabled />
    </div>
  </div>
</template>
<script>
//Tienda
import { mapActions, mapGetters, mapState } from "vuex";
// Services
import { getCatalog } from "@/constants/catalogs/services/catalogs.service.js";
import { setAnalysis } from "./services/InputsRiskQuotator/inputs-risk-quotator.service.js";

export default {
  name: "InputsRiskQuotator",
  data() {
    return {
      //Catalogs
      catalogUnderwriters: [],
      catalogStatusEng: [],
      catalogUnderwritersMonths: [],
      //Analysis
      analysis: {
        status: "",
        underwriter: "",
        uw_analist_1: "",
        uw_analist_2: "",
        Subscription: {
          type: "",
        },
        CatalogRiskType: {
          key: "",
        },
        Quotation: {
          underwriter_month: "",
          inception_date: "",
          expiry_date: "",
        },
      },
      disabled: false,
    };
  },
  computed: {
    ...mapState({
      realAnalysis: (state) => state.analysis,
    }),
    ...mapGetters(["subscription_id", "quotation", "analysis"]),
    term() {
      if (
        !this.analysis?.Quotation?.inception_date ||
        !this.analysis?.Quotation?.expiry_date
      ) {
        return ""; // Retorna vacío si no hay fechas disponibles
      }
      const inceptionDate = new Date(this.analysis.Quotation.inception_date);
      const expiryDate = new Date(this.analysis.Quotation.expiry_date);
      const differenceInDays =
        (expiryDate - inceptionDate) / (1000 * 60 * 60 * 24);
      const months = (differenceInDays / 30).toFixed(2); // Convertir días a meses (aproximado)
      return `${months} months`;
    },
    // Asignar Business
    business() {
      return this.analysis?.Subscription?.type || "N/A"; // Retorna "N/A" si no hay datos
    },
    requiredFieldsCompleted() {
      return !!(this.analysis.underwriter && this.analysis.uw_analist_1);
    },
  },
  watch: {
    requiredFieldsCompleted: {
      handler(newValue) {
        this.$emit("required-fields-change", newValue);
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(["getAnalysisById"]),
    async updateByColumn(column, data) {
      await setAnalysis({
        id_subscription: this.subscription_id,
        column,
        data: data.toString(),
      });

      this.analysis[column] = data;

      this.$forceUpdate();
    },
  },
  async beforeMount() {
    //Catalogs
    const catalogUnderwriters = await getCatalog({ name: "underwriters" });
    this.catalogUnderwriters = catalogUnderwriters ? catalogUnderwriters : [];
    const catalogStatusEng = await getCatalog({ name: "status_eng" });
    this.catalogStatusEng = catalogStatusEng ? catalogStatusEng : [];
    //Services
    Promise.all([this.getAnalysisById(this.subscription_id)]).finally(() => {
      this.analysis = { ...this.analysis, ...this.realAnalysis };
    });
    // const analysisServices = await getAnalysisById({ id_subscription: this.subscription_id })
    // this.analysis = { ...this.analysis, ...analysisServices }
  },
};
</script>
<style lang="less" scoped>
.input-risk-quotator {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .input-cont {
    width: 18%;
  }
}

@media (max-width: 900px) {
  .input-risk-quotator {
    .input-cont {
      width: 32%;
    }
  }
}

@media (max-width: 650px) {
  .input-risk-quotator {
    .input-cont {
      width: 100%;
    }
  }
}
</style>
