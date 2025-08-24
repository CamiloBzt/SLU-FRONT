<template>
  <div>
    <div class="TableTitle d-flex justify-space-between align-center mb-5">
      <!--Titulo componente -->
      <div class="title">Currencies</div>
      <div class="finishButtonCont mt-4 d-flex justify-end align-center">
        <v-btn rounded outlined large class="finishBtn" @click="goToCreate(undefined)"> Create Currency </v-btn>
      </div>
      <div class="TableControlsCont ShowFlexOnMovil justify-space-between align-center">
        <div @click="moveLeftTable()" class="ControlBtn d-flex justify-center align-center">
          <v-icon>mdi-chevron-left</v-icon>
        </div>
        <div @click="moveRightTable()" class="ControlBtn d-flex justify-center align-center">
          <v-icon>mdi-chevron-right</v-icon>
        </div>
      </div>
    </div>
    <!-- Currency table -->
    <div class="table-wrapper">
      <table class="subscription-table">
        <!--Table titles -->
        <thead>
          <tr>
            <th class="id">ID</th>
            <th class="key">Key</th>
            <th class="name">Description</th>
            <th class="region">Region</th>
            <th class="status">Status</th>
            <th class="actions">Actions</th>
          </tr>
        </thead>
        <!--Table columns -->
        <tbody>
          <tr v-for="(item, i) in list" :key="i">
            <td class="id" @click="setCurrencyInfo(item)">
              {{ item.id != undefined ? item.id : "N/D" }}
            </td>
            <td class="key">
              <v-chip :color="getKeyColor(item.key)" class="textcolor" small>
                {{ item.key != undefined ? item.key : "N/D" }}
              </v-chip>
            </td>
            <td class="name">
              {{ item.description != undefined ? item.description : "N/D" }}
            </td>
            <td class="region">
              <v-chip :color="getRegionColor(item.region)" class="textcolor" small>
                {{ item.region != undefined ? item.region : "N/D" }}
              </v-chip>
            </td>
            <td class="status">
              <v-chip :color="item.active ? 'green' : 'red'" class="textcolor" small>
                {{ item.active ? "Active" : "Inactive" }}
              </v-chip>
            </td>
            <td class="actions">
              <div class="action-icons d-flex align-center">
                <v-tooltip right color="#003D6D">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon @click="goToCreate(item)" v-bind="attrs" v-on="on" icon>mdi-pencil-outline</v-icon>
                  </template>
                  <span class="white--text">Edit Currency</span>
                </v-tooltip>

                <v-tooltip right color="#003D6D">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon class="Button__Action" @click="(dialog = true), (currency = item)" v-bind="attrs" v-on="on" icon>mdi-delete-outline</v-icon>
                  </template>
                  <span class="white--text">Delete Currency</span>
                </v-tooltip>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="text-h5"> Are you sure you want to delete this currency? </v-card-title>
          <v-card-actions class="d-flex justify-center">
            <v-btn rounded depressed class="btn-secondary" @click="confirmDelete"> Yes </v-btn>
            <v-btn rounded depressed class="btn-finish" @click="dialog = false" color="#003D6D"> No </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "CurrenciesTable",
  data() {
    return {
      dialog: false,
      currency: {},
      pagination: {
        limit: 10,
        offset: 0,
      },
      tableBodyContSnWidth: 0,
    };
  },
  computed: {
    ...mapGetters(["currencies"]),
    list() {
      return this.currencies || [];
    },
  },
  methods: {
    ...mapActions(["getCurrenciesList", "deleteCurrency", "getCatalogByName"]),
    moveRightTable() {
      this.sideScroll("right", 25, 100, 10);
    },
    moveLeftTable() {
      this.sideScroll("left", 25, 100, 10);
    },
    goToCreate(item = undefined) {
      this.$router.push({
        name: "create-currency",
        query: { currencyId: item ? item.id : 0 },
      });
    },
    setCurrencyInfo(item) {
      console.log("Currency selected:", item);
    },
    getKeyColor(key) {
      const colors = {
        USD: "green",
        EUR: "blue",
        CAD: "red",
        MXN: "orange",
        XCD: "purple",
      };
      return colors[key] || "grey";
    },
    getRegionColor(region) {
      const colors = {
        "North America": "blue",
        Europe: "purple",
        "Central America": "orange",
        "South America": "green",
        Caribeean: "teal",
      };
      return colors[region] || "grey";
    },
    sideScroll(direction, speed, distance, step) {
      var container = document.querySelector(".TableContent");
      var scrollAmount = 0;
      var slideTimer = setInterval(function () {
        if (direction == "left") {
          container.scrollLeft -= step;
        } else {
          container.scrollLeft += step;
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
          window.clearInterval(slideTimer);
        }
      }, speed);
    },
    async confirmDelete() {
      await this.deleteCurrency(this.currency);
      this.dialog = false;

      // Recargar la lista completa
      await this.getCatalogByName({ name: "currencies" });
      
    },
  },
  beforeMount() {
    this.$emit("startLoading");
    this.getCatalogByName({ name: "currencies" }).then(() => {
      this.$emit("finishLoading", "loading");
    });
    
  },
  mounted() {
    this.$nextTick(() => {
      const el = this.$refs.tableContentInner;
      if (el) {
        const width = el.offsetWidth;
        console.log("Ancho del contenedor:", width);
      }
    });
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/global.less";
@import "~@/assets/style/Subscription/Table.less";

.Button__Action {
  height: 100%;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.btn-finish {
  color: white;
}

.textcolor {
  color: white !important;
  font-weight: 600;
}
</style>
