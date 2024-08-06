<template>
  <v-expansion-panels class="SubExpansionComponent">
    <v-expansion-panel>
      <v-expansion-panel-header @click="changeSubExpansion" class="ExpansionTitle d-flex justify-start" expand-icon="">
        <template v-slot:actions>
          <div class="subIconCont d-flex justify-start align-center">
            <v-icon class="iconExpand mr-1">
              {{ iconSubExpansion }}
            </v-icon>
            <div class="SubExpansionTitle">Summary</div>
          </div>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent justify-center">
          <!--INPUTS-->
          <div class="InputsCont d-flex justify-start flex-wrap">
            <div class="InputCont">
              <v-text-field label="Effective Date Movement" />
            </div>
            <div class="InputCont">
              <v-text-field label="Movement End Date" />
            </div>
          </div>

          <!--Tabla-->
          <div class="TableSingle">
            <div class="Line">
              <div class="Label">Brokerage</div>
              <div class="Row"><v-text-field/></div>
              <div class="RightRow"/>
            </div>


            <div class="Line">
              <div class="Label">Tax</div>
              <div class="Row"><v-text-field/></div>
              <div class="RightRow"/>
            </div>

            <div class="Line">
              <div class="Label">Fronting</div>
              <div class="Row"><v-text-field/></div>
              <div class="RightRow"/>
            </div>

            <div class="Line">
              <div class="Label">Engeneering Fee</div>
              <div class="Row"><v-text-field/></div>
              <div class="RightRow"><v-select /></div>
            </div>

            <div class="Line">
              <div class="Label">Reserve Colombia</div>
              <div class="Row"><v-text-field/></div>
              <div class="RightRow"/>
            </div>
          </div>

          <!--SummaryChart-->
          <div class="TitleCont d-flex justify-start align-center flex-wrap mt-12">
            <h5>Summary Chart</h5>
          </div>
          <div class="TableGeneralStyle d-flex flex-wrap align-start justify-center ">
            <div class="Head d-flex justify-space-between align-center">
              <div class="Label"/>
              <div class="Row Bold">
                TIV
              </div>
              <div class="MiniRow Bold">
                Rate
              </div>
              <div class="Row Bold">
                Premium 100%
              </div>
              <div class="Row Bold">
                SLU Share 20%
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
              <div class="MiniRow">
                <v-text-field placeholder="-"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
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
              <div class="MiniRow">
                <v-text-field />
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
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
              <div class="MiniRow">
                <v-text-field />
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
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
              <div class="MiniRow Bold">
                $ 2.4167 %
              </div>
              <div class="Row Bold">
                $ 290,000.00
              </div>
              <div class="Row Bold">
                $ 58.00
              </div>
            </div>
          </div>

          <!--Segunda tabla-->
          <div class="TableGeneralStyle d-flex flex-wrap align-start justify-center mt-12 Table3">

            <div class="Head d-flex justify-space-between align-center">
              <div class="Label"/>
              <div class="Row Bold text-center">
                Brokerage 10%
              </div>
              <div class="Row Bold text-center">
                Taxes 2%
              </div>
              <div class="Row Bold text-center">
                Engineering Fees <br>2.5%
              </div>
              <div class="Row Bold text-center">
                Fronting Fee 5%
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
                <v-text-field prefix="$"/>
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
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
            </div>

            <!--Valores de  Stocks-->
            <div class="Line mt-3">
              <div class="Label">
                Stocks
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
              <div class="Row">
                <v-text-field prefix="$"/>
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
                $ 5,800.00
              </div>
              <div class="Row Bold">
                $ 1,160.00
              </div>
              <div class="Row Bold">
                $ 1,450.00
              </div>
              <div class="Row Bold">
                $ 2,480.00
              </div>
            </div>
          </div>

          <!--Tercer tabla-->
          <div class="MiniTableGeneralStyle d-flex flex-wrap align-start justify-center mt-12">

            <div class="Head d-flex justify-space-between align-center">
              <div class="Label"/>
              <div class="Row Bold text-center">
                Premium Reserve<br>
                (Only Colombia) 0%
              </div>
              <div class="Row Bold text-center">
                Net to SLU Excluding<br>
                Survey Fees
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
              <div class="Row">
                <v-text-field prefix="$"/>
              </div>
            </div>


            <!--Valores de Stocks-->
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
                $ 0.00
              </div>
              <div class="Row Bold">
                $ 51,040
              </div>
              <div class="Row Bold">
                $ 51,040
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
export default{
  name:'SummaryPro',
  mixins: [stateExpansiveManager],
}
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
@import '~@/assets/style/Subscription/Bound.less';

</style>