<template>
  <div class="SubscriptionTable mt-5">
    <!--TITULO DE LA TABLA-->
    
    <div class="TableTitle d-flex justify-space-between align-center">
      <!--TITULO-->
      <div class="title">
        Cedents
      </div>
      <div class="finishButtonCont mt-4 d-flex justify-end align-center">
        <v-btn
          rounded
          outlined
          large
          class="finishBtn"
          @click="goToCreate(undefined)"
        >
          Create Cedent
        </v-btn>
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
    
    <div class="TableContent"  ref="TableContent">
      
      <!--CABEZA DE LA TABLA-->
      <div class="TableHeadContent mt-7 d-flex justify-start align-start">
        <!--NOMBRES DE LAS COLUMNAS-->
        <div class="TableHeadName row1 d-flex justify-start align-center">
          ID
        </div>
        <div class="TableHeadName row2 d-flex justify-start align-center">
          Name
        </div>
        <!-- <div class="TableHeadName row3 d-flex justify-start align-center">
          Email
        </div> -->
        <div class="TableHeadName row4 d-flex justify-start align-center">
          Country
        </div>
        <!-- <div class="TableHeadName row5 d-flex justify-start align-center">
          Company
        </div> -->
        <div class="TableHeadName row6 d-flex justify-start align-center">
          Actions 
        </div>
        <!-- <div class="TableHeadName row8"/> -->
      </div>

      <!--CUERPO DE LA TABLA-->
      <div class="TableBodyContent mt-4">
        <!-- AQUI EMPIEZA EL CICLO A ITERAR PARA MOSTRAR LAS FILAS DE LA TABLA -->
        <div class="TableContentInner scrollable">
          <div v-for="(item, i) in list" :key="i" class="TableBodyContSn d-flex justify-start align-start" :style="{ width: tableBodyContSnWidth > 0 ? `${tableBodyContSnWidth}px` : '100%' }">
            <!--INFORMACIÓN DE LA TABLA-->
            <div class="TableBodyTextLink d-flex row1 justify-start align-center" @click="setSubscriptionInfo(item)">
              {{ item.id != undefined ? item.id : 'N/D' }}
            </div>
            <div class="TableBodyText d-flex row2 justify-start align-center">
              {{ item.name != undefined ? item.name : 'N/D' }}
            </div>
            <!-- <div class="TableBodyText d-flex row3 justify-start align-center">
              {{ item.email != undefined ? item.email : 'N/D' }}
            </div> -->
            <div class="TableBodyText d-flex row4 justify-start align-center">
              {{ item.country != undefined ? item.country : 'N/D' }}
            </div>
            <!-- <div class="TableBodyText d-flex row5 justify-start align-center">
              {{ item.company != undefined ? item.company : 'N/D' }}
            </div> -->
            <div class="TableBodyText d-flex row6 justify-start align-center">
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <div 
                    class="Button__Action"
                    @click="goToCreate(item)"
                    v-bind="attrs" v-on="on"
                    icon
                    >
                    <v-icon>
                      mdi-pencil-outline
                    </v-icon>
                  </div>
                </template>

                <span>Edit Cedent</span>
              </v-tooltip>

              <v-tooltip right class="Tooltip">
                <template v-slot:activator="{ on, attrs }">
                  <div 
                    class="Button__Action"
                    @click="dialog = true, cedent = (item)"
                    v-bind="attrs" v-on="on"
                    icon
                    >
                    <v-icon>
                      mdi-delete-outline
                    </v-icon>
                  </div>
                </template>
                <span>Delete Cedent</span>
              </v-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template>
       <v-dialog
          v-model="dialog"
          max-width="400"
        >
          <v-card>
            <v-card-title class="text-h5">
              Are you sure you want to delete cedent?
            </v-card-title>
            <v-card-actions class="d-flex justify-center">
              <v-btn
                rounded
                depressed
                class="btn-secondary"
                @click="deleteCedent(cedent), dialog= false"
              >
                Yes
              </v-btn>

              <v-btn
                rounded
                depressed
                class="btn-finish"
                outlined
                @click="dialog = false"
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
import { mapActions, mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'UsersTable',
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
          refNumber: 'Ref number',
          country: 'Country',
          typeOfRisk: 'Type of Risk ',
          Broker: 'Broker',
          inceptionDate: 'Inception date',
          expiringDate: 'Expiring date',
          status: 'status',
        },
      ],
      tableBodyContSnWidth: 0
    };
  },
  computed: {
    ...mapState({
      list: (state) => state.auth.list,
    }),
  },
  methods: {
    ...mapActions(['getCedentsList', 'resendMail', 'deleteCedent']),
    moveRightTable() {
      this.sideScroll('right', 25, 100, 10);
    },
    moveLeftTable() {
      this.sideScroll('left', 25, 100, 10);
    },
    goToCreate(item = undefined) {
      this.$router.push({ name: 'create-cedent', query: {cedentId: item ? item.id : 0 } })
    },
    sideScroll(direction, speed, distance, step) {
      var container = document.querySelector('.TableContent');
      var scrollAmount = 0;
      var slideTimer = setInterval(function() {
        if (direction == 'left') {
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
      console.log('Carga de item', item);
      this.loadSubscription(item);
      this.$router.push(`/subscription/${item.id}/submission`);
    },
    formatDateMoment(dateToFormat) {
      if (dateToFormat) {
        const date = moment(dateToFormat);
        const day = date.format('DD');
        const month = date.format('MM');
        const year = date.format('YYYY');
        const hour = date.format('HH:mm').toUpperCase();
        return `${day} - ${month} - ${year}`;
      } else {
        return dateToFormat;
      }
    },
  },
  beforeMount() {
    this.$emit("startLoading");

    this.getCedentsList().then(
      () => {
        this.$emit("finishLoading", "loading");
      }
    );
  },
  mounted() {
    this.tableBodyContSnWidth = this.$refs.TableContent.offsetWidth
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/global.less";
@import '~@/assets/style/Subscription/Table.less';
// Controla el ancho de cada columna empezando por ref number
.row1{width: 5% !important; padding-left: 15px;}
.row2{width: 20% !important;}
.row3{width: 17.5% !important;}
.row4{width: 20% !important;}
.row5{width: 15% !important;}
.row6{
  width: 15% !important;
  i {
    color: #D2DEED !important;
  }
}

.Button__Action{
  height: 100%;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}


</style>
