<template>
  <div class="SubscriptionTable mt-5">
    <!--TITULO DE LA TABLA-->
    <div class="TableTitle d-flex justify-space-between align-center">
      <!--TITULO-->
      Accounts to be renewed

      <div
        class="
          TableControlsCont
          ShowFlexOnMovil
          justify-space-between
          align-center
        "
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

    <div class="TableContent">
      <!--CABEZA DE LA TABLA-->
      <div class="TableHeadContent mt-7 d-flex justify-start align-start">
        <!--NOMBRES DE LAS COLUMNAS-->
        <div class="TableHeadName d-flex justify-start align-center row1">
          Ref Number
        </div>
        <div class="TableHeadName d-flex justify-start align-center row2">
          Country
        </div>
        <div class="TableHeadName d-flex justify-start align-center row3">
          Line of Risk
        </div>
        <div class="TableHeadName d-flex justify-start align-center row4">
          Broker
        </div>
        <div class="TableHeadName d-flex justify-start align-center row5">
          Inception Date
        </div>
        <div class="TableHeadName d-flex justify-start align-center row6">
          Expiring Date
        </div>
        <div class="TableHeadName d-flex justify-start align-center row7">
          Status
        </div>
        <div class="TableHeadName d-flex justify-start align-center row8">
          Notes
        </div>
      </div>

      <!--CUERPO DE LA TABLA-->
      <div class="TableBodyContent mt-4">
        <!--
					AQUI EMPIEZA EL CICLO A ITERAR 
					PARA MOSTRAR LAS FILAS DE LA TABLA
				-->
        <div class="TableContentInner scrollable">
          <div
            v-for="(item, i) in list"
            :key="i"
            class="TableBodyContSn d-flex justify-start align-start"
          >
            <!--INFORMACIÓN DE LA TABLA-->
            <div
              class="TableBodyTextLink d-flex justify-start align-center row1"
              @click="createRenewalAccount({ id: item.id, section: 'bound' })"
            >
              {{ item.reference != undefined ? item.reference : 'N/D' }}
            </div>
            <div class="TableBodyText d-flex justify-start align-center row2">
              {{ item.country != undefined ? item.country : 'N/D' }}
            </div>
            <div class="TableBodyText d-flex justify-start align-center row3">
              {{ item.risk_type != undefined ? item.risk_type : 'N/D' }}
            </div>
            <div class="TableBodyText d-flex justify-start align-center row4">
              {{ item.broker != undefined ? item.broker : 'N/D' }}
            </div>
            <div class="TableBodyText d-flex justify-start align-center row5">
              {{ formatDateMoment(item.created_at) }}
            </div>
            <div class="TableBodyText d-flex justify-start align-center row6">
              {{ formatDateMoment(item.created_at) }}
            </div>
            <div class="TableBodyText d-flex justify-start align-center row7">
              {{ item.status }}
            </div>
            <div
              @click="ShowNotesHistory(item.id)"
              class="TableBodyText d-flex justify-start align-center row8"
            >
              <v-icon>mdi-comment-outline</v-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Boton
    <div  class="ButtonTableCont d-flex justify-end align-center">
      <v-btn class="Btn" depressed rounded color="#003D6D">
      	See More Accounts
      </v-btn>
    </div>
    -->
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import moment from 'moment';
import { tableControl } from '@/mixins/subscription.js';
moment.locale('es');
export default {
  name: 'AccountsRenewals',
  data() {
    return {
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
    };
  },
  mixins: [tableControl],
  computed: {
    ...mapState({
      list: (state) => state.subscription.table.list,
    }),
  },
  methods: {
    ...mapActions([
      'getSubscriptionList',
      'loadSubscription',
      'createRenewalAccount',
    ]),
    ShowNotesHistory(idSubscription) {
      this.$emit('ShowNotesHistory', idSubscription);
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
    this.getSubscriptionList(this.pagination);
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/Subscription/Table.less';
/*
  Controla el ancho de cada columna empezando por ref number
*/
.row1 {
  width: 12% !important;
  padding-left: 15px;
}
.row2 {
  width: 12% !important;
}
.row3 {
  width: 18.5% !important;
}
.row4 {
  width: 10.5% !important;
}
.row5 {
  width: 14% !important;
}
.row6 {
  width: 14% !important;
}
// .row7{}
.row8 {
  width: 6.5% !important;
  cursor: pointer;
  i {
    color: #d2deed;
  }
}
</style>
