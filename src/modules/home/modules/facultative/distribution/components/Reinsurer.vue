<template>
  <div class="reinsurer-component">
    <div class="reinsurer-title align-center">Reinsurer {{ reinsurerIndex + 1 }}</div>

    <div class="input-container justify-center">
      <div class="input-row">
        <div class="input-content">
          <v-text-field
          class="ma-0"
            v-model="item.name"
            label="Name Reinsurer"
            type="string"
          ></v-text-field>
        </div>

        <div class="input-content">
          <v-text-field
          class="ma-0"
            v-model="item.line"
            label="Excess"
            type="string"
          ></v-text-field>
        </div>

        <div class="input-content">
          <v-text-field
          class="ma-0"
            v-model="item.exposure"
            label="Exposure"
            type="string"
          ></v-text-field>
        </div>

        <div class="input-content">
          <v-text-field
          class="ma-0"
            v-model="item.premiumLine"
            label="Premium Line"
            type="number"
          ></v-text-field>
        </div>

        <div class="input-content"></div>

        <div class="input-content">
          <v-text-field
          class="ma-0"
            v-model="item.totalPremium"
            label="Total Premium"
            type="number"
          ></v-text-field>
        </div>

        <div class="input-content">
          <v-text-field
          class="ma-0"
            v-model="item.reinsurerPremium"
            label="Reinsurer Premium"
            type="number"
            prefix="$"
          ></v-text-field>
        </div>

        <div class="input-content"></div>
      </div>
      <div class="input-row ">
        <div class="inner-title">Include DIC Reinsurer</div>
      </div>
      <div class="input-row no-margin">
        <div class="input-content">
          <v-text-field
            v-model="item.DICReinsurer"
            type="string"
          ></v-text-field>
        </div>
      </div>

      <div class="input-row">
        <div class="input-row justify-space">
          <div class="justify-inner">
            <div class="input-content">
              <v-text-field
                v-model="item.sluLine"
                label="SLU Line"
                type="number"
                suffix="%"
              ></v-text-field>
            </div>
            <div class="input-content">
              <v-text-field
                v-model="item.support"
                label="Support"
                type="number"
              ></v-text-field>
            </div>

            <div class="input-content">
              <v-text-field
                v-model="item.premium"
                label="Premium"
                type="number"
              ></v-text-field>
            </div>
          </div>

          <div class="input-row">
            <div class="justify-inner">
              <div class="input-content">
                <v-text-field
                  v-model="item.sluLine2"
                  label="SLU Line"
                  type="number"
                  suffix="%"
                ></v-text-field>
              </div>

              <div class="input-content">
                <v-text-field
                  v-model="item.support2"
                  label="Support"
                  type="number"
                ></v-text-field>
              </div>

              <div class="input-content">
                <v-text-field
                  v-model="item.premium2"
                  label="Premium"
                  type="number"
                ></v-text-field>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Reinsurer",
  data() {
    return {};
  },
  props: {
    reinsurerIndex: {
      type: String | Number,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },

  methods: {
    async addReinsurer() {
      const data = await addSublimit(
        this.item.id,
        this.subscription.subscriptionId
      );
      if (data) this.SublimitsArray = await getSublimits(this.item.id);
    },
    async deleteReinsurer(id, index) {},
  },
};
</script>
<style lang="less" scoped>
.reinsurer-component {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  font-family:avenir !important;
  align-items: flex-start;
  flex-wrap: wrap;
  .reinsurer-title {
    width: 15%;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    font-weight: 800;
    font-size: 20px;
    line-height: 110%;
    @media (max-width: 1050px) {
      font-size: 17px;
    }
    @media (max-width: 900px) {
      width: 18%;
    }
    @media (max-width: 700px) {
      width: 100%;
      margin: 20px 0;
    }
  }
  .inner-title{
    font-weight: 800;
    font-size: 16px;
    line-height: 110%;
  }
  .input-container {
    width: 85%;
    display: block;
    @media (max-width: 900px) {
      width: 80%;
    }
  }
  .input-row {
    display: flex;
    width: 100%;
    height: auto;
    margin-right: 1%;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: flex-start;
    margin-top: 15px;
  }
  .no-margin {
    margin-top: 0 !important;
  }
  .input-content {
    width: 24%;
    height: 70px;
    margin-right: 1%;
    margin-top: -10px;
    @media (max-width: 900px) {
      width: 32%;
    }
    @media (max-width: 650px) {
      width: 100%;
    }
  }
  .justify-inner {
    width: 85%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media (max-width: 700px) {
        width: 100%;
      }
    .input-content {
      width: 29%;
      @media (max-width: 900px) {
        width: 32%;
      }
      @media (max-width: 650px) {
        width: 100%;
      }
    }
  }
}


</style>
