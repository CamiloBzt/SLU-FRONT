<template>
  <div class="input-col">
    <div class="input-cont">
      <v-text-field
        v-model="daysDiference"
        label="Days"
        readonly
        v-on="on"
        disabled
      ></v-text-field>
    </div>
  </div>
</template>
<script>
export default {
  name: "calcDays",
  props: { endorsementDate: { type: String }, expiryDate: { type: String } },
  data() {
    return {
      daysDiference: 0,
      on: {},
    };
  },
  async beforeMount() {},
  async mounted() {
    this.calcDays();
  },
  computed: {},
  watch: {},
  methods: {
    calcDays() {
      let fecha1 = new Date(this.endorsementDate);
      let fecha2 = new Date(this.expiryDate);
      let resta = fecha2.getTime() - fecha1.getTime();
      if (fecha1 > fecha2) {
        this.daysDiference = 0;
      } else {
        this.daysDiference = Math.round(resta / (1000 * 60 * 60 * 24));
      }
    },
  },
};
</script>
<style lang="less" scoped>
.input-col {
  width: 20%;
  display: block;
  margin-right: 30px;
}
.input-cont {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 5px 0;
}
</style>
