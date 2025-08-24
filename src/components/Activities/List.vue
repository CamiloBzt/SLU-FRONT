<template>
  <div class="SubscriptionTable mt-5">
    <div class="TableTitle d-flex justify-space-between align-center mb-5">
      <div class="title">Activities</div>
      <div class="finishButtonCont mt-4 d-flex justify-end align-center">
        <v-btn rounded outlined large class="finishBtn" @click="goToCreate(undefined)"> Create Activity </v-btn>
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
      <table class="subscription-table">
        <thead>
          <tr>
            <th class="id">ID</th>
            <th class="name">Description</th>
            <th class="category">Category</th>
            <th class="rate">Rate</th>
            <th class="status">Status</th>
            <th class="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in list" :key="i">
            <td class="id" @click="setActivityInfo(item)">
              {{ item.id != undefined ? item.id : "N/D" }}
            </td>
            <td class="name">{{ item.description != undefined ? item.description : "N/D" }}</td>
            <td class="category">
              <v-chip :color="getCategoryColor(item.category)" small class="textcolor">
                {{ item.category != undefined ? item.category : "N/D" }}
              </v-chip>
            </td>
            <td class="rate">{{ item.rate != undefined ? item.rate : "N/D" }}</td>
            <td class="status">
              <v-chip :color="item.active ? 'green' : 'red'" class="textcolor" small>
                {{ item.active ? "Active" : "Inactive" }}
              </v-chip>
            </td>
            <td class="actions">
              <v-tooltip right color="#003D6D">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon class="mr-2" v-bind="attrs" v-on="on" @click="goToCreate(item)"> mdi-pencil-outline </v-icon>
                </template>
                <span class="white--text">Edit Activity</span>
              </v-tooltip>
              <v-tooltip right color="#003D6D">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    @click="
                      dialog = true;
                      activity = item;
                    "
                  >
                    mdi-delete-outline
                  </v-icon>
                </template>
                <span class="white--text">Delete Activity</span>
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal eliminar -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5"> Are you sure you want to delete this activity? </v-card-title>
        <v-card-actions class="d-flex justify-center">
          <v-btn rounded depressed class="btn-secondary" @click="deleteActivity(activity), (dialog = false)"> Yes </v-btn>
          <v-btn rounded depressed class="btn-finish" @click="dialog = false" color="#003D6D"> No </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
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
    ...mapGetters(["activities"]),
    list() {
      return this.activities || [];
    },
  },
  methods: {
    ...mapActions(["getActivitiesList", "deleteActivity", "getCatalogByName"]),
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
      // console.log("Activity selected:", item);
    },
    getCategoryColor(category) {
      const colors = {
        1: "black",
        2: "blue",
        3: "orange",
        4: "green",
        5: "pink",
      };
      return colors[category] || "black";
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
    this.getCatalogByName({ name: "activities" }).then(() => {
      this.$emit("finishLoading", "loading");
    });
  },
  mounted() {
    this.$nextTick(() => {
      const el = this.$refs.tableContentInner;
      if (el) {
        const width = el.offsetWidth;
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

.textcolor {
  color: white !important;
  font-weight: 600;
}

.btn-finish {
  color: white;
}
</style>
