<template>
  <div>
    <div class="TableTitle d-flex justify-space-between align-center mb-5 mt-5">
      <!--Titulo componente -->
      <div class="title">Line of Business</div>
      <div class="finishButtonCont mt-4 d-flex justify-end align-center">
        <v-btn
          rounded
          outlined
          large
          class="finishBtn"
          @click="goToCreate(undefined)"
        >
          Create Line of Business
        </v-btn>
      </div>
      <div
        class="TableControlsCont ShowFlexOnMovil justify-space-between align-center"
      >
        <div
          @click="moveLeftTable()"
          class="ControlBtn d-flex justify-center align-center"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </div>
        <div
          @click="moveRightTable()"
          class="ControlBtn d-flex justify-center align-center"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </div>
      </div>
    </div>
    <div class="table-wrapper">
      <!--Line of risk table -->
      <table class="subscription-table">
        <thead>
          <!--Table titles -->
          <tr>
            <th class="id">ID</th>
            <th class="key">Key</th>
            <th class="name">Description</th>
            <th class="status">Status</th>
            <th class="actions">Actions</th>
          </tr>
        </thead>
        <!--Table columns -->
        <tbody>
          <tr v-for="(item, i) in list" :key="i">
            <td class="id" @click="setLineOfRiskInfo(item)">
              {{ item.id != undefined ? item.id : "N/D" }}
            </td>
            <td class="key">
              {{ item.key != undefined ? item.key : "N/D" }}
            </td>
            <td class="name">
              {{ item.description != undefined ? item.description : "N/D" }}
            </td>
            <td class="status">
              <v-chip
                :color="item.active ? 'green' : 'red'"
                class="textcolor"
                small
              >
                {{ item.active ? "Active" : "Inactive" }}
              </v-chip>
            </td>
            <td class="actions" style="gap: 8px">
              <v-tooltip right color="#003D6D">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    @click="goToCreate(item)"
                    v-bind="attrs"
                    v-on="on"
                    icon
                  >
                    mdi-pencil-outline
                  </v-icon>
                </template>
                <span class="white--text">Edit Line of Business</span>
              </v-tooltip>
              <v-tooltip right color="#003D6D">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="Button_Actions"
                    @click="(dialog = true), (lineOfRisk = item)"
                    v-bind="attrs"
                    v-on="on"
                    icon
                  >
                    mdi-delete-outline
                  </v-icon>
                </template>
                <span class="white--text">Delete Line of Business</span>
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </table>

      <template>
        <v-dialog v-model="dialog" max-width="400">
          <v-card>
            <v-card-title class="text-h5">
              Are you sure you want to delete this line of business?
            </v-card-title>
            <v-card-actions class="d-flex justify-center">
              <v-btn
                rounded
                depressed
                class="btn-secondary"
                @click="deleteLineOfRisk(lineOfRisk), (dialog = false)"
              >
                Yes
              </v-btn>
              <v-btn
                rounded
                depressed
                class="btn-finish"
                @click="dialog = false"
                color="#003D6D"
              >
                No
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import moment from "moment";

export default {
  name: "LineOfRiskTable",
  data() {
    return {
      dialog: false,
      lineOfRisk: {},
      pagination: {
        limit: 10,
        offset: 0,
      },
      tableBodyContSnWidth: 0,
    };
  },
  computed: {
    // ...mapState({
    //   list: (state) => state.lineOfRisk.list,
    // }),
    ...mapGetters(["risk_type"]),
    list() {
      return this.risk_type || [];
    },
  },
  methods: {
    ...mapActions([
      "getLineOfRiskList",
      "deleteLineOfRisk",
      "getCatalogByName",
    ]),
    moveRightTable() {
      this.sideScroll("right", 25, 100, 10);
    },
    moveLeftTable() {
      this.sideScroll("left", 25, 100, 10);
    },
    goToCreate(item = undefined) {
      this.$router.push({
        name: "create-line-of-risk",
        query: { lineOfRiskId: item ? item.id : 0 },
      });
    },
    setLineOfRiskInfo(item) {
      // Lógica si necesitas mostrar detalles
      // console.log("Line of Risk selected:", item);
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
  },
  beforeMount() {
    this.$emit("startLoading");
    this.getCatalogByName({ name: "risk_type" }).then(() => {
      this.$emit("finishLoading", "loading");
    });
    // this.getLineOfRiskList().then(() => {
    //   this.$emit("finishLoading", "loading");
    // });
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
