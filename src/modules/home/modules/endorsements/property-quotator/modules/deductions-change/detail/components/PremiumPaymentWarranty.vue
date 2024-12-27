<template>
  <div class="Cont">
    <div class="InputsCont d-flex flex-wrap align-start">
      <div
        v-for="(payment, index) in paymentsWarranty"
        :key="index"
        class="Line d-flex justify-space-between align-center"
      >
        <div class="Row">
          <v-text-field
            @change="
              updatePayment({
                id: payment.id,
                column: 'installment',
                value: payment.installment,
                index: payment.index,
              })
            "
            v-model="payment.installment"
            :label="'Installment ' + (index + 1)"
            type="number"
          />
        </div>
        <div class="Row">
          <v-text-field
            @change="
              updatePayment({
                id: payment.id,
                column: 'percent',
                value: payment.percent,
                index: payment.index,
              })
            "
            v-model="payment.percent"
            label="Percentage"
            type="number"
          />
        </div>
        <div class="Row">
          <v-menu
            v-model="payment.showCalendar"
            :close-on-content-click="false"
            offset-y
            min-width="auto"
            content-class="elevation-3"
            transition="scale-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="payment.date"
                label="PPW Due Date"
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker
              no-title
              color="#003D6D"
              v-model="payment.date"
              @change="
                updatePayment({
                  id: payment.id,
                  column: 'ppw_date',
                  value: payment.date,
                  index: payment.index,
                })
              "
              @input="payment.showCalendar = false"
            />
          </v-menu>
        </div>
        <div class="Row">
          <v-select
            @change="
              updatePayment({
                id: payment.id,
                column: 'id_payment_clause',
                value: payment.idClause + '',
                index: payment.index,
              })
            "
            v-model="payment.idClause"
            label="Clause"
            item-value="id"
            item-text="clause"
            :items="clauseList"
          />
        </div>
        <div class="Row">
          <v-text-field
            @change="
              updatePayment({
                id: payment.id,
                column: 'daysOfPriorNotice',
                value: payment.daysOfPriorNotice,
                index: index + 1,
              })
            "
            v-model="payment.daysOfPriorNotice"
            label="Days of prior notice"
            type="number"
          />
        </div>

        <div class="remove-button">
          <v-btn
            text
            @click="
              [
                removePaymentWarranty(payment.index),
                deletePayment(payment.id, payment.index),
              ]
            "
          >
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </div>
      </div>
      <div class="finishButtonCont d-flex justify-start align-center">
        <v-btn
          :disabled="addPaymentDisabled"
          rounded
          large
          text
          class="finishBtn"
          @click="addPaymentWarranty()"
        >
          Add New
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PaymentService from "@/modules/home/services/payments.service";
import AccountCompleteService from "@/modules/home/services/account-complete.service";

export default {
  name: "PremiumPaymentWarranty",
  // inject: ['deepDisabled'],
  data() {
    return {
      subscriptionId: this.$route.params.id,
      clauseList: [],
      paymentsWarranty: [],
      addPaymentDisabled: false,
      menu: false,
      exampleCalendar: "",
      datasUpdate: [],
      quotation: {},
      accountComplete: {},
    };
  },

  async beforeMount() {
    this.clauseList = await PaymentService.getClauses();
    this.paymentsWarranty = await PaymentService.getPayments(
      this.subscriptionId
    );
    console.log("this.paymentsWarranty", this.paymentsWarranty);
    this.accountComplete =
      await AccountCompleteService.getLastAccountCompleteByIdSubscription(
        this.subscriptionId
      );
    this.quotation = {
      inceptionDate: this.accountComplete.deductibles.inceptionDate,
    };
    console.log("this.quotation", this.quotation);
  },
  mounted() {
    // this.deepDisabled()
  },

  computed: {
    // ...mapGetters([
    //   'subscription_id',
    // ]),
  },

  methods: {
    sumarDias(index) {
      const subscriptionId = this.subscriptionId;

      // Obtener el objeto de pago correspondiente
      const payment = this.paymentsWarranty.find((p) => p.index === index);

      // Obtener la cantidad de días a sumar
      const dias = +payment.installment;

      // Crear un objeto de fecha
      const arrDate = this.quotation.inceptionDate.split("-");
      const resultado = new Date(
        `${arrDate[1]}-${arrDate[2].slice(0, 2)}-${arrDate[0]}`
      );

      // Agregar la cantidad de días indicada a la fecha
      resultado.setDate(resultado.getDate() + dias);

      // Actualizar la fecha
      payment.date = resultado.toISOString().slice(0, 10);

      // Guardar en BD
      // this.updatePayment({
      //   id: payment.id,
      //   column: 'ppw_date',
      //   value: payment.date,
      //   index: index
      // })

      // Guardar en datasUpdate antes de guardar en BD
      this.datasUpdate = [
        ...this.datasUpdate,
        {
          id: payment.id,
          column: "ppw_date",
          value: payment.date,
          index: index,
          typeOfOperation: "addOrUpdate",
          subscriptionId,
        },
      ];
      this.$emit("datasReceive", this.paymentsWarranty);
    },

    async updatePayment({ id, column, value, index }) {
      const subscriptionId = this.subscriptionId;

      // Actualizar en datasUpdate para no actualizar en BD aún
      this.datasUpdate = [
        ...this.datasUpdate,
        {
          id,
          column,
          value,
          index,
          subscriptionId,
          typeOfOperation: "addOrUpdate",
        },
      ];
      this.$emit("datasReceive", this.paymentsWarranty);

      // Actualizar o agregar
      // const paymentResponse = await PaymentService.addOrUpdatePayment({
      //   id, column, value
      // }, index, subscriptionId)

      // asignar el id al objeto payment si el id es nulo
      // if (id === null) {
      //   const payment = this.paymentsWarranty[index - 1];
      //   console.log(paymentResponse.id)
      //   payment.id = paymentResponse.id
      // }

      // sumar los dias
      if (column === "installment") {
        // const paymentId = id || paymentResponse.id
        this.sumarDias(index);
      }
    },

    async deletePayment(id, index) {
      // Eliminar en datasUpdate para no eliminar en BD aún
      const subscriptionId = this.subscriptionId;
      this.datasUpdate = [
        ...this.datasUpdate,
        { id, subscriptionId, typeOfOperation: "deletePayment", index },
      ];

      this.paymentsWarranty = this.paymentsWarranty.map((payment, index) => {
        // return payment.index = index + 1
        return {
          ...payment,
          index: index + 1,
        };
      });

      this.$emit("datasReceive", this.paymentsWarranty);
      if (id) {
        this.$emit("deleteInstallment", id);
      }
      // await PaymentService.deletePayment(id, subscriptionId)
    },

    addPaymentWarranty() {
      // setear la fecha por default

      // Crear un objeto de fecha
      const arrDate = this.quotation.inceptionDate.split("-");
      const resultado = new Date(
        `${arrDate[1]}-${arrDate[2].slice(0, 2)}-${arrDate[0]}`
      );

      // Actualizar la fecha
      const defaultDate = resultado.toISOString().slice(0, 10);

      if (this.paymentsWarranty.length < 3) {
        const totalPaymentsSaved = this.paymentsWarranty.length;
        const newPayment = {
          id: null,
          index: totalPaymentsSaved + 1,
          installment: "",
          percent: "",
          date: defaultDate,
          idClause: "",
          daysOfPriorNotice: "",
          showCalendar: false,
        };
        const addPayments = [...this.paymentsWarranty, newPayment];
        this.paymentsWarranty = addPayments;
        this.datasUpdate = [...this.datasUpdate, newPayment];
      }
      if (this.paymentsWarranty.length === 3) this.addPaymentDisabled = true;

      this.$emit("datasReceive", this.paymentsWarranty);
    },

    removePaymentWarranty(indexToDelete) {
      const newArray = this.paymentsWarranty.filter(
        (item) => item.index !== indexToDelete
      );
      this.paymentsWarranty = newArray;
      if (this.paymentsWarranty.length < 3) this.addPaymentDisabled = false;
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/Subscription/Bound.less";

.Cont {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: flex-start;
  flex-direction: column;
  padding-bottom: 15px;

  .InputsCont {
    width: 65%;
    height: auto;
    row-gap: 15px;

    .Line {
      width: 100%;
      height: 50px;

      .Row {
        width: calc(24% - 20px);
        height: 50px;
      }

      .remove-button {
        width: 50px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        align-content: flex-end;

        i {
          color: #003d6d;
        }
      }
    }
  }
}

button.v-btn--disabled {
  opacity: 0.5 !important;
}

.theme--light.v-btn.v-btn--disabled {
  color: white !important;
}
</style>
