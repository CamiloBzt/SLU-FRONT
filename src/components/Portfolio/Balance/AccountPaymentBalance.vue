<template>
  <v-expansion-panels class="ExpansionComponent ExpansionBordered mt-6">
    <v-expansion-panel>
      <!--TITULO DEL ACORDEON-->
      <v-expansion-panel-header
        @click="changeStateExpansive()"
        class="ExpansionTitle"
        expand-icon=""
      >
        Account Payment Balance
        <div class="ExpansionState HideOnMovil">
          {{ stateExpansiveMessage }}
        </div>
        <template v-slot:actions>
          <v-icon class="iconExpand">
            {{ iconExpansive }}
          </v-icon>
        </template>
      </v-expansion-panel-header>
      <!--CONTENIDO DEL ACORDEON-->
      <v-expansion-panel-content>
        <div class="ExpandContent">
          <div class="LeftInputs">
            <div class="InputContent mb-3">
              <v-text-field label="Reference Numer" />
            </div>

            <div class="InputContent mb-3">
              <v-text-field label="Cedent" />
            </div>

            <div class="InputContent mb-3">
              <v-select label="Country" />
            </div>

            <div class="InputContent">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                offset-y
                min-width="auto"
                content-class="elevation-3"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="Inception Date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker no-title color="#003D6D" />
              </v-menu>
            </div>
          </div>

          <!-- Rate of Exchange -->
          <div class="RightInputs">
            <div class="ExchangeInfo mb-3">
              Rate of Exchange when the policy was issued<br />
              <b>1 USD = 20.18 MXN</b>
            </div>

            <div class="InputContent mb-3">
              <v-select label="Local Currency" />
            </div>
            <div class="InputContent mb-3">
              <v-text-field
                prefix="$"
                label="Rate of Exchange at the Payment Date"
              />
            </div>

            <div class="InputContent mb-3">
              <v-text-field label="Expected Payment in Local C." />
            </div>
            <div class="InputContent mb-3">
              <v-text-field label="Expected Payment in USD" />
            </div>

            <div class="InputContent mb-3">
              <v-text-field prefix="$" label="Payment Received in Local C." />
            </div>
            <div class="InputContent mb-3">
              <v-text-field prefix="$" label="Payment Received in USD" />
            </div>

            <div class="InputContent mb-3">
              <v-text-field prefix="$" label="Payment Gap in Local C." />
            </div>
            <div class="InputContent mb-3">
              <v-text-field prefix="$" label="Payment Gap un USD" />
            </div>
          </div>

          <div class="finishButtonCont mt-7 d-flex justify-end align-center">
            <v-btn rounded large text class="secondaryBtn"> Define </v-btn>
            <v-btn rounded large text outlined class="finishBtn ml-3">
              Validate
            </v-btn>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { stateExpansiveManager } from "@/mixins/subscription.js";
export default {
  name: "PortfolioPaymentBalance",
  mixins: [stateExpansiveManager],
  components: {
    //Info: () => import('./Info'),
  },
  data() {
    return {
      menu2: false,
    };
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";
.LeftInputs {
  width: 25%;
  height: auto;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;

  .InputContent {
    width: 100%;
    height: auto;
  }
}
.RightInputs {
  width: 75%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  gap: 2%;

  .ExchangeInfo {
    width: 100%;
    height: 70px;
    text-align: center;
    font-size: 19px;
  }

  .InputContent {
    width: 35%;
    height: auto;
  }
}
</style>
