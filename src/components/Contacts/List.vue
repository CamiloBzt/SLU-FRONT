<template>
  <div class="SubscriptionTable mt-5">
    <!--TITULO DE LA TABLA-->
    <div class="TableTitle d-flex justify-space-between align-center">
      <!--TITULO-->
      <div class="title">Contacts</div>
      <div class="finishButtonCont mt-4 d-flex justify-end align-center">
        <v-btn
          rounded
          outlined
          large
          class="finishBtn"
          @click="goToCreate(undefined)"
        >
          Create Contact
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
          Name
        </div>
        <div class="TableHeadName row3 d-flex justify-start align-center">
          Email
        </div>
        <div class="TableHeadName row4 d-flex justify-start align-center">
          Phone
        </div>
        <div class="TableHeadName row5 d-flex justify-start align-center">
          Address
        </div>
        <div class="TableHeadName row6 d-flex justify-start align-center">
          Status
        </div>
        <div class="TableHeadName row7 d-flex justify-start align-center">
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
              @click="setContactInfo(item)"
            >
              {{ item.id != undefined ? item.id : "N/D" }}
            </div>
            <div class="TableBodyText d-flex row2 justify-start align-center">
              <div class="d-flex align-center">
                <v-icon class="mr-2" color="primary"> mdi-account </v-icon>
                {{ item.name != undefined ? item.name : "N/D" }}
              </div>
            </div>
            <div class="TableBodyText d-flex row3 justify-start align-center">
              <a :href="`mailto:${item.email}`" class="email-link">
                {{ item.email != undefined ? item.email : "N/D" }}
              </a>
            </div>
            <div class="TableBodyText d-flex row4 justify-start align-center">
              <a :href="`tel:${item.phone}`" class="phone-link">
                {{ item.phone != undefined ? item.phone : "N/D" }}
              </a>
            </div>
            <div class="TableBodyText d-flex row5 justify-start align-center">
              {{ item.address != undefined ? item.address : "N/D" }}
            </div>
            <div class="TableBodyText d-flex row6 justify-start align-center">
              <v-chip
                :color="item.active ? 'green' : 'red'"
                text-color="white"
                small
              >
                {{ item.active ? "Active" : "Inactive" }}
              </v-chip>
            </div>
            <div class="TableBodyText d-flex row7 justify-start align-center">
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
                <span class="white--text">Edit Contact</span>
              </v-tooltip>
              <v-tooltip right color="#003D6D">
                <template v-slot:activator="{ on, attrs }">
                  <div
                    class="Button__Action"
                    @click="(dialog = true), (contact = item)"
                    v-bind="attrs"
                    v-on="on"
                    icon
                  >
                    <v-icon> mdi-delete-outline </v-icon>
                  </div>
                </template>
                <span class="white--text">Delete Contact</span>
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
            Are you sure you want to delete this contact?
          </v-card-title>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              rounded
              depressed
              class="btn-secondary"
              @click="deleteContact(contact), (dialog = false)"
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
      console.log("Contact selected:", item);
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
  width: 20% !important;
}
.row3 {
  width: 25% !important;
}
.row4 {
  width: 15% !important;
}
.row5 {
  width: 15% !important;
}
.row6 {
  width: 10% !important;
}
.row7 {
  width: 7% !important;
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

.email-link,
.phone-link {
  color: #1976d2;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>
