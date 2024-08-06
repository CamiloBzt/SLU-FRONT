<template>
  <v-expansion-panels
    class="ExpansionComponent ExpansionBordered mt-6"
    >
    <v-expansion-panel>
      <!--TITULO DEL ACORDEON-->
      <v-expansion-panel-header
        @click="changeStateExpansive()"
        class="ExpansionTitle"
        expand-icon=""
      >
        Account Information
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
          
          <div class="ExpansionInputContent mb-7">
            <v-text-field label="Country" />
          </div>
          <div class="ExpansionInputContent mb-7">
            <v-text-field label="Type of Risk" />
          </div>
          <div class="ExpansionInputContent mb-7">
            <v-text-field label="Reference Number" />
          </div>
          <div class="ExpansionInputContent mb-7" />


          <div class="ExpansionInputContent mb-7">
            <v-text-field label="Broker" />
          </div>
          <div class="ExpansionInputContent mb-7">
            <v-text-field label="Cedent" />
          </div>
          <div class="ExpansionInputContent mb-7">
            <v-text-field label="Items" />
          </div>
          <div class="ExpansionInputContent mb-7">
            <v-text-field label="Layout" />
          </div>


          <div class="ExpansionInputContent mb-7">
            <v-text-field label="Total Values" />
          </div>
          <div class="ExpansionInputContent mb-7">
            <v-text-field label="Rate" />
          </div>
          <div class="ExpansionInputContent mb-7">
            <v-text-field label="Premium" />
          </div>
          <div class="ExpansionInputContent mb-7">
            <v-text-field label="PMD" />
          </div>

          
          <div class="ExpansionInputContent mb-7">
            <v-text-field label="Premium With PMD" />
          </div>
          <div class="ExpansionInputContent mb-7">
            <v-text-field label="Validaty Beginning" />
          </div>
          <div class="ExpansionInputContent mb-7">
            <v-text-field label="Validaty End" />
          </div>
          <div class="ExpansionInputContent mb-7">
            <v-text-field label="Days" />
          </div>


          <div class="ExpansionInputContent mb-7">
            <v-text-field label="Premium Period" />
          </div>
          <div class="ExpansionInputContent mb-7">
            <v-text-field label="% Participation" />
          </div>
          <div class="ExpansionInputContent mb-7">
            <v-text-field label="$ Participation" />
          </div>
          <div class="ExpansionInputContent mb-7">
            <v-text-field label="Brokerage" />
          </div>

          <div class="ExpansionInputContent mb-7">
            <v-text-field label="Tax" />
          </div>
          <div class="ExpansionInputContent mb-7">
            <v-text-field label="20% Reserve or Engineering 2.5" />
          </div>
          <div class="ExpansionInputContent mb-7">
            <v-text-field label="Fronting Fee" />
          </div>
          <div class="ExpansionInputContent mb-7">
            <v-text-field label="Balance" />
          </div>

          <div class="ExpansionInputContent mb-7">
            <v-text-field label="Days" />
          </div>
          <div class="ExpansionInputContent mb-7">
            <v-text-field label="20% Reserve or Engineering 2.5" />
          </div>

          <div class="ExpansionInputContent mb-7" />
          <div class="ExpansionInputContent mb-7" />

          <div class="ColumnContainer">

            <div class="Column">
              <PortfolioPpc />
            </div>

            <div class="Divider" />

            <div class="Column">
              <PortfolioTotalNetPremium />
            </div>

          </div>

            


          <div class="finishButtonCont mt-7 d-flex justify-end align-center">
            <v-btn rounded large text outlined class="finishBtn ml-3">
              Generate Payment
            </v-btn>
          </div>
          
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

  
<script>
import { stateExpansiveManager } from '@/mixins/subscription.js';
export default{
  name:'PortfolioAccountInformation',
  mixins: [stateExpansiveManager],
  components:{
    PortfolioPpc: () => import('./PortfolioPpc'),
    PortfolioTotalNetPremium: () => import('./PortfolioTotalNetPremium'),
  }
}
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
.ColumnContainer{
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .Column{
    width: 48%;
    height: 100%;
  }

  .Divider{
    width: 1px;
    height: 100%;
    background: #A8BFD9;
  }
}

</style>