<template>
  <div>
    <BarNavGeneral :NavContent="BarNavData" />
    <div class="full-container d-flex justify-end align-center">
      <AppCloseAccount
        icon="mdi-close-circle"
        header="Reason to close account"
        :closeAccountData="CloseAccountData"
        @close-account="closeAccountById($event)"
      />
    </div>
    <div class="table-wrapper">
      <table class="subscription-table">
        <!--Titulos de la tabla-->
        <thead>
          <tr>
            <td class="ref">Ref Number</td>
            <td class="country">Country</td>
            <td class="risk">Line of Business</td>
            <td class="name">Name</td>
            <td class="broker">Broker</td>
            <td class="cedent">Cedent</td>
            <td class="expedition">Expedition Date</td>
            <td class="expedition">Inception Date</td>
            <td class="expedition">Expiry Date</td>
            <td class="status">Status</td>
            <td class="actions">Actions</td>
          </tr>
        </thead>
        <!--Columnas de la tabla-->
        <tbody>
          <tr v-for="(item, i) in list" :key="i">
            <td class="ref" @click="setSubscriptionInfo(item)">
              <div class="ref" v-if="item.facultative_reference">
                {{
                  item.facultative_reference != undefined
                    ? item.facultative_reference
                    : "N/D"
                }}
              </div>
              <div class="ref" v-else>
                {{ item.reference != undefined ? item.reference : "N/D" }}
              </div>
            </td>
            <td class="country">
              {{ item.country != undefined ? item.country : "N/D" }}
            </td>
            <td class="risk">
              {{ item.risk_type != undefined ? item.risk_type : "N/D" }}
            </td>
            <td class="name">
              {{ item.submission_name ? item.submission_name : "N/D" }}
            </td>
            <td class="name">
              {{ item.broker_name ? item.broker_name : "N/D" }}
            </td>
            <td class="name">
              {{ item.cedent_name ? item.cedent_name : "N/D" }}
            </td>
            <td class="expedition">
              {{ formatDateMoment(item.created_at) }}
            </td>
            <td class="expedition">
              {{ formatDateMoment(item.inception_date) }}
            </td>
            <td class="expedition">
              {{ formatDateMoment(item.expiry_date) }}
            </td>
            <td class="status">
              {{ item.status }}
            </td>
            <td @click="ShowNotesHistory(item.id)" class="status">
              <v-icon>mdi-comment-outline</v-icon>
            </td>
          </tr>
        </tbody>
      </table>
      <ShowMoreButtonFacultative />
    </div>
    <!-- Stepper -->
    <AppStepper :steps="StepperData" />
    <!-- Close account -->
    <div class="full-container d-flex justify-end align-center">
      <AppCloseAccount
        iconColor="#003D6D"
        icon="mdi-content-copy"
        :closeAccountData="CloseAccountData"
        @close-account="closeAccountById($event)"
      />
    </div>
    <div class="ditrtibution-container mt-5">
      <div class="content">
        <!--Encabezado-->
        <div class="header-content">
          <div class="header">{{ title }}</div>
        </div>
        <div class="body-content">
          <InputPro />
          <Reinsurer
            v-for="(item, i) in ReinsurerArray"
            :key="i"
            :reinsurerIndex="i"
            :item="item"
          />
          <div class="reinsurer-actions">
            <v-btn
              text
              rounded
              class="delete-button"
              @click="deleteReinsurer()"
            >
              <v-icon class="mr-2 remove-button"> mdi-minus </v-icon>
              Remove
            </v-btn>
            <v-btn text rounded class="add-button" @click="addReinsurer()">
              <v-icon class="mr-2"> mdi-plus-circle </v-icon>
              Add New
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BarNavGeneral from "@/components/BarNavGeneral";
import AppCloseAccount from "@/application/components/AppCloseAccount";
import AppStepper from "@/application/components/AppStepper";
import InputPro from "./components/InputPro.vue";
import Reinsurer from "./components/Reinsurer.vue";
import { getReinsurer } from "./services/mock-distribution.service.js";
import moment from "moment";
import ShowMoreButtonFacultative from "./ShowMoreButtonFacultative.vue";
// Services
import { BarNavData } from "./services/mock-bar-nav.service.js";
import { GetCloseAccount } from "./services/mock-get-close-account.service";
import { GetStepper } from "./services/mock-get-stepper.service.js";

export default {
  name: "FacultativeDistributionView",
  components: {
    AppCloseAccount,
    BarNavGeneral,
    AppStepper,
    ShowMoreButtonFacultative,
    InputPro,
    Reinsurer,
  },
  data() {
    return {
      pagination: {
        limit: 10,
        offset: 0,
        query3: "7",
        filterSearch3: "s.status_id",
      },
      BarNavData: [],
      StepperData: [],
      CloseAccountData: [],
      title: "PRO 22 - 00652 BIMBO",
      ReinsurerArray: [],
      // list: [
      //   {
      //     facultative_reference: "lalalala",
      //     reference: "yuyuyu",
      //     country: "Mexico",
      //     risk_type: "risk",
      //     submission_name: "Alfonso",
      //     broker_name: "Pedro",
      //     cedent_name: "Sandy",
      //     created_at: "12-12-2022",
      //     inception_date: "01-04-2023",
      //     expiry_date: "05-07-2024",
      //     status: "Complete",
      //     id: 1,
      //   }
      // ]
    };
  },
  computed: {
    ...mapState({
      list: (state) => state.subscription.table.list,
    }),
  },
  methods: {
    ...mapActions(["getSubscriptionList"]),
    formatDateMoment(dateToFormat) {
      if (dateToFormat) {
        return moment(String(dateToFormat)).utc().format("DD - MM - YYYY");
      } else {
        return dateToFormat;
      }
    },
    addReinsurer() {
      const lastElement = this.ReinsurerArray[this.ReinsurerArray.length - 1];
      const newReinsurer = {
        id: lastElement.id + 1,
        name: " ",
        line: " ",
        exposure: " ",
        premiumLine: " ",
        totalPremium: 8925000,
        reinsurerPremium: 20,
        DICReinsurer: "Yes",
        sluLine: 59.9,
        support: 8925000,
        premium: 8925000,
        sluLine2: 59.9,
        support2: 8925000,
        premium2: 8925000,
      };
      this.ReinsurerArray.splice(this.ReinsurerArray.length, 0, newReinsurer);
    },
    deleteReinsurer() {
      const lastElement = this.ReinsurerArray[this.ReinsurerArray.length - 1];
      this.ReinsurerArray = this.ReinsurerArray.filter(function (f) {
        return f.id !== lastElement.id;
      });
    },
    closeAccountById({ idOptionSelected }) {},
  },
  async beforeMount() {
    this.getSubscriptionList(this.pagination);
    this.ReinsurerArray = await getReinsurer();
    this.BarNavData = await BarNavData();
    this.CloseAccountData = await GetCloseAccount();
    this.StepperData = await GetStepper();
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/global.less";
@import "~@/assets/style/Subscription/Table.less";

.text-style {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 17.6px;
}
.ditrtibution-container {
  width: 100%;
  height: auto;
  @media (max-width: 650px) {
    overflow-x: hidden;
  }

  .content {
    width: 100%;
    height: auto;
    border-radius: 5px;
    background: white;
    //box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
    margin-top: 28px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: center;
    padding: 0 20px;
    @media (max-width: 650px) {
      overflow-x: auto !important;
    }
    //CABEZA DE LA TABLA
    .header-content {
      width: 100%;
      height: 35px;
      margin-top: 28px;
      display: flex;

      justify-content: flex-start;
      align-content: center;

      .header {
        width: 100%;
        height: 100%;
        font-weight: bold;
        font-size: 20px;
        display: flex;
        justify-content: flex-start;
        align-content: center;
      }
    }

    .body-content {
      width: 100%;
      height: auto;
      padding-top: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      align-content: flex-start;
      flex-wrap: wrap;
      padding-bottom: 10px;
    }
    .reinsurer-actions {
      display: flex;
      flex-direction: column;
      .add-button {
        color: #003d6d;
      }
      .remove-button {
        background: #d2deed;
        color: #003d6d;
        border-radius: 5px;
      }
    }
    .v-btn {
      border-radius: 5px;
      justify-content: flex-start !important;
      color: #003d6d;
    }
  }
}
</style>
