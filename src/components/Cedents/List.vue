<template>
  <div>
    <div class="TableTitle d-flex justify-space-between align-center mb-5 pt-4">
      <!--Titulo componente-->
      <div class="title">Cedents</div>
      <div class="finishButtonCont mt-4 d-flex justify-end align-center">
        <v-btn rounded outlined large class="finishBtn" @click="goToCreate(undefined)"> Create Cedent </v-btn>
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
      <!--Tabla cedents-->
      <table class="subscription-table">
        <!--Titulos de la tabla-->
        <thead>
          <tr>
            <th class="id">ID</th>
            <th class="name">Name</th>
            <th class="country">Country</th>
            <th class="actions">Actions</th>
          </tr>
        </thead>
        <!--Columnas de la tabla-->
        <tbody>
          <tr v-for="(item, i) in list" :key="i">
            <td class="id" @click="setSubscriptionInfo(item)">
              {{ item.id != undefined ? item.id : "N/D" }}
            </td>
            <td class="name">
              {{ item.name != undefined ? item.name : "N/D" }}
            </td>
            <td class="country">
              {{ item.country != undefined ? item.country : "N/D" }}
            </td>
            <td class="actions">
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon @click="goToCreate(item)" v-bind="attrs" v-on="on"> mdi-pencil-outline </v-icon>
                </template>
                <span>Edit Cedent</span>
              </v-tooltip>
              <v-tooltip right class="Tooltip">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon @click="(dialog = true), (cedent = item)" v-bind="attrs" v-on="on"> mdi-delete-outline </v-icon>
                </template>
                <span>Delete Cedent</span>
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </table>
      <template>
        <v-dialog v-model="dialog" max-width="400">
          <v-card>
            <v-card-title class="text-h5"> Are you sure you want to delete cedent? </v-card-title>
            <v-card-actions class="d-flex justify-center">
              <v-btn rounded depressed class="btn-secondary" @click="deleteCedent(cedent), (dialog = false)"> Yes </v-btn>
              <v-btn rounded depressed class="btn-finish" outlined @click="dialog = false"> No </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
export default {
  name: "UsersTable",
  data() {
    return {
      dialog: false,
      cedent: {},
      pagination: {
        limit: 10,
        offset: 0,
      },
      columsArray: [
        {
          refNumber: "Ref number",
          country: "Country",
          typeOfRisk: "Type of Risk ",
          Broker: "Broker",
          inceptionDate: "Inception date",
          expiringDate: "Expiring date",
          status: "status",
        },
      ],
      tableBodyContSnWidth: 0,
    };
  },
  computed: {
    ...mapState({
      list: (state) => state.auth.list,
    }),
  },
  methods: {
    ...mapActions(["getCedentsList", "resendMail", "deleteCedent"]),
    moveRightTable() {
      this.sideScroll("right", 25, 100, 10);
    },
    moveLeftTable() {
      this.sideScroll("left", 25, 100, 10);
    },
    goToCreate(item = undefined) {
      this.$router.push({ name: "create-cedent", query: { cedentId: item ? item.id : 0 } });
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
    setSubscriptionInfo(item) {
      this.loadSubscription(item);
      this.$router.push(`/subscription/${item.id}/submission`);
    },
    formatDateMoment(dateToFormat) {
      if (dateToFormat) {
        const date = moment(dateToFormat);
        const day = date.format("DD");
        const month = date.format("MM");
        const year = date.format("YYYY");
        const hour = date.format("HH:mm").toUpperCase();
        return `${day} - ${month} - ${year}`;
      } else {
        return dateToFormat;
      }
    },
  },
  beforeMount() {
    this.$emit("startLoading");
    this.getCedentsList().then(() => {
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
</style>
