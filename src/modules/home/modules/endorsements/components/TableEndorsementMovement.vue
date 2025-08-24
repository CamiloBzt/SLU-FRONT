<template>
  <div class="formatEndorsementHistoryTable">
    <div class="inner-title">Admitted premium</div>
    <div class="input-cont">
      <v-text-field label="Admitted premium" v-model="admittedPremiumEndorsement5"> </v-text-field>
    </div>
    <!-- Línea separadora -->
    <div class="underlined"></div>
    <!-- Tabla Movement without premium -->
    <div class="container-table-movement">
      <div class="table-col">
        <div>
          <div class="table-title">Endorsement effective date</div>
          <div class="input-row">
            <div class="inner-col wide-col">
              <div class="table-input blue-input">
                {{ effectiveDate }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="table-col">
        <div>
          <div class="table-title">Movement end date</div>
          <div class="input-row">
            <div class="inner-col wide-col">
              <div class="table-input blue-input">
                {{ endDate }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="description-area">
      <div class="description-title">
        <div class="inner-description">Description</div>
      </div>
    </div>
    <div class="description-area">
      <textarea class="textarea-movement" v-model="description"></textarea>
    </div>
  </div>
</template>
<script>
export default {
  name: "TableEndorsementMovement",
  components: {},
  props: {
    effectiveDate: String,
    endDate: String,
    admittedPremiumEndorsement5: String,
    description: String,
  },
  data() {
    return {
      subscriptionId: this.$route.params.id,
    };
  },
};
</script>
<style lang="less" scoped>
.formatEndorsementHistoryTable {
  width: 100%;
  height: auto;
  border-radius: 5px;
  background: white;
  //box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  padding: 0 20px;
  padding-bottom: 2rem;
}
.inner-title {
  width: 100%;
  font-size: 20px;
  font-weight: 800;
  margin: 15px 0;
}
.input-cont {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 5px 0;
}
.underlined {
  display: block;
  width: 100%;
  border: solid 1px #a8bfd9;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.container-table-movement {
  width: 100%;
  display: flex;
  justify-content: center;
}
.table-col {
  width: 40%;

  .inner-col {
    width: 50%;
  }
}
.table-title {
  height: 50px;
  color: white;
  font-weight: 800;
  background-color: #547fa9;
  border-radius: 0px;
  margin: 2px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: flex-start;
  justify-content: flex-start;
}
.wide-col {
  width: 100% !important;
}
.description-area {
  width: 100%;
  display: flex;
  justify-content: center;
}
.description-title {
  width: 80%;
  display: block;
  margin-top: 1rem;
}
.inner-description {
  font-size: 20px;
  font-weight: 800;
  margin: 15px 0;
}
.textarea-movement {
  display: block;
  width: 80%;
  height: 12rem;
  resize: none;
  padding-left: 3rem;
  padding-right: 3rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
  background-color: #edf2f8;
  border-radius: 16px;
}
.table-input {
  min-height: 40px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}
.blue-input {
  background-color: #dce5fc;
}
</style>
