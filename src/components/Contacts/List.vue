<template>
  <div class="SubscriptionTable mt-5">
    <!--TITULO DE LA TABLA-->
    <div class="TableTitle d-flex justify-space-between align-center mb-5">
      <!--TITULO-->
      <div class="title">Contacts</div>
      <div class="finishButtonCont mt-4 d-flex justify-end align-center">
        <v-btn rounded outlined large class="finishBtn" @click="goToCreate(undefined)"> Create Contact </v-btn>
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
            <th class="name">Name</th>
            <th class="email">Email</th>
            <th class="phone">Phone</th>
            <th class="address">Address</th>
            <th class="status">Status</th>
            <th class="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in list" :key="i">
            <td @click="setContactInfo(item)" class="id">
              {{ item.id != undefined ? item.id : "N/D" }}
            </td>
            <td class="name">
              <div class="d-flex align-center">
                <v-icon class="mr-2" color="primary" style="transform: scale(0.7)"> mdi-account </v-icon>
                {{ item.name != undefined ? item.name : "N/D" }}
              </div>
            </td>
            <td class="email">
              <a :href="`mailto:${item.email}`" class="email-link">
                {{ item.email != undefined ? item.email : "N/D" }}
              </a>
            </td>
            <td class="phone">
              <a :href="`tel:${item.phone}`" class="phone-link">
                {{ item.phone != undefined ? item.phone : "N/D" }}
              </a>
            </td>
            <td class="address">{{ item.address != undefined ? item.address : "N/D" }}</td>
            <td class="status">
              <v-chip :color="item.active ? 'green' : 'red'" text-color="white" small class="textcolor">
                {{ item.active ? "Active" : "Inactive" }}
              </v-chip>
            </td>
            <td class="actions">
              <v-tooltip right color="#003D6D">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon class="mr-2" v-bind="attrs" v-on="on" @click="goToCreate(item)"> mdi-pencil-outline </v-icon>
                </template>
                <span class="white--text">Edit Contact</span>
              </v-tooltip>

              <v-tooltip right color="#003D6D">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    @click="
                      dialog = true;
                      contact = item;
                    "
                  >
                    mdi-delete-outline
                  </v-icon>
                </template>
                <span class="white--text">Delete Contact</span>
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template>
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="text-h5"> Are you sure you want to delete this contact? </v-card-title>
          <v-card-actions class="d-flex justify-center">
            <v-btn rounded depressed class="btn-secondary" @click="deleteContact(contact), (dialog = false)"> Yes </v-btn>
            <v-btn rounded depressed class="btn-finish" @click="dialog = false" color="#003D6D"> No </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import moment from "moment";

export default {
  name: "ContactsTable",
  data() {
    return {
      dialog: false,
      contact: {},
      pagination: {
        limit: 10,
        offset: 0,
      },
      tableBodyContSnWidth: 0,
    };
  },
  computed: {
    ...mapGetters(["contacts"]),
    list() {
      return this.contacts || [];
    },
  },
  methods: {
    ...mapActions(["loadContacts", "deleteContact"]),
    moveRightTable() {
      this.sideScroll("right", 25, 100, 10);
    },
    moveLeftTable() {
      this.sideScroll("left", 25, 100, 10);
    },
    goToCreate(item = undefined) {
      this.$router.push({
        name: "create-contact",
        query: { contactId: item ? item.id : 0 },
      });
    },
    setContactInfo(item) {
      //console.log("Contact selected:", item);
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
  },
  beforeMount() {
    this.$emit("startLoading");
    this.loadContacts().then(() => {
      this.$emit("finishLoading", "loading");
    });
  },
  mounted() {
    this.$nextTick(() => {
      const el = this.$refs.TableContent;
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

.btn-finish {
  color: white;
}

.email-link,
.phone-link {
  color: #1976d2;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}

th.email,
td.email,
th.phone,
td.phone,
th.address,
td.address {
  word-wrap: break-word;
  white-space: normal;
}

.textcolor {
  color: white !important;
  font-weight: 600;
}
</style>
