<template>
  <v-expansion-panels class="ExpansionComponent ExpansionBordered mt-6">
    <v-expansion-panel>
      <!--TITULO DEL ACORDEON-->
      <v-expansion-panel-header
        @click="changeStateExpansive()"
        class="ExpansionTitle"
        expand-icon=""
      >
        General Report

        <div class="ExpansionState HideOnMovil">
          {{ stateExpansiveMessage }}
        </div>
        <template v-slot:actions>
          <v-icon class="iconExpand">
            {{ iconExpansive }}
          </v-icon>
        </template>
      </v-expansion-panel-header>
      <!--CONTENIDO DEL ACORDEON-->
      <v-expansion-panel-content>
        <div class="ExpandContent justify-space-between">
          <div class="downloadAccouting d-flex justify-start align-center">
            Download <b>SLU Account Summary</b> Documents
          </div>

          <div class="DownloadButtons d-flex justify-start align-center">
            <v-btn class="Btn" text rounded :disabled="disabled">
              <v-icon class="mr-3"> mdi-arrow-expand-down </v-icon>
              Download PDF
            </v-btn>

            <v-btn
              class="Btn"
              text
              rounded
              :loading="loading"
              @click="downloadExcel"
              :disabled="disabled"
            >
              <v-icon class="mr-3"> mdi-arrow-expand-down </v-icon>
              Download xlxs
            </v-btn>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { stateExpansiveManager } from "@/mixins/subscription.js";
import { mapActions } from "vuex";
export default {
  name: "GeneralReport",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [stateExpansiveManager],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions(["subscriptionReport"]),
    async downloadExcel() {
      this.loading = true;
      const url = await this.subscriptionReport();
      if (url) window.open(url, "_blank").focus();
      this.loading = false;
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";
.ExpansionComponent {
  z-index: 0;
}
.downloadAccouting {
  width: 40%;
  height: 50px;
  color: #547fa9;
  font-weight: 400;
  b {
    color: inherit;
    margin-left: 3px;
    margin-right: 3px;
  }
}

.DownloadButtons {
  width: 60%;
  height: 50px;
  .Btn {
    border-radius: 5px;
    color: #547fa9;
    text-transform: none;
    letter-spacing: normal;
    font-size: 16px;
    i {
      font-size: 19px;
    }
  }
}
</style>
