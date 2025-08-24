<template>
  <div class="endorsement">
    <div class="endorsement__stepper">
      <AppStepper :steps="steps" />
    </div>
    <div class="endorsement__content">
      <!-- Endorsement date -->
      <div class="endorsement-title">Endorsement date</div>
      <div class="endorsement-inputs-container">
        <EndorsementDate />
      </div>
      <div class="endorsement-title">Original Deductions</div>
      <div class="endorsement-inputs-container">
        <OriginalDeductions />
      </div>
      <div class="endorsement-title">New Deductions</div>
      <div class="endorsement-inputs-container">
        <NewDeductions />
      </div>
    </div>
    <div class="endorsement__actions">
      <div class="button-container">
        <v-btn rounded large depressed> Next </v-btn>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.endorsement {
  &__stepper {
    height: 80px;
  }
  &__content {
    width: 100%;
    background: white;
    height: auto;
    //box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
    border-radius: 5px;
    padding: 25px 41px;
    .endorsement-title {
      font-style: normal;
      font-weight: 800;
      font-size: 20px;
      line-height: 110%;
    }
    .endorsement-inputs-container {
      padding: 0px 20px;
      margin-top: 15px;
    }
  }
  &__actions {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    margin-top: 25px;
    padding-bottom: 25px;
    .button-container {
      .v-btn {
        width: 217px;
        border-radius: 5px;
        color: #003d6d;
        text-transform: none;
        font-weight: 500;
        height: 40px !important;
        font-size: 15px;
        letter-spacing: normal !important;
        background: transparent !important;
        border: solid 1px #003d6d;
      }
    }
  }
}
</style>
<script>
import AppStepper from "@/application/components/AppStepper.vue";
import EndorsementDate from "./components/EndorsementDate.vue";
import OriginalDeductions from "./components/OriginalDeductions.vue";
import NewDeductions from "./components/NewDeductions.vue";
export default {
  name: "DeductionsChangeView",
  components: {
    AppStepper,
    EndorsementDate,
    OriginalDeductions,
    NewDeductions,
  },
  data: () => {
    return {
      steps: [
        {
          id: 1,
          active: true,
          path: "#",
          stepName: "Endorsement",
        },
        {
          id: 2,
          active: false,
          path: "#",
          stepName: "Detail",
        },
        {
          id: 3,
          active: false,
          path: "#",
          stepName: "Admitted premium",
        },
      ],
    };
  },
};
</script>
