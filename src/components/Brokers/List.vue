<template>
  <div>
    <!-- CABECERA SEPARADA -->
    <div class="TableTitle d-flex justify-space-between align-center no-bg mb-5 pt-4">
      <div class="title">Brokers</div>

      <div class="finishButtonCont mt-4 d-flex justify-end align-center">
        <v-btn rounded outlined large class="finishBtn" @click="goToCreate(undefined)"> Create Broker </v-btn>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="subscription-table">
        <thead>
          <tr>
            <th class="id">ID</th>
            <th class="name">Name</th>
            <th class="country">Country</th>
            <th class="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in list" :key="i">
            <td @click="setSubscriptionInfo(item)" class="id">
              {{ item.id != undefined ? item.id : "N/D" }}
            </td>
            <td class="name">{{ item.name != undefined ? item.name : "N/D" }}</td>
            <td class="country">{{ item.country != undefined ? item.country : "N/D" }}</td>
            <td class="actions">
              <v-tooltip right color="#003D6D">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon class="mr-2" v-bind="attrs" v-on="on" @click="goToCreate(item)"> mdi-pencil-outline </v-icon>
                </template>
                <span class="white--text">Edit Broker</span>
              </v-tooltip>

              <v-tooltip right color="#003D6D">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    @click="
                      dialog = true;
                      broker = item;
                    "
                  >
                    mdi-delete-outline
                  </v-icon>
                </template>
                <span class="white--text">Delete Broker</span>
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modal eliminar -->
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="text-h5">Are you sure you want to delete broker?</v-card-title>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              rounded
              depressed
              class="btn-secondary"
              @click="
                deleteBroker(broker);
                dialog = false;
              "
            >
              Yes
            </v-btn>
            <v-btn rounded depressed class="btn-finish" color="#003D6D" @click="dialog = false"> No </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";

export default {
  name: "BrokersTable",
  data() {
    return {
      dialog: false,
      broker: {},
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
    ...mapActions(["getBrokersList", "resendMail", "deleteBroker"]),
    moveRightTable() {
      this.sideScroll("right", 25, 100, 10);
    },
    moveLeftTable() {
      this.sideScroll("left", 25, 100, 10);
    },
    goToCreate(item = undefined) {
      this.$router.push({ name: "create-broker", query: { brokerId: item ? item.id : 0 } });
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
    this.getBrokersList().then(() => {
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
</style>
