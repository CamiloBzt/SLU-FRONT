<template>
  <v-expansion-panels class="ExpansionComponent ExpansionBordered mt-7">
    <v-expansion-panel>
      <v-expansion-panel-header @click="changeStateExpansive()" class="ExpansionTitle" expand-icon="">
        <!--Titulo del acordeon-->
        Information
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
          <!--Inputs-->
          <div class="InputsCont d-flex flex-wrap align-start mt-3">
            <div class="InputCont">
              <v-text-field label="Reference Number" />
            </div>
            <div class="InputCont">
              <v-text-field label="Insured Name" />
            </div>
            <div class="InputCont">
              <v-text-field label="Rate of Change" />
            </div>
            <div class="InputCont">
              <v-text-field label="Country" />
            </div>
            <div class="InputCont">
              <v-text-field label="Layer" />
            </div>
            <div class="InputCont">
              <v-text-field label="Broker" />
            </div>
            <div class="InputCont">
              <v-text-field label="Inception" />
            </div>
            <div class="InputCont">
              <v-text-field label="Expiry" />
            </div>
            <div class="InputCont">
              <v-text-field label="Term" />
            </div>
          </div>

          <!--Tabla-->
          <div class="Table">
            <div class="Line BorderBottom">
              <div class="Row" />
              <div class="Row font-weight-bold">USD</div>
              <div class="Row font-weight-bold">Original Currency</div>
            </div>

            <div class="Line">
              <div class="Row Label bold">Total Gross Premium Deductions</div>
              <div class="Row">
                <v-text-field value="5000.00" />
              </div>
              <div class="Row align-right">
                <v-text-field value="20,000.00" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">Brokerage</div>
              <div class="Row">
                <v-text-field value="5000.00" />
              </div>
              <div class="Row align-right">
                <v-text-field value="20,000.00" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">Tax</div>
              <div class="Row">
                <v-text-field value="5000.00" />
              </div>
              <div class="Row align-right">
                <v-text-field value="20,000.00" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">LTA</div>
              <div class="Row">
                <v-text-field value="5000.00" />
              </div>
              <div class="Row align-right">
                <v-text-field value="20,000.00" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">Others</div>
              <div class="Row">
                <v-text-field value="5000.00" />
              </div>
              <div class="Row align-right">
                <v-text-field value="20,000.00" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">ENG</div>
              <div class="Row">
                <v-text-field value="5000.00" />
              </div>
              <div class="Row align-right">
                <v-text-field value="20,000.00" />
              </div>
            </div>

            <div class="Line BorderBottom">
              <div class="Row Label">Fronting</div>
              <div class="Row">
                <v-text-field value="5000.00" />
              </div>
              <div class="Row align-right">
                <v-text-field value="20,000.00" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">Net Premium</div>
              <div class="Row">
                <v-text-field value="5000.00" />
              </div>
              <div class="Row align-right">
                <v-text-field value="20,000.00" />
              </div>
            </div>

            <div class="Line WhiteBlock" />

            <div class="Line">
              <div class="Row Label bold">Cancelation Date</div>
              <div class="Row">
                <v-text-field value="5000.00" />
              </div>
              <div class="Row align-right">
                <v-text-field value="20,000.00" />
              </div>
            </div>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { stateExpansiveManager } from "@/mixins/subscription.js";
export default {
  name: "WalletInformation",
  mixins: [stateExpansiveManager],
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";
@import "~@/assets/style/Subscription/Bound.less";
.BorderBottom {
  border-bottom: 1px solid #d2deed;
  margin-bottom: 15px;
}

//Centrar inputs con clase .align-right
::v-deep .align-right .v-input input {
  text-align: right;
}

//Tabla
.Table {
  width: 470px;
  height: auto;
  margin-top: 25px;

  //Hilera
  .Line {
    .flex();
    width: 100%;
    height: 50px;
    justify-content: space-between;

    //Celda
    .Row {
      .flex();
      width: 30%;
      height: 100%;
      text-align: center;
    }

    .Label {
      color: #547fa9;
      font-size: 14px;
      justify-content: flex-end;
      text-align: right;
    }
    .bold {
      font-weight: 600;
    }
  }
  .WhiteBlock {
    height: 60px;
  }
}
</style>
