<template>
  <div class="PortfolioPpc">

    <h5 class="Title">
      PPC (Paymet Guarantee)
    </h5>

    <div class="Input">
      <v-text-field label="Days" />
    </div>
    <div class="Input">
      <v-text-field label="Deadline for Payment " />
    </div>

  </div>
</template>
<style lang="less" scoped>
.PortfolioPpc{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  gap:2%;


  .Title{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 16px;
  }

  .Input{
    width: 45%;
    height: 50px;
  }
}
</style>