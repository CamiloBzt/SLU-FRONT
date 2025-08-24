<template>
  <div>
    <div class="TableTitle d-flex justify-space-between align-center">
      <!--Titulo componente -->
      <div class="title">Countries</div>
      <div class="finishButtonCont mt-4 d-flex justify-end align-center">
        <v-btn rounded outlined large class="finishBtn" @click="goToCreate(undefined)"> Create Country </v-btn>
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
    <div class="table-wrapper">
      <!-- Countries table -->
      <table class="subscription-table">
        <thead>
          <!--Table titles -->
          <tr>
            <th class="id">ID</th>
            <th class="country">Country</th>
            <th class="created-date">Created Date</th>
            <th class="status">Status</th>
            <th class="actions">Actions</th>
          </tr>
        </thead>
        <!--Table columns -->
        <tbody>
          <tr v-for="(item, i) in list" :key="i">
            <td class="id" @click="setCountryInfo(item)">
              {{ item.id != undefined ? item.id : "N/D" }}
            </td>
            <td class="country">
              <div class="d-flex align-center">
                <v-icon class="mr-2" :color="getCountryIcon(item.description)">
                  {{ getCountryIconName(item.description) }}
                </v-icon>
                {{ item.description != undefined ? item.description : "N/D" }}
              </div>
            </td>
            <td class="created-date">
              {{ item.created_at != undefined ? formatDate(item.created_at) : "N/D" }}
              {{ formatDate(item.created_at) }}
            </td>
            <td class="status">
              <v-chip :color="item.active ? 'green' : 'red'" class="textcolor" small>
                {{ item.active ? "Active" : "Inactive" }}
              </v-chip>
            </td>
            <td class="actions d-flex align-center" style="gap: 8px">
              <v-tooltip right color="#003D6D">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon @click="goToCreate(item)" v-bind="attrs" v-on="on" icon> mdi-pencil-outline </v-icon>
                </template>
                <span class="white--text">Edit Country</span>
              </v-tooltip>
              <v-tooltip right color="#003D6D">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon class="Button__Action" @click="(dialog = true), (country = item)" v-bind="attrs" v-on="on" icon> mdi-delete-outline </v-icon>
                </template>
                <span class="white--text">Delete Country</span>
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </table>
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="text-h5"> Are you sure you want to delete this country? </v-card-title>
          <v-card-actions class="d-flex justify-center">
            <v-btn rounded depressed class="btn-secondary" @click="ConfirmDelete"> Yes </v-btn>
            <v-btn rounded depressed class="btn-finish" @click="dialog = false" color="#003D6D"> No </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import moment from "moment";

export default {
  name: "CountriesTable",
  data() {
    return {
      dialog: false,
      country: {},
      pagination: {
        limit: 10,
        offset: 0,
      },
      tableBodyContSnWidth: 0,
    };
  },
  computed: {
    // ...mapState({
    //   list: (state) => state.countries.list,
    // }),
    ...mapGetters(["countries"]),
    list() {
      return this.countries || [];
    },
  },
  methods: {
    ...mapActions(["getCountriesList", "deleteCountry", "getCatalogByName"]),
    moveRightTable() {
      this.sideScroll("right", 25, 100, 10);
    },
    moveLeftTable() {
      this.sideScroll("left", 25, 100, 10);
    },
    goToCreate(item = undefined) {
      this.$router.push({
        name: "create-country",
        query: { countryId: item ? item.id : 0 },
      });
    },
    setCountryInfo(item) {
      //console.log("Country selected:", item);
    },
    getCountryIcon(countryName) {
      // Mapeo de países a colores
      const countryColors = {
        "United States": "blue",
        Canada: "red",
        Mexico: "green",
        Brazil: "yellow",
        Argentina: "light-blue",
        Colombia: "orange",
        Spain: "red",
        France: "blue",
        Germany: "black",
        Italy: "green",
        "United Kingdom": "purple",
        Japan: "red",
        China: "red",
        Australia: "blue",
      };
      return countryColors[countryName] || "grey";
    },
    getCountryIconName(countryName) {
      // Mapeo de países a iconos
      const countryIcons = {
        "United States": "mdi-flag-variant",
        Canada: "mdi-flag-variant",
        Mexico: "mdi-flag-variant",
        Brazil: "mdi-flag-variant",
        Argentina: "mdi-flag-variant",
        Colombia: "mdi-flag-variant",
        Spain: "mdi-flag-variant",
        France: "mdi-flag-variant",
        Germany: "mdi-flag-variant",
        Italy: "mdi-flag-variant",
        "United Kingdom": "mdi-flag-variant",
        Japan: "mdi-flag-variant",
        China: "mdi-flag-variant",
        Australia: "mdi-flag-variant",
      };
      return countryIcons[countryName] || "mdi-earth";
    },
    formatDate(dateString) {
      if (!dateString) return "N/D";
      return moment(dateString).format("DD/MM/YYYY");
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
    async ConfirmDelete() {
      await this.deleteCountry(this.country);
      this.dialog = false;
      await this.getCountriesList();
    },
  },
  beforeMount() {
    this.$emit("startLoading");
    this.getCatalogByName({ name: "countries" }).then(() => {
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

    //this.tableBodyContSnWidth = this.$refs.TableContent.offsetWidth;
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

.textcolor {
  color: white !important;
  font-weight: 600;
}

.btn-finish {
  color: white;
}
</style>
