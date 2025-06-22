<template>
  <div class="SubscriptionTable mt-5">
    <!--TITULO DE LA TABLA-->
    <div class="TableTitle d-flex justify-space-between align-center">
      <!--TITULO-->
      <div class="title">Activities</div>
      <div class="finishButtonCont mt-4 d-flex justify-end align-center">
        <v-btn
          rounded
          outlined
          large
          class="finishBtn"
          @click="goToCreate(undefined)"
        >
          Create Activity
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

    <div class="TableContent" ref="TableContent">
      <!--CABEZA DE LA TABLA-->
      <div class="TableHeadContent mt-5 d-flex justify-start align-start">
        <!--NOMBRES DE LAS COLUMNAS-->
        <div class="TableHeadName row1 d-flex justify-start align-center">
          ID
        </div>
        <div class="TableHeadName row2 d-flex justify-start align-center">
          Description
        </div>
        <div class="TableHeadName row3 d-flex justify-start align-center">
          Category
        </div>
        <div class="TableHeadName row4 d-flex justify-start align-center">
          Rate
        </div>
        <div class="TableHeadName row5 d-flex justify-start align-center">
          Status
        </div>
        <div class="TableHeadName row6 d-flex justify-start align-center">
          Actions
        </div>
      </div>
      <!--CUERPO DE LA TABLA-->
      <div class="TableBodyContent mt-4 not-scrollable">
        <div class="TableContentInner scrollable">
          <div
            v-for="(item, i) in list"
            :key="i"
            class="TableBodyContSn d-flex justify-start align-start"
            :style="{
              width:
                tableBodyContSnWidth > 0 ? `${tableBodyContSnWidth}px` : '100%',
            }"
          >
            <!--INFORMACIÓN DE LA TABLA-->
            <div
              class="TableBodyTextLink d-flex row1 justify-start align-center"
              @click="setActivityInfo(item)"
            >
              {{ item.id != undefined ? item.id : "N/D" }}
            </div>
            <div class="TableBodyText d-flex row2 justify-start align-center">
              {{ item.description != undefined ? item.description : "N/D" }}
            </div>
            <div class="TableBodyText d-flex row3 justify-start align-center">
              <v-chip
                :color="getCategoryColor(item.category)"
                text-color="white"
                small
              >
                {{ item.category != undefined ? item.category : "N/D" }}
              </v-chip>
            </div>
            <div class="TableBodyText d-flex row4 justify-start align-center">
              {{ item.rate != undefined ? item.rate : "N/D" }}
            </div>
            <div class="TableBodyText d-flex row5 justify-start align-center">
              <v-chip
                :color="item.active ? 'green' : 'red'"
                text-color="white"
                small
              >
                {{ item.active ? "Active" : "Inactive" }}
              </v-chip>
            </div>
            <div class="TableBodyText d-flex row6 justify-start align-center">
              <v-tooltip right color="#003D6D">
                <template v-slot:activator="{ on, attrs }">
                  <div
                    class="Button__Action"
                    @click="goToCreate(item)"
                    v-bind="attrs"
                    v-on="on"
                    icon
                  >
                    <v-icon> mdi-pencil-outline </v-icon>
                  </div>
                </template>
                <span class="white--text">Edit Activity</span>
              </v-tooltip>
              <v-tooltip right color="#003D6D">
                <template v-slot:activator="{ on, attrs }">
                  <div
                    class="Button__Action"
                    @click="(dialog = true), (activity = item)"
                    v-bind="attrs"
                    v-on="on"
                    icon
                  >
                    <v-icon> mdi-delete-outline </v-icon>
                  </div>
                </template>
                <span class="white--text">Delete Activity</span>
              </v-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template>
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="text-h5">
            Are you sure you want to delete this activity?
          </v-card-title>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              rounded
              depressed
              class="btn-secondary"
              @click="deleteActivity(activity), (dialog = false)"
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
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";

export default {
  name: "ActivitiesTable",
  data() {
    return {
      dialog: false,
      activity: {},
      pagination: {
        limit: 10,
        offset: 0,
      },
      tableBodyContSnWidth: 0,
    };
  },
  computed: {
    ...mapState({
      list: (state) => state.activities.list,
    }),
  },
  methods: {
    ...mapActions(["getActivitiesList", "deleteActivity"]),
    moveRightTable() {
      this.sideScroll("right", 25, 100, 10);
    },
    moveLeftTable() {
      this.sideScroll("left", 25, 100, 10);
    },
    goToCreate(item = undefined) {
      this.$router.push({
        name: "create-activity",
        query: { activityId: item ? item.id : 0 },
      });
    },
    setActivityInfo(item) {
      console.log("Activity selected:", item);
    },
    getCategoryColor(category) {
      const colors = {
        1: "blue",
        2: "orange",
        3: "purple",
        4: "green",
        5: "red",
      };
      return colors[category] || "grey";
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
    this.getActivitiesList().then(() => {
      this.$emit("finishLoading", "loading");
    });
  },
  mounted() {
    this.tableBodyContSnWidth = this.$refs.TableContent.offsetWidth;
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/global.less";
@import "~@/assets/style/Subscription/Table.less";

// Controla el ancho de cada columna
.row1 {
  width: 8% !important;
  padding-left: 15px;
}
.row2 {
  width: 35% !important;
}
.row3 {
  width: 12% !important;
}
.row4 {
  width: 10% !important;
}
.row5 {
  width: 12% !important;
}
.row6 {
  width: 23% !important;
  i {
    color: #d2deed;
  }
}

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
