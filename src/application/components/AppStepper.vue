<template>
  <div class="app-stepper d-flex justify-center align-center mt-1">
    <button v-for="(item, index) in steps" :key="index" class="step-content d-flex justify-center align-center" :class="{ 'step-active': item.active }" @click="redirect(item.path)">
      <div class="step-number d-flex justify-center align-center">1</div>
      <div class="step-text ml-2">
        {{ item.stepName }}
      </div>
    </button>
  </div>
</template>
<script>
export default {
  name: "AppStepper",
  props: {
    steps: [],
  },
  methods: {
    redirect(path) {
      this.$router.push(path);
    },
  },
};
</script>
<style lang="less" scoped>
.app-stepper {
  width: 100%;
  height: 60px;
  position: relative;
  gap: 15px;

  .step-content {
    height: 100%;
    flex-wrap: wrap;
    .step-text {
      font-weight: normal;
      font-size: 19px;
      text-align: center;
      color: #547fa9;
      font-weight: 600;
    }
    .step-number {
      width: 32px;
      height: 32px;
      border-radius: 32px;
      background: white;
      font-weight: 600;
      margin-left: -1px;
      position: relative;
      color: #547fa9;
      //box-shadow: 4px 4px 6px rgba(10, 63, 102, 0.15);
    }
  }

  .step-active {
    opacity: 1;
    .step-text {
      color: var(--secondaryColor) !important;
    }
    .step-number {
      background: var(--secondaryColor) !important;
      color: white;
    }
  }
}

@media (max-width: 640px) {
  .StepperHeadComponent {
    height: 65px;
    .step-content {
      width: 33%;
      .step-number {
        margin-top: 5px;
      }
      .step-text {
        width: 100%;
        font-size: 15px;
      }
    }
  }
}
</style>
