<template>
  <div class="Cont">
    <div class="TitleCont d-flex justify-start align-center flex-wrap">
      <h5>Premium Payment Warranty</h5>
    </div>

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
                index: index + 1,
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
                index: index + 1,
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
                  index: index + 1,
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
                index: index + 1,
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
              [removePaymentWarranty(payment.id), deletePayment(payment.id)]
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
import { getAnalysisById } from "./services/InputsRiskQuotator/inputs-risk-quotator.service.js";
import PaymentService from "@/modules/home/services/payments.service";

export default {
  name: "PremiumPaymentWarranty",
  inject: ["deepDisabled"],
  data() {
    return {
      subscriptionId: this.$route.params.subscriptionId,
      clauseList: [],
      paymentsWarranty: [],
      addPaymentDisabled: false,
      menu: false,
      exampleCalendar: "",
    };
  },

  async beforeMount() {
    this.clauseList = await PaymentService.getClauses();
    this.paymentsWarranty = await PaymentService.getPayments(
      this.subscriptionId
    );
    const analysisServices = await getAnalysisById({
      id_subscription: this.subscriptionId,
    });
    this.quotation = {
      inceptionDate: analysisServices.Quotation.inception_date,
    };
  },

  computed: {
    ...mapGetters(["quotation"]),
  },

  methods: {
    sumarDias(id, index) {
      // Obtener el objeto de pago correspondiente
      const payment = this.paymentsWarranty.find((p) => p.id === id);

      // Obtener la cantidad de días a sumar
      const dias = +payment.installment;

      // Crear un objeto de fecha
      const arrDate = this.quotation.inceptionDate.split("-");
      const resultado = new Date(`${arrDate[1]}-${arrDate[2]}-${arrDate[0]}`);

      // Agregar la cantidad de días indicada a la fecha
      resultado.setDate(resultado.getDate() + dias);

      // Actualizar la fecha
      payment.date = resultado.toISOString().slice(0, 10);

      // Guardar en BD
      this.updatePayment({
        id: payment.id,
        column: "ppw_date",
        value: payment.date,
        index: index,
      });
    },

    async updatePayment({ id, column, value, index }) {
      const subscriptionId = this.subscriptionId;
      const paymentResponse = await PaymentService.addOrUpdatePayment(
        {
          id,
          column,
          value,
        },
        index,
        subscriptionId
      );

      // asignar el id al objeto payment si el id es nulo
      if (id === null) {
        const payment = this.paymentsWarranty[index - 1];
        payment.id = paymentResponse.id;
      }

      // sumar los dias
      if (column === "installment") {
        const paymentId = id || paymentResponse.id;
        this.sumarDias(paymentId, index);
      }
    },

    async deletePayment(id) {
      const subscriptionId = this.subscriptionId;
      await PaymentService.deletePayment(id, subscriptionId);
    },

    addPaymentWarranty() {
      // setear la fecha por default
      const defaultDate = this.quotation.inceptionDate;

      if (this.paymentsWarranty.length < 4) {
        const totalPaymentsSaved = this.paymentsWarranty.length;
        const newPayment = {
          id: null,
          paymentIndex: totalPaymentsSaved + 1,
          installment: "",
          percent: "",
          date: defaultDate,
          idClause: "",
          daysOfPriorNotice: "",
          showCalendar: false,
        };
        const addPayments = [...this.paymentsWarranty, newPayment];
        this.paymentsWarranty = addPayments;
      }
      if (this.paymentsWarranty.length === 4) this.addPaymentDisabled = true;
    },

    removePaymentWarranty(idToDelete) {
      const newArray = this.paymentsWarranty.filter(
        (item) => item.id !== idToDelete
      );
      this.paymentsWarranty = newArray;
      if (this.paymentsWarranty.length < 4) this.addPaymentDisabled = false;
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
.finishBtn {
  background: #003d6d;
  color: white;
  height: 40px;
  width: 200px;
  font-size: 15px;
}
button.v-btn--disabled {
  opacity: 0.5 !important;
}
.theme--light.v-btn.v-btn--disabled {
  color: white !important;
}
</style>
