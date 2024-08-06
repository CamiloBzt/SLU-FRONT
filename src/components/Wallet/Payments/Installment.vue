<template>
  <v-expansion-panels class="ExpansionComponent ExpansionBordered mt-7">
    <v-expansion-panel>
      <v-expansion-panel-header @click="changeStateExpansive()" class="ExpansionTitle" expand-icon="">
        <!--Titulo del acordeon-->
        Installment
        <div class="ExpansionState HideOnMovil">
          {{ stateExpansiveMessage }}
        </div>
        <template v-slot:actions>
          <v-icon class="iconExpand">
            {{ iconExpansive }}
          </v-icon>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent justify-center">
          <div class="Table">
            <div class="Line BorderBottom">
              <div class="Row CheckBox" />
              <div class="Row font-weight-bold">
                Installment
              </div>
              <div class="Row font-weight-bold">
                Bound Date
              </div>
              <div class="Row font-weight-bold">
                Payment Date
              </div>
              <div class="Row font-weight-bold">
                Percent
              </div>
              <div class="Row font-weight-bold">
                Invoice
              </div>
            </div>

            <div class="Line">
              <div class="Row CheckBox">
                <v-checkbox color="#003D6D" v-model="checkPayment.value1.active" />
              </div>
              <div class="Row align-center">
                <v-text-field value="Installment 1" v-model="boundEng.instalation1" />
              </div>

              <div class="Row align-center">
                <v-text-field disabled v-model="boundEng.ppw1" />
              </div>
              <div class="Row align-center">
                <v-menu v-model="menuCalendar1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="checkPayment.value1.paymentDate" readonly v-bind="attrs" v-on="on" />
                  </template>
                  <v-date-picker v-model="checkPayment.value1.paymentDate" @input="menu = false"></v-date-picker>
                </v-menu>
              </div>

              <div class="Row align-center">
                <v-text-field v-model="checkPayment.value1.porcentaje" suffix="%" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="checkPayment.value1.value" />
              </div>
            </div>

            <div class="Line">
              <div class="Row CheckBox">
                <v-checkbox color="#003D6D" v-model="checkPayment.value2.active" />
              </div>
              <div class="Row align-center">
                <v-text-field value="Installment 2" v-model="boundEng.instalation2" />
              </div>

              <div class="Row align-center">
                <v-text-field disabled v-model="boundEng.ppw2" />
              </div>
              <div class="Row align-center">
                <v-menu v-model="menuCalendar2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="checkPayment.value2.paymentDate" readonly v-bind="attrs" v-on="on" />
                  </template>
                  <v-date-picker v-model="checkPayment.value2.paymentDate" @input="menu = false"></v-date-picker>
                </v-menu>
              </div>

              <div class="Row align-center">
                <v-text-field v-model="checkPayment.value2.porcentaje" suffix="%" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="checkPayment.value2.value" />
              </div>
            </div>

            <div class="Line">
              <div class="Row CheckBox">
                <v-checkbox color="#003D6D" v-model="checkPayment.value3.active" />
              </div>
              <div class="Row align-center">
                <v-text-field value="Installment 3" v-model="boundEng.instalation3" />
              </div>

              <div class="Row align-center">
                <v-text-field disabled v-model="boundEng.ppw3" />
              </div>
              <div class="Row align-center">
                <v-menu v-model="menuCalendar3" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="checkPayment.value3.paymentDate" readonly v-bind="attrs" v-on="on" />
                  </template>
                  <v-date-picker v-model="checkPayment.value3.paymentDate" @input="menu = false"></v-date-picker>
                </v-menu>
              </div>

              <div class="Row align-center">
                <v-text-field v-model="checkPayment.value3.porcentaje" suffix="%" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="checkPayment.value3.value" />
              </div>
            </div>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { stateExpansiveManager } from '@/mixins/subscription.js';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'InstallmentWallet',
  mixins: [stateExpansiveManager],
  data() {
    return {
      menuCalendar1: false,
      paymentDate1: '',

      menuCalendar2: false,
      paymentDate2: '',

      menuCalendar3: false,
      paymentDate3: '',
    };
  },
  computed: {
    ...mapGetters(['boundEng', 'subscription_id', 'checkPayment']),
  },
  async mounted() {
    await this.checkSubscriptionStored();
    await this.updateBoundType(1);
    await this.getBoundInformation();
    await this.getInstallment();
    console.log(this.boundEng);
  },
  methods: {
    ...mapActions(['updateBoundType', 'getBoundInformation', 'checkSubscriptionStored', 'fieldWalletPayment', 'getInstallment']),
  },
  watch: {
    'checkPayment.value1.paymentDate': function() {
      this.fieldWalletPayment({ pay: this.checkPayment.value1.paymentDate, field: 'payment_date1' });
    },
    'checkPayment.value2.paymentDate': function() {
      this.fieldWalletPayment({ pay: this.checkPayment.value2.paymentDate, field: 'payment_date2' });
    },
    'checkPayment.value3.paymentDate': function() {
      this.fieldWalletPayment({ pay: this.checkPayment.value3.paymentDate, field: 'payment_date3' });
    },
    'checkPayment.value1.porcentaje': function() {
      this.fieldWalletPayment({ pay: this.checkPayment.value1.porcentaje, field: 'percent1' });
    },
    'checkPayment.value2.porcentaje': function() {
      this.fieldWalletPayment({ pay: this.checkPayment.value2.porcentaje, field: 'percent2' });
    },
    'checkPayment.value3.porcentaje': function() {
      this.fieldWalletPayment({ pay: this.checkPayment.value3.porcentaje, field: 'percent3' });
    },
    'checkPayment.value1.value': function() {
      this.fieldWalletPayment({ pay: this.checkPayment.value1.value, field: 'invoice1' });
    },
    'checkPayment.value2.value': function() {
      this.fieldWalletPayment({ pay: this.checkPayment.value2.value, field: 'invoice2' });
    },
    'checkPayment.value3.value': function() {
      this.fieldWalletPayment({ pay: this.checkPayment.value3.value, field: 'invoice3' });
    },
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
/*
Clases que usamos varias veces en este componente
*/
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.BorderBottom {
  border-bottom: 1px solid #d2deed;
  margin-bottom: 15px;
}
//Centrar inputs con clase .align-right
::v-deep .align-right .v-input input {
  text-align: right;
}
::v-deep .align-center .v-input input {
  text-align: center;
}

/*
Estilos de la tabla
*/
.Table {
  width: 70%;
  height: auto;

  //Hileras
  .Line:not(:first-child) {
    margin-top: 17px;
  }
  .Line {
    .flex();
    width: 100%;
    height: 50px;
    justify-content: space-between;

    //Celdas
    .Row {
      .flex();
      width: 18%;
      height: 100%;
      margin-right: 5px;
    }
    .CheckBox {
      width: 30px;
      justify-content: flex-end;
      align-content: flex-start;
      align-items: flex-start;
      .v-input--checkbox {
        margin-top: 2px;
      }
    }
  }
}
</style>
