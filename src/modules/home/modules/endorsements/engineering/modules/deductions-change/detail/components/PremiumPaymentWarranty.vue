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
            :label="'Installment ' + (index + 1) + '*'"
            type="number"
            :readonly="readonly"
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
            label="Percentage*"
            type="number"
            :readonly="readonly"
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
                label="PPW Due Date*"
                v-bind="attrs"
                v-on="on"
                :readonly="readonly"
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
              :readonly="readonly"
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
            label="Clause*"
            item-value="id"
            item-text="clause"
            :items="clauseList"
            :readonly="readonly"
          />
        </div>
        <div class="Row">
          <v-text-field
            v-if="isLSWClause(payment.idClause)"
            @change="
              updatePayment({
                id: payment.id,
                column: 'days_of_prior_notice',
                value: payment.days_of_prior_notice,
                index: index + 1,
              })
            "
            v-model="payment.days_of_prior_notice"
            label="Days of prior notice*"
            type="number"
            :readonly="readonly"
          />
        </div>

        <div class="remove-button" v-if="!readonly">
          <v-btn
            text
            @click="
              [removePaymentWarranty(payment.id), deletePayment(payment.id)]
            "
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </div>
      <div
        class="finishButtonCont d-flex justify-start align-center"
        v-if="!readonly"
      >
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

export default {
  name: "PremiumPaymentWarranty",

  props: {
    readonly: {
      type: Boolean,
      default: false,
    },
    installments: {
      type: Array,
      default: () => [],
    },
    clauseList: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      subscriptionId: null,
      clauseList: [],
      paymentsWarranty: [],
      addPaymentDisabled: false,
      menu: false,
      exampleCalendar: "",
    };
  },

  async created() {
    if (this.readonly) {
      this.paymentsWarranty = [...this.installments];
      this.internalClauseList = [...this.clauseList];
    } else {
      this.subscriptionId = this.getSubscriptionIdFromRoute();

      if (!this.subscriptionId) {
        console.error(
          "No se pudo obtener subscriptionId de la ruta:",
          this.$route.params
        );
        return;
      }

      await this.loadInitialData();
    }
  },

  computed: {
    effectiveClauseList() {
      return this.readonly ? this.internalClauseList : this.internalClauseList;
    },
  },

  watch: {
    "$route.params": {
      handler(newParams) {
        const newSubscriptionId = this.getSubscriptionIdFromRoute();
        if (newSubscriptionId && newSubscriptionId !== this.subscriptionId) {
          this.subscriptionId = newSubscriptionId;
          this.loadInitialData();
        }
      },
      deep: true,
    },
  },

  methods: {
    /**
     * Obtiene el subscriptionId desde los parámetros de la ruta
     */
    getSubscriptionIdFromRoute() {
      const params = this.$route.params;
      return params.subscriptionId || params.id || null;
    },

    /**
     * Carga los datos iniciales del componente
     */
    async loadInitialData() {
      try {
        this.clauseList = await PaymentService.getClauses();
        this.paymentsWarranty = await PaymentService.getPayments(
          this.subscriptionId
        );

        this.$emit("originalInstallmentsReceive", [...this.paymentsWarranty]);

        this.emitDataToParent();

        this.addPaymentDisabled = this.paymentsWarranty.length === 3;
      } catch (error) {
        console.error("Error cargando datos iniciales:", error);
      }
    },

    emitDataToParent() {
      this.$emit("datasReceive", [...this.paymentsWarranty]);
    },

    isLSWClause(idClause) {
      const clause = this.effectiveClauseList.find((cl) => cl.id === idClause);
      return clause && clause.clause.includes("LSW");
    },

    async updatePayment({ id, column, value, index }) {
      if (this.readonly) return;

      const subscriptionId = this.subscriptionId;

      if (!subscriptionId) {
        console.error("subscriptionId no disponible para updatePayment");
        return;
      }

      try {
        const paymentResponse = await PaymentService.addOrUpdatePayment(
          { id, column, value },
          index,
          subscriptionId
        );

        if (id === null) {
          const payment = this.paymentsWarranty[index - 1];
          payment.id = paymentResponse.id;
        }

        this.emitDataToParent();
      } catch (error) {
        console.error("Error actualizando pago:", error);
      }
    },

    async deletePayment(id) {
      if (this.readonly) return;

      const subscriptionId = this.subscriptionId;

      if (!subscriptionId) {
        console.error("subscriptionId no disponible para deletePayment");
        return;
      }

      try {
        await PaymentService.deletePayment(id, subscriptionId);
      } catch (error) {
        console.error("Error eliminando pago:", error);
      }
    },

    addPaymentWarranty() {
      if (this.readonly) return;

      if (this.paymentsWarranty.length < 3) {
        const totalPaymentsSaved = this.paymentsWarranty.length;

        const defaultDate = new Date().toISOString().substr(0, 10);

        const newPayment = {
          id: null,
          paymentIndex: totalPaymentsSaved + 1,
          installment: "",
          percent: "",
          date: defaultDate,
          idClause: "",
          days_of_prior_notice: "",
          showCalendar: false,
        };

        this.paymentsWarranty = [...this.paymentsWarranty, newPayment];

        this.emitDataToParent();
      }

      if (this.paymentsWarranty.length === 3) {
        this.addPaymentDisabled = true;
      }
    },

    removePaymentWarranty(idToDelete) {
      if (this.readonly) return;

      const newArray = this.paymentsWarranty.filter(
        (item) => item.id !== idToDelete
      );

      this.paymentsWarranty = newArray;

      if (this.paymentsWarranty.length < 3) {
        this.addPaymentDisabled = false;
      }

      this.$emit("deleteInstallment", idToDelete);

      this.emitDataToParent();
    },

    getClauseName(idClause) {
      const clause = this.effectiveClauseList.find((cl) => cl.id === idClause);
      return clause ? clause.clause : "Unknown Clause";
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
