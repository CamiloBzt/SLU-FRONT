<template>
  <div>
    <BarNavGeneral :NavContent="BarNavData" />
    <!-- Copy account -->
    <div class="full-container d-flex justify-end align-center mt-5">
      <AppCloseAccount icon="mdi-close-circle" header="Reason to close account" :closeAccountData="CloseAccountData" @close-account="closeAccountById($event)" />
    </div>
    <!-- Stepper -->
    <AppStepper :steps="StepperData" />
    <!-- Close account -->
    <div class="full-container d-flex justify-end align-center">
      <AppCloseAccount iconColor="#003D6D" icon="mdi-content-copy" :closeAccountData="CloseAccountData" @close-account="closeAccountById($event)" />
    </div>
    <div class="facultative-summary-view">
      <AppMultipleFileSquare
        section="Summary"
        :files="arrayFiles"
        :addButton="false"
        @removeFile="deleteOfaDocument($event)"
        @addFile="addFile($event)"
        @errorFile="errorFileOfa($event)"
        @setLoading="setLoadingOfa($event)"
        @fileLoaded="fileLoadedOfa($event)"
      />
    </div>
  </div>
</template>
<script>
import BarNavGeneral from "@/components/BarNavGeneral";
import AppCloseAccount from "@/application/components/AppCloseAccount";
import AppStepper from "@/application/components/AppStepper";
import AppMultipleFileSquare from "@/application/components/AppMultipleFileSquare";
// Services
import { BarNavData } from "./services/mock-bar-nav.service.js";
import { GetCloseAccount } from "./services/mock-get-close-account.service";
import { GetStepper } from "./services/mock-get-stepper.service.js";
import { GetArrayFilesSummary } from "./services/mock-get-summary-files.service.js";
export default {
  name: "FacultativeSummaryView",
  components: {
    AppCloseAccount,
    BarNavGeneral,
    AppStepper,
    AppMultipleFileSquare,
  },
  data: () => {
    return {
      BarNavData: [],
      StepperData: [],
      CloseAccountData: [],
      arrayFiles: [],
    };
  },
  async beforeMount() {
    this.BarNavData = await BarNavData();
    this.CloseAccountData = await GetCloseAccount();
    this.StepperData = await GetStepper();
    this.arrayFiles = await GetArrayFilesSummary();
  },
  methods: {
    closeAccountById({ idOptionSelected }) {},
    addFile() {
      const newId = this.arrayFiles.length + 1;
      const emptyFile = {
        id: newId,
        fileName: "New Document",
        downloadLink: "#",
        errorMessage: "",
        status: "uploaded",
      };
      this.arrayFiles.push(emptyFile);
    },
  },
};
</script>
<style lang="scss" scoped>
.facultative-summary-view {
  background: white;
  box-shadow: 8px 8px 12px rgb(10 63 102 / 15%);
  padding: 28px 20px;
  border-radius: 5px;
  margin-top: 28px;
}
</style>
