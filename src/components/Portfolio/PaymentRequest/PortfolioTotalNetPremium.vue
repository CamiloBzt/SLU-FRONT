<template>
  <div class="NetPremium">
    <h5 class="Title">
      PPC (Paymet Guarantee)
    </h5>

    <div class="Data">

      <div class="Content">
        <span class="Content__Title" />

        <span class="Content__Data">
          $ 88,000.00
        </span>
      </div>

      <div class="Content">
        <span class="Content__Title">
          Engineering
        </span>

        <span class="Content__Data">
          A-123456789
        </span>
      </div>

      <div class="Content">
        <span class="Content__Title">
          Fronting Fee 5%
        </span>

        <span class="Content__Data">
          $ 4,400.00
        </span>
      </div>

      <div class="Divider" />

      <div class="Content">
        <span class="Content__Title">
          SLU
        </span>

        <span class="Content__Data font-weight-bold">
          $ 83,600.00
        </span>
      </div>

    </div>
  </div>
</template>
<style lang="less" scoped>
.NetPremium{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;


  .Title{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 16px;
  }

  .Data{
    width: 50%;
    height: calc(100% - 40px);
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    margin-top: -40px;

    .Content{
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .Content__Title{
        width: 45%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }

      .Content__Data{
        width: 65%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

    }
    .Divider{
      width: 100%;
      height: 1px;
      background: #A8BFD9;
    }
  }
}
</style>