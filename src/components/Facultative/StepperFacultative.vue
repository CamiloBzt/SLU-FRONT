<template>
  <div  class="StepperHeadComponent d-flex justify-center align-center mt-1">
    <!--PASOS SIGUIENTES-->
    <button class="StepContent d-flex justify-center align-center" :class="step1">
      <!--NUMERO DEL PASO-->
      <div class="StepNumber d-flex justify-center align-center">
        1
      </div>
      <!--NOMBRE DEL PASO-->
      <div class="StepText ml-2">
        Share
      </div>
    </button>

    <button class="StepContent d-flex justify-center align-center ml-10 mr-10" :class="step2">
      <!--NUMERO DEL PASO-->
      <div class="StepNumber d-flex justify-center align-center">
        2
      </div>

      <!--NOMBRE DEL PASO-->
      <div class="StepText ml-2">
        Negotiation
      </div>
    </button>

    <button class="StepContent d-flex justify-center align-center" :class="step3">
      <!--NUMERO DEL PASO-->
      <div class="StepNumber d-flex justify-center align-center">
        3
      </div>

      <!--NOMBRE DEL PASO-->
      <div class="StepText ml-2">
        Completed
      </div>
    </button>
  </div>
</template>
<script>
import { stepper } from '@/mixins/subscription.js';
export default {
  mixins: [stepper],
  name: 'StepperFacultative',
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/Subscription/Stepper.less';
</style>
