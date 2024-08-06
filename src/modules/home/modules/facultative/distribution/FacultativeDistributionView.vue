<template>
  <div>
    <BarNavGeneral 
      :NavContent="BarNavData"
    />
    <!-- Copy account -->
		<div class="full-container d-flex justify-end align-center mt-5">
			<AppCloseAccount 
				icon="mdi-close-circle"
				header="Reason to close account"
				:closeAccountData="CloseAccountData" 
				@close-account="closeAccountById($event)"
			/>
		</div>
    <!-- Tabla Facultative  -->
    <div class="TableContent tableStyle">
      <!--CABEZA DE LA TABLA-->
      <div class="TableHeadContent d-flex justify-start align-start">
        <!--NOMBRES DE LAS COLUMNAS-->
        <div class="TableHeadName d-flex justify-center align-center row1">
          Ref Number
        </div>
        <div class="TableHeadName d-flex justify-center align-center row1">
          Country
        </div>
        <div class="TableHeadName d-flex justify-center align-center row1">
          Line of Risk
        </div>
        <div class="TableHeadName d-flex justify-center align-center row1">
          Name
        </div>
        <div class="TableHeadName d-flex justify-center align-center row1">
          Broker
        </div>
        <div class="TableHeadName d-flex justify-center align-center row1">
          Cedent
        </div>
        <div class="TableHeadName d-flex justify-center align-center row1">
          Expedition Date
        </div>
        <div class="TableHeadName d-flex justify-center align-center row1">
          Inception Date
        </div>
        <div class="TableHeadName d-flex justify-center align-center row2">
          Expiry Date
        </div>
        <div class="TableHeadName d-flex justify-center align-center row1">
          Status
        </div>
        <div class="TableHeadName d-flex justify-center align-center row1">
          Actions
        </div>
      </div>

      <!--CUERPO DE LA TABLA-->
      <div class="TableBodyContent mt-4">
        <!--
        AQUI EMPIEZA EL CICLO A ITERAR 
        PARA MOSTRAR LAS FILAS DE LA TABLA
      -->
        <div class="TableContentInner scrollable" ref="tableContentInner">
          <div v-for="(item, i) in list" :key="i" class="TableBodyContSn d-flex justify-center align-start"
            :style="{ width: tableBodyContSnWidth > 0 ? `${tableBodyContSnWidth}px` : '100%' }">
            <!--INFORMACIÓN DE LA TABLA-->
            <div class="TableBodyTextLink d-flex justify-center align-center row3" @click="setSubscriptionInfo(item)">
              <div class="text-style" v-if="item.facultative_reference">
                {{ item.facultative_reference != undefined ? item.facultative_reference : 'N/D' }}
              </div>
              <div class="text-style" v-else>
                {{ item.reference != undefined ? item.reference : 'N/D' }}
              </div>
            </div>
            <div class="TableBodyText d-flex justify-center align-center row3">
              {{ item.country != undefined ? item.country : 'N/D' }}
            </div>
            <div class="TableBodyText d-flex justify-center align-center row3">
              {{ item.risk_type != undefined ? item.risk_type : 'N/D' }}
            </div>
            <div class="TableBodyText d-flex justify-center align-center row3">
              {{ item.submission_name ? item.submission_name : 'N/D' }}
            </div>
            <div class="TableBodyText d-flex justify-center align-center row3">
              {{ item.broker_name ? item.broker_name : 'N/D' }}
            </div>
            <div class="TableBodyText d-flex justify-center align-center row3">
              {{ item.cedent_name ? item.cedent_name : 'N/D' }}
            </div>
            <div class="TableBodyText d-flex justify-center align-center row3">
              {{ formatDateMoment(item.created_at) }}
            </div>
            <div class="TableBodyText d-flex justify-center align-center row3">
              {{ formatDateMoment(item.inception_date) }}
            </div>
            <div class="TableBodyText d-flex justify-center align-center row4">
              {{ formatDateMoment(item.expiry_date) }}
            </div>
            <div class="TableBodyText d-flex justify-center align-center row3">
              {{ item.status }}
            </div>
            <div @click="ShowNotesHistory(item.id)" class="TableBodyText d-flex justify-center align-center row3">
              <v-icon>mdi-comment-outline</v-icon>
            </div>
          </div>
        </div>
      </div>
      <ShowMoreButtonFacultative/>
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
            <v-btn text rounded class="delete-button" @click="deleteReinsurer()">
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
import { mapActions, mapState } from 'vuex';
import BarNavGeneral from "@/components/BarNavGeneral"
import AppCloseAccount from "@/application/components/AppCloseAccount"
import AppStepper from '@/application/components/AppStepper'
import InputPro from "./components/InputPro.vue";
import Reinsurer from "./components/Reinsurer.vue";
import { getReinsurer } from "./services/mock-distribution.service.js";
import moment from 'moment';
import ShowMoreButtonFacultative from './ShowMoreButtonFacultative.vue';

// Services
import { BarNavData } from './services/mock-bar-nav.service.js'
import { GetCloseAccount } from './services/mock-get-close-account.service'
import { GetStepper } from './services/mock-get-stepper.service.js'

export default {
  name: "FacultativeDistributionView",
  components: {
    AppCloseAccount,
		BarNavGeneral,
		AppStepper,
    ShowMoreButtonFacultative,
    InputPro,
    Reinsurer
  },
  data() {
    return {
      pagination: {
        limit: 10,
        offset: 0,
        query3: '7',
        filterSearch3: 's.status_id'
      },
      BarNavData:[],
			StepperData: [],
			CloseAccountData: [],
      title:'PRO 22 - 00652 BIMBO',
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
    ...mapActions(['getSubscriptionList']),
    formatDateMoment(dateToFormat) {
      if (dateToFormat) {
        return moment(String(dateToFormat)).utc().format('DD - MM - YYYY');
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
      const lastElement = this.ReinsurerArray[this.ReinsurerArray.length - 1]
      this.ReinsurerArray = this.ReinsurerArray.filter(function (f) {
        return f.id !== lastElement.id;
      });
    },
    closeAccountById ( { idOptionSelected } ) {}
  },
  async beforeMount() {
    this.getSubscriptionList(this.pagination);
    this.ReinsurerArray = await getReinsurer();
    this.BarNavData = await BarNavData()
		this.CloseAccountData = await GetCloseAccount()
		this.StepperData = await GetStepper()
  },
};
</script>

<style lang="less" scoped>
.tableStyle {
  background-color: white;
  border: none;
  border-radius: 16px;
}
.row1 {
  width: 9% !important;
  height: 4rem;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 17.6px;
}

.row2 {
  width: 10% !important;
  height: 4rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 17.6px;
}
.row3 {
  width: 9% !important;
  height: 4rem;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 17.6px;
}
.row4 {
  width: 10% !important;
  height: 4rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 17.6px;
}
.text-style {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
    border-radius: 15px;
    background: white;
    box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
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
    .reinsurer-actions{
      display: flex;
      flex-direction: column;
      .add-button {
        color: #003d6d;
      }
      .remove-button {
        background: #D2DEED;
        color: #003d6d;
        border-radius: 30px;
      }
    }
    .v-btn{
    justify-content: flex-start !important;
    color: #003d6d
  }
    
  }
}
</style>
