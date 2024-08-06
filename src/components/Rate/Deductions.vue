<template>
  <div
    class="
      DeductionsCont
      d-flex
      justify-start
      align-center
      flex-wrap
      align-content-center
    "
  >
    <!--TITULO-->
    <div class="TitleCont">
      <h5>Deductions</h5>
    </div>
    <v-form class="form d-flex flex-wrap">
      <div class="InputContent">
        <v-text-field
          v-model="deductions.brokerage"
          label="Brokerage"
          type="number"
          suffix="%"
          @blur="changeBrokerage(deductions.brokerage)"
          readonly
        ></v-text-field>
      </div>

      <div class="InputContent">
        <v-text-field
          v-model="deductions.taxes"
          label="Tax"
          type="number"
          suffix="%"
          readonly
        ></v-text-field>
      </div>

      <div class="InputContent">
        <v-text-field
          v-model="deductions.fronting"
          label="Fronting"
          type="number"
          suffix="%"
          readonly
        ></v-text-field>
      </div>

      <div class="InputContent">
        <v-text-field
          v-model="deductions.eng"
          label="Eng fee"
          type="number"
          suffix="%"
          readonly
        ></v-text-field>
      </div>

      <div class="InputContent">
        <v-text-field
          v-model="deductions.premiumReserve"
          label="Premium reserve only Colombia"
          type="number"
          suffix="%"
          readonly
        ></v-text-field>
      </div>

      <div class="InputContent">
        <v-text-field
          v-model="deductions.lta"
          label="LTA"
          type="number"
          suffix="%"
          readonly
        ></v-text-field>
      </div>

      <div class="InputContent">
        <v-text-field
          v-model="deductions.others"
          label="Others"
          type="number"
          suffix="%"
          readonly
        ></v-text-field>
      </div>
    </v-form>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  name: 'DeductionsRate',
  async beforeMount() {
    await this.getCatalogByName({ name: 'deductions_type' });
  },
  computed: {
    ...mapGetters([
      'deductions',
      'deductionsType'
    ]),
  },
  methods: {
    ...mapActions([
      'getCatalogByName',
    ]),
    changeBrokerage(value) {
      console.log(value);
    },
  },
};
</script>
<style lang="less" scoped>
.DeductionsCont {
  width: 100%;
  height: auto;

  //TITULO
  .TitleCont {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    h5 {
      font-size: 20px;
      color: black;
      font-weight: 600;
    }
  }
  .form {
    width: 100%;
    height: auto;
    margin-top: 15px;
    justify-content: space-between;
    .InputContent {
      width: 13.28%;
      height: 70px;
      margin-right: 1%;
      margin-top: -10px;
    }
    .InputContentLarge {
      width: 20%;
      height: 70px;
      margin-right: 1%;
      margin-top: -10px;
    }
  }
}

@media (max-width: 640px) {
  .DeductionsCont {
    //TITULO
    .TitleCont {
      h5 {
        font-size: 16px;
      }
    }

    //INPUTS
    .InputContent,
    .InputContentLarge {
      width: 100%;
    }
  }
}
</style>
