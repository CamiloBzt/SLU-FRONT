<template>
  <v-expansion-panels class="sub-expansion-component">
    <v-expansion-panel @change="deepDisabled">
      <v-expansion-panel-header
        @click="changeSubExpansion"
        class="expansion-title d-flex justify-start"
        expand-icon=""
      >
        <template v-slot:actions>
          <div class="sub-icon-cont d-flex justify-start align-center">
            <v-icon class="icon-expand mr-1">
              {{ iconSubExpansion }}
            </v-icon>
            <div class="sub-expansion-title">Risk Profile</div>
          </div>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="expand-content">
          <div class="title-text-area">Offer Comments*</div>

          <v-textarea
            v-model.trim="riskProfileComments"
            @change="
              updateByColumn('risk_profile_comments', $event.target.value)
            "
            @input="$emit('risk-profile-change', riskProfileCompleted)"
            hint="Required field"
            persistent-hint
          />

          <div class="inputs-cont">
            <div class="input-cont">
              <v-select
                v-model.trim="riskProfileClause"
                :items="typeClause"
                label="Type of clause*"
                item-text="data"
                item-value="id"
                clearable
                :disabled="disabled"
                hint="Required field"
                persistent-hint
                @change="
                  updateByColumn('risk_profile_clause', $event);
                  $emit('risk-profile-change', riskProfileCompleted);
                "
              ></v-select>
            </div>

            <div class="input-cont">
              <v-select
                v-model.trim="riskProfileExposure"
                :items="exposure"
                label="Exposure by neighborhood*"
                item-text="data"
                item-value="id"
                clearable
                :disabled="disabled"
                hint="Required field"
                persistent-hint
                @change="
                  updateByColumn('risk_profile_exposure', $event);
                  $emit('risk-profile-change', riskProfileCompleted);
                "
              ></v-select>
            </div>

            <div class="input-cont">
              <v-select
                v-model.trim="riskProfileHousekeeping"
                :items="huseKeeping"
                label="Housekeeping*"
                item-text="data"
                item-value="id"
                clearable
                :disabled="disabled"
                hint="Required field"
                persistent-hint
                @change="
                  updateByColumn('risk_profile_housekeeping', $event);
                  $emit('risk-profile-change', riskProfileCompleted);
                "
              ></v-select>
            </div>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { stateExpansiveManager } from "@/mixins/subscription.js";
// Tienda
import { mapGetters } from "vuex";
//Services
import {
  findBoundBySubscription,
  updateChange,
} from "./services/PremiumPaymentWarranty/premium-payment.service.js";
import { getCatalog } from "@/constants/catalogs/services/catalogs.service.js";

export default {
  name: "RiskProfile",
  mixins: [stateExpansiveManager],
  inject: ["deepDisabled"],
  data() {
    return {
      riskProfileComments: "",
      riskProfileClause: "",
      riskProfileExposure: "",
      riskProfileHousekeeping: "",
      typeClause: [],
      exposure: [],
      huseKeeping: [],
      disabled: false,
      id: 0,
    };
  },
  computed: {
    ...mapGetters(["subscription_id", "boundEng"]),
    riskProfileCompleted() {
      return (
        this.riskProfileComments?.trim().length > 0 &&
        !!this.riskProfileClause &&
        !!this.riskProfileExposure &&
        !!this.riskProfileHousekeeping
      );
    },
  },
  watch: {
    riskProfileCompleted: {
      handler(newValue) {
        this.$emit("risk-profile-change", newValue);
      },
      immediate: true,
    },

    // También observar cambios en cada campo individual
    riskProfileComments: {
      handler() {
        this.$nextTick(() => {
          this.$emit("risk-profile-change", this.riskProfileCompleted);
        });
      },
    },

    riskProfileClause: {
      handler() {
        this.$nextTick(() => {
          this.$emit("risk-profile-change", this.riskProfileCompleted);
        });
      },
    },

    riskProfileExposure: {
      handler() {
        this.$nextTick(() => {
          this.$emit("risk-profile-change", this.riskProfileCompleted);
        });
      },
    },

    riskProfileHousekeeping: {
      handler() {
        this.$nextTick(() => {
          this.$emit("risk-profile-change", this.riskProfileCompleted);
        });
      },
    },
  },
  async mounted() {
    //Catalogs
    const typeClause = await getCatalog({ name: "type_clause" });
    this.typeClause = typeClause ? typeClause : [];
    const exposure = await getCatalog({ name: "exposure" });
    this.exposure = exposure ? exposure : [];
    const huseKeeping = await getCatalog({ name: "housekeeping" });
    this.huseKeeping = huseKeeping ? huseKeeping : [];

    //Vuex Constants
    const typeBound = this.boundEng ? this.boundEng.typeBound : 1;

    //Services
    const bound = await findBoundBySubscription({
      id: this.subscription_id,
      typeBound: typeBound,
    });
    this.riskProfileComments = bound
      ? bound.bound.risk_profile_comments
      : this.riskProfileComments;
    this.riskProfileClause = bound
      ? bound.bound.risk_profile_clause
      : this.riskProfileClause;
    this.riskProfileExposure = bound
      ? bound.bound.risk_profile_exposure
      : this.riskProfileExposure;
    this.riskProfileHousekeeping = bound
      ? bound.bound.risk_profile_housekeeping
      : this.riskProfileHousekeeping;
    this.id = bound ? bound.bound.id : this.id;

    // Emitir estado inicial de validación
    this.$nextTick(() => {
      this.$emit("risk-profile-change", this.riskProfileCompleted);
    });
  },
  methods: {
    async updateByColumn(column, data) {
      const res = await updateChange({
        id: this.id,
        tableName: "bound",
        column,
        dataValue: data.toString(),
      });

      switch (column) {
        case "risk_profile_comments":
          this.riskProfileComments = data;
          break;
        case "risk_profile_clause":
          this.riskProfileClause = data;
          break;
        case "risk_profile_exposure":
          this.riskProfileExposure = data;
          break;
        case "risk_profile_housekeeping":
          this.riskProfileHousekeeping = data;
          break;
      }

      this.$forceUpdate();
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyleRefactored.less";
@import "~@/assets/style/Subscription/BoundRefactored.less";
.inputs-cont {
  width: 100%;
  height: auto;
  margin-top: 25px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  .input-cont {
    width: 18%;
    height: 100%;
    margin-right: 1%;
  }
}
</style>
