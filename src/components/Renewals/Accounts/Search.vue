<template>
  <div class="Cont d-flex align-start flex-wrap">
    <div class="InputsCont d-flex flex-wrap justify-start align-center pa-3">
      <div class="InputCont" style="margin-left: 0.25rem">
        <v-text-field v-model="search" label="Account" />
      </div>
      <div class="InputCont">
        <v-text-field v-model="search" label="Reference Number" />
      </div>
      <div class="InputCont">
        <v-select v-model.trim="country" label="Country" :items="countries" item-text="description" item-value="id" :loading="loadingCountries" :disabled="countries.length === 0" clearable></v-select>
      </div>
    </div>

    <div class="ButtonCont d-flex justify-end align-center">
      <v-btn color="#003D6D" class="btn" rounded depressed @click="searchRenewal()"> Search Account </v-btn>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "RenewalsSearch",
  data() {
    return {
      loadingCountries: false,
      country: "",
      search: "",
    };
  },
  async mounted() {
    const lco = "loadingCountries";
    this[lco] = !this[lco];
    await this.getCatalogByName({ name: "countries" });
    this[lco] = false;
  },
  computed: {
    ...mapGetters(["countries"]),
  },
  methods: {
    ...mapActions(["getCatalogByName", "getSubscriptionList"]),
    searchRenewal() {
      const data = {
        limit: 10,
        offset: 0,
        query: this.search,
        filter: [
          ["s.id", "desc"],
          ["s.created_at", "desc"],
        ],
      };
      this.getSubscriptionList(data);
    },
  },
};
</script>
<style lang="less" scoped>
.Cont {
  width: 100%;
  height: auto;
  margin-top: 25px;

  //Contenedor de inputs
  .InputsCont {
    width: 100%;
    min-height: 130px;
    background: white;
    border-radius: 10px;

    .InputCont {
      width: 20%;
      height: auto;
      margin-right: 1%;
      @media (max-width: 650px) {
        width: 100%;
        margin-right: 0%;
      }
    }
  }

  //Boton buscar
  .ButtonCont {
    width: 100%;
    height: 50px;
    margin-top: 15px;

    .btn {
      border-radius: 5px;
      color: white;
      width: 170px;
      text-transform: none;
      letter-spacing: normal;
      font-weight: normal;
      height: 40px;
      width: 217px;
      @media (max-width: 650px) {
        width: 100%;
      }
    }
  }
}
</style>
