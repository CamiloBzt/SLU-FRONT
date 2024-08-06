<template>
  <div class="TarifarCont">
    <v-btn @click="setModalRate(typeRate)" text rounded class="btn">
      Tarifar
      <div class="iconCont">
        <v-icon> mdi-content-copy </v-icon>
      </div>
    </v-btn>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
export default {
  name: 'ButtonActiveModalRate',
  data() {
    return {
      resultado: [],
    };
  },
  computed: {
    ...mapGetters(['accountInformation', 'risk_type']),
    typeRate() {
      if (this.accountInformation.typeOfRisk === 1 || this.accountInformation.typeOfRisk === 2) {
        return 'Car & Ear Modal';
      } else if (this.accountInformation.typeOfRisk === 3 || this.accountInformation.typeOfRisk === 5 || this.accountInformation.typeOfRisk === 4) {
        return 'Other Line of Risks Modal';
      }
    },
  },
  async mounted() {
    await this.getCatalogByName({ name: 'risk_type' });
  },
  methods: {
    ...mapMutations(['setModalRate']),
    ...mapActions(['getCatalogByName']),
  },
};
</script>
<style lang="less" scoped>
//BOTON TARIFAR
.TarifarCont {
  width: 150px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .btn {
    text-transform: none;
    letter-spacing: normal;
    font-weight: 400;
    color: #547fa9;
    font-size: 16px;
  }

  .iconCont {
    width: 27px;
    height: 27px;
    border-radius: 27px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #a8bfd9;
    i {
      font-size: 16px;
      margin-left: 2px;
      color: #003d6d;
    }
  }
}
</style>
