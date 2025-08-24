<template>
  <v-expansion-panels class="SubExpansionComponent">
    <v-expansion-panel>
      <v-expansion-panel-header @click="changeSubExpansion" class="ExpansionTitle d-flex justify-start" expand-icon="">
        <template v-slot:actions>
          <div class="subIconCont d-flex justify-start align-center">
            <v-icon class="iconExpand mr-1">
              {{ iconSubExpansion }}
            </v-icon>
            <div class="SubExpansionTitle">Change of inception date</div>
          </div>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent justify-center align-center">
          
          <!--Inputs-->
          <div class="InputsCont d-flex justify-start flex-wrap">
            <div class="InputCont">
              <v-text-field label="Effective Date Movement" />
            </div>
            <div class="InputCont">
              <v-text-field label="Movement End Date" />
            </div>
            <div class="InputCont">
              <v-text-field label="Premium Payment Date" />
            </div>
          </div>

          <!--Total Values-->
          <h6 class="TitleInputs">Total Values</h6>
          <div class="InputsCont MiniInputs d-flex justify-start flex-wrap">
            <div class="InputCont">
              <v-text-field label="Damage" />
            </div>
            <div class="InputCont">
              <v-text-field label="Bi" />
            </div>
            <div class="InputCont">
              <v-text-field label="Stocks" />
            </div>
            <div class="InputCont">
              <v-text-field label="Stocks Percentage" />
            </div>
          </div>


          <h6 class="TitleInputs mt-7">
            Change of inception date Chart
          </h6>


          <!--PRIMER TABLA-->
          <div class="TableGeneralStyle d-flex flex-wrap align-start justify-center">
            <div class="Head d-flex justify-space-between align-center">
              <div class="Label" />
              <div class="Row Bold">
                TIV Movement
              </div>
              <div class="Row Bold">
                TIV Total
              </div>
              <div class="MiniRow Bold">
                Rate
              </div>
              <div class="Row Bold">
                Total Premium
              </div>
            </div>
            <!-- Valores Damage-->
            <div class="Line mt-3">
              <div class="Label">
                Damage
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
              <div class="MiniRow">
                <v-text-field placeholder="-"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
            </div>

            <!--Valores de  Bi-->
            <div class="Line mt-2">
              <div class="Label">
                BI
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
              <div class="MiniRow">
                <v-text-field placeholder="-"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
            </div>

            <!--Valores de stocks-->
            <div class="Line mt-2">
              <div class="Label">
                Stocks
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
              <div class="MiniRow">
                <v-text-field placeholder="-"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
            </div>


            <!--Total-->
            <div class="TotalLine mt-3">
              <div class="Label Bold">
                Total
              </div>
              <div class="Row Bold">
                $120,000,000.00
              </div>
              <div class="Row Bold">
                $120,000,000.00
              </div>
              <div class="MiniRow Bold">
                - %
              </div>
              <div class="Row Bold">
                $11,805.73
              </div>
            </div>
          </div>

          <!--SEGUNDA TABLA-->
          <div class="TableGeneralStyle d-flex flex-wrap align-start justify-center mt-12 Table3">
            <div class="Head d-flex justify-space-between align-center">
              <div class="Label" />
              <div class="Row Bold">
                Premium SLU
              </div>
              <div class="Row Bold">
                Brokerage
              </div>
              <div class="Row Bold">
                Tax
              </div>
              <div class="Row Bold">
                Fronting
              </div>
            </div>
            <!-- Valores Damage-->
            <div class="Line mt-3">
              <div class="Label">
                Damage
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
              <div class="Row">
                <v-text-field placeholder="-"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
            </div>

            <!--Valores de  Bi-->
            <div class="Line mt-2">
              <div class="Label">
                BI
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
              <div class="MiniRow">
                <v-text-field placeholder="-"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
            </div>

            <!--Valores de stocks-->
            <div class="Line mt-2">
              <div class="Label">
                Stocks
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
              <div class="MiniRow">
                <v-text-field placeholder="-"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
            </div>


            <!--Total-->
            <div class="TotalLine mt-3">
              <div class="Label Bold">
                Total
              </div>
              <div class="Row Bold">
                $120,000,000.00
              </div>
              <div class="Row Bold">
                $120,000,000.00
              </div>
              <div class="Row Bold">
                - %
              </div>
              <div class="Row Bold">
                $11,805.73
              </div>
            </div>
          </div>

          <!--TERCER TABLA-->
          <div class="TableGeneralStyle Table3 d-flex flex-wrap align-start justify-center mt-12">
            <div class="Head d-flex justify-space-between align-center">
              <div class="Label" />
              <div class="Row Bold text-center">
                Engineering Fees
              </div>
              <div class="Row Bold text-center">
                Reserve
              </div>
              <div class="Row Bold text-center">
                NeT Premium
              </div>
              <div class="Row Bold text-center">
                Prima Neta<br>
                Without Reserve
              </div>
            </div>
            <!-- Valores Damage-->
            <div class="Line mt-3">
              <div class="Label">
                Damage
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
              <div class="Row">
                <v-text-field placeholder="-"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
            </div>

            <!--Valores de  Bi-->
            <div class="Line mt-2">
              <div class="Label">
                BI
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
              <div class="MiniRow">
                <v-text-field placeholder="-"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
            </div>

            <!--Valores de stocks-->
            <div class="Line mt-2">
              <div class="Label">
                Stocks
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
              <div class="MiniRow">
                <v-text-field placeholder="-"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
            </div>


            <!--Total-->
            <div class="TotalLine mt-3">
              <div class="Label Bold">
                Total
              </div>
              <div class="Row Bold">
                $120,000,000.00
              </div>
              <div class="Row Bold">
                $120,000,000.00
              </div>
              <div class="Row Bold">
                - %
              </div>
              <div class="Row Bold">
                $11,805.73
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
import FilesSubmission from '@/components/subscription/submission/FilesSubmission';
import EmailRichEditor from '@/components/Email/EmailRichEditor';
export default {
  name: 'ChangeOfInceptionDate',
  mixins: [stateExpansiveManager],
  components:{
    FilesSubmission,
    EmailRichEditor
  }
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
@import '~@/assets/style/Subscription/Bound.less';

.MiniInputs{
  .InputCont{
    width: 8.7%;
    margin-right: 1%;
  }
}
</style>
