<template>
  <v-expansion-panels>
    <v-expansion-panel @change="disablesLossCurvesFromParent()">
      <!--TITULO DEL ACORDEON-->
      <v-expansion-panel-header
        @click="changeSubExpansion"
        expand-icon=""
      >
        <template v-slot:actions>
          <div class="ExpandMiniTitle d-flex justify-start align-center">
            <v-icon class="iconExpand">
              {{ iconSubExpansion }}
            </v-icon>
            Excess of Loss Curves
          </div>
        </template>
      </v-expansion-panel-header>
      <!--CONTENIDO DEL ACORDEON-->
      <v-expansion-panel-content>
        <div class="ExpandContent">
          <!--EMPIEZA LA TABLA-->
          <div class="TableContent mt-5 d-flex justify-center align-start align-content-start flex-wrap">
            <!--CABECERA DE LA TABLA-->
            <div class="TableHead d-flex justify-end align-center">
              <div class="TableHeadSn d-flex justify-start align-center">
                <!--TITULOS-->
                <div class="TableHeadTitle">1</div>

                <div class="TableHeadTitle">2</div>

                <div class="TableHeadTitle">3</div>

                <div class="TableHeadTitle bgTable">4</div>

                <div class="TableHeadTitle bgTable">5</div>

                <div class="TableHeadTitle bgTable">6</div>

                <div class="TableHeadTitle">7</div>
              </div>
            </div>

            <!--CONTENIDO DE LA TABLA-->
            <div class="TableBody d-flex">
              <!--BARRA IZQUIERDA DEL CUERPO-->
              <div class="TableSideCont d-flex justify-start align-start flex-wrap">
                <div class="SideLeftTitle">
                  <div class="text">
                    <b>Detachment Point</b><br />
                    Credit Factor
                  </div>
                </div>
                <div class="SideLeftTitle">
                  <div class="text">
                    <b>Attachment Point</b><br />
                    Credit Factor
                  </div>
                </div>
                <div class="SideLeftTitle">
                  <div class="text">
                    <b>XL Premium</b><br />
                    (Technical, %)
                  </div>
                </div>
              </div>

              <!--VALORES DE LA TABLA-->
              <div class="TableValuesCont">
                <!--
	    						Detachment Point
	    				-->
                <div class="TableRowsCont">
                  <div class="TableRow">
                    <div class="data">{{ values.diagonalDet }}%</div>
                  </div>
                  <div class="TableRow">
                    <div class="data">{{ values.smallestRisksDet }}%</div>
                  </div>
                  <div class="TableRow">
                    <div class="data">{{ values.smallHousesDet }}%</div>
                  </div>
                  <div class="TableRow bgTable">
                    <div class="data">{{ values.unMayorDet }}%</div>
                  </div>
                  <div class="TableRow bgTable">
                    <div class="data">{{ values.dosMayorDet }}%</div>
                  </div>
                  <div class="TableRow bgTable">
                    <div class="data">{{ values.tresMayorDet }}%</div>
                  </div>
                  <div class="TableRow">
                    <div class="data">{{ values.greatDet }}%</div>
                  </div>
                </div>

                <!--
	    						Attachment Point:
	    				-->
                <div class="TableRowsCont">
                  <div class="TableRow">
                    <div class="data">{{ values.diagonalAtt }} %</div>
                  </div>
                  <div class="TableRow">
                    <div class="data">{{ values.smallestRisksAtt }}%</div>
                  </div>
                  <div class="TableRow">
                    <div class="data">{{ values.smallHousesAtt }}%</div>
                  </div>
                  <div class="TableRow bgTable">
                    <div class="data">{{ values.unMayorAtt }}%</div>
                  </div>
                  <div class="TableRow bgTable">
                    <div class="data">{{ values.dosMayorAtt }}%</div>
                  </div>
                  <div class="TableRow bgTable">
                    <div class="data">{{ values.tresMayorAtt }}%</div>
                  </div>
                  <div class="TableRow">
                    <div class="data">{{ values.greatAtt }}%</div>
                  </div>
                </div>

                <!--
	    						XL Premium: (Technical, %)
	    				-->
                <div class="TableRowsCont">
                  <div class="TableRow">
                    <div class="data">{{ xlPremiumDiagonal }} %</div>
                  </div>
                  <div class="TableRow">
                    <div class="data">{{ xlPremiumSmallest }}%</div>
                  </div>
                  <div class="TableRow">
                    <div class="data">{{ xlPremiumSmall }}%</div>
                  </div>
                  <div class="TableRow bgTable">
                    <div class="data">{{ xlPremiumFour }}%</div>
                  </div>
                  <div class="TableRow bgTable">
                    <div class="data">{{ xlPremiumFive }}%</div>
                  </div>
                  <div class="TableRow bgTable">
                    <div class="data">{{ xlPremiumSix }}%</div>
                  </div>
                  <div class="TableRow">
                    <div class="data">{{ xlPremiumGreat }}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--LINEA DIVISORIA-->
          <div class="ExpansionLineTop mt-5"></div>

          <!--Offer-->
          <div class="TableTwoColumns justify-center align-start align-content-start d-flex">
            <div class="TableTwoSideCont d-flex justify-start align-start flex-wrap">
              <div class="SideLeftTwo">Adjusted Premium</div>
            </div>

            <!--VALORES DE OFFER-->
            <div class="TableTwoValuesCont">
              <div class="TableTwoRowsCont">
                <div class="TableTwoText">
                  <div class="data">{{ adjustedPremiumDiagonal }}</div>
                </div>
                <div class="TableTwoText">
                  <div class="data">{{ adjustedPremiumSmallest }}</div>
                </div>
                <div class="TableTwoText">
                  <div class="data">{{ adjustedPremiumSmall }}</div>
                </div>
                <div class="TableTwoText">
                  <div class="data">{{ adjustedPremiumFour }}</div>
                </div>
                <div class="TableTwoText">
                  <div class="data">{{ adjustedPremiumFive }}</div>
                </div>
                <div class="TableTwoText">
                  <div class="data">{{ adjustedPremiumSix }}</div>
                </div>
                <div class="TableTwoText">
                  <div class="data">{{ adjustedPremiumGreat }}</div>
                </div>
              </div>
            </div>
          </div>

          <!--Comentarios-->
          <div class="TextAreaCont text-ar-sect d-flex justify-center align-center flex-column">
            <div class="TextAreaTitle">Offer Comments</div>
            <textarea
              v-model="comments"
              class="mt-2"
            ></textarea>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { stateExpansiveManager } from '@/mixins/subscription.js';
import { mapActions, mapGetters, mapMutations } from 'vuex';

import Decimal from 'decimal.js';
import numeral from 'numeral';
/* lodash */
import { debounce } from 'lodash';

export default {
  name: 'LossCurves',
  inject: ['disablesLossCurvesFromParent'],
  data () {
    return {
      detachment: 0,
      attachment: 0,
      comments: null,
      values: {
        diagonalDet: null,
        diagonalAtt: null,
        smallestRisksDet: null,
        smallestRisksAtt: null,
        smallHousesDet: null,
        smallHousesAtt: null,
        unMayorDet: null,
        unMayorAtt: null,
        dosMayorDet: null,
        dosMayorAtt: null,
        tresMayorDet: null,
        tresMayorAtt: null,
        greatDet: null,
        greatAtt: null,
        minDiagonal: null,
        minSmallestRisks: null,
        minSmallHouses: null,
        minUnMayor: null,
        minDosMayor: null,
        minTresMayor: null,
        minGreat: null,
      },
      formatter: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
    };
  },
  mixins: [stateExpansiveManager],
  computed: {
    ...mapGetters([
      'premiumNon',
      'deductions',
      'layersArray',
      'layerSelect',
      'smallestRisks',
      'smallHouses',
      'unMayor',
      'dosMayor',
      'tresMayor',
      'great',
      'calculatePML',
      'tivNon',
      'quotation',
    ]),
    sumDeductions: {
      get () {
        const values = [
          this.deductions.brokerage || 0,
          this.deductions.fronting || 0,
          this.deductions.eng || 0,
          this.deductions.taxes || 0,
          this.deductions.lta || 0,
          this.deductions.others || 0,
        ];

        const op = Decimal.sum(...values);
        return op.toFixed(2);
      },
    },
    xlPremiumDiagonal () {
      const op = this.values.diagonalDet - this.values.diagonalAtt;
      if (isNaN(Number(op))) return 0;
      return op;
    },
    xlPremiumSmallest () {
      const op = this.values.minSmallestRisks;
      if (isNaN(Number(op))) return 0;
      return op;
    },
    xlPremiumSmall () {
      const op = this.values.minSmallHouses;
      if (isNaN(Number(op))) return 0;
      return op;
    },
    xlPremiumFour () {
      const op = this.values.minUnMayor;
      if (isNaN(Number(op))) return 0;
      return op;
    },
    xlPremiumFive () {
      const op = this.values.minDosMayor;
      if (isNaN(Number(op))) return 0;
      return op;
    },
    xlPremiumSix () {
      const op = this.values.minTresMayor;
      if (isNaN(Number(op))) return 0;
      return op;
    },
    xlPremiumGreat () {
      const op = this.values.minGreat;
      if (isNaN(Number(op))) return 0;
      return op;
    },
    xlPremiumDiagonalCurrency () {
      const percent = new Decimal(this.xlPremiumDiagonal || 0).div(100)
      const op = Decimal.mul(numeral(
        (`${this.premiumNon.totalPremium}` || '$0').replace(/[^0-9.]/g, '')
      ).value() || 0, percent || 0)
      if (isNaN(Number(op))) return 0;
      return op;
    },
    xlPremiumSmallestCurrency () {
      const percent = new Decimal(this.xlPremiumSmallest || 0).div(100)
      const op = Decimal.mul(numeral(
        (`${this.premiumNon.totalPremium}` || '$0').replace(/[^0-9.]/g, '')
      ).value() || 0, percent || 0)
      if (isNaN(Number(op))) return 0;
      return op;
    },
    xlPremiumSmallCurrency () {
      const percent = new Decimal(this.xlPremiumSmall || 0).div(100)
      const op = Decimal.mul(numeral(
        (`${this.premiumNon.totalPremium}` || '$0').replace(/[^0-9.]/g, '')
      ).value() || 0, percent || 0)
      if (isNaN(Number(op))) return 0;
      return op;
    },
    xlPremiumFourCurrency () {
      const percent = new Decimal(this.xlPremiumFour || 0).div(100)
      const op = Decimal.mul(numeral(
        (`${this.premiumNon.totalPremium}` || '$0').replace(/[^0-9.]/g, '')
      ).value() || 0, percent || 0)
      if (isNaN(Number(op))) return 0;
      return op;
    },
    xlPremiumFiveCurrency () {
      const percent = new Decimal(this.xlPremiumFive || 0).div(100)
      const op = Decimal.mul(numeral(
        (`${this.premiumNon.totalPremium}` || '$0').replace(/[^0-9.]/g, '')
      ).value() || 0, percent || 0)
      if (isNaN(Number(op))) return 0;
      return op;
    },
    xlPremiumSixCurrency () {
      const percent = new Decimal(this.xlPremiumSix || 0).div(100)
      const op = Decimal.mul(numeral(
        (`${this.premiumNon.totalPremium}` || '$0').replace(/[^0-9.]/g, '')
      ).value() || 0, percent || 0)
      if (isNaN(Number(op))) return 0;
      return op;
    },
    xlPremiumGreatCurrency () {
      const percent = new Decimal(this.xlPremiumGreat || 0).div(100)
      const op = Decimal.mul(numeral(
        (`${this.premiumNon.totalPremium}` || '$0').replace(/[^0-9.]/g, '')
      ).value() || 0, percent || 0)
      if (isNaN(Number(op))) return 0;
      return op;
    },
    adjustedPremiumDiagonal () {
      const op = new Decimal(this.xlPremiumDiagonalCurrency).mul(0.75);
      const sub = Decimal.sub(100, this.sumDeductions);
      const res = Decimal.div(op, sub / 100);

      if (isNaN(res)) return 0;
      return this.formatter.format(res.toNumber());
    },
    adjustedPremiumSmallest () {
      const op = new Decimal(this.xlPremiumSmallestCurrency || 0).mul(0.75);
      const sub = Decimal.sub(100, this.sumDeductions);
      const res = Decimal.div(op, sub / 100);

      if (isNaN(res)) return 0;
      return this.formatter.format(res.toNumber());
    },
    adjustedPremiumSmall () {
      const op = new Decimal(this.xlPremiumSmallCurrency || 0).mul(0.75);
      const sub = Decimal.sub(100, this.sumDeductions);
      const res = Decimal.div(op, sub / 100);

      if (isNaN(res)) return 0;
      return this.formatter.format(res.toNumber());
    },
    adjustedPremiumFour () {
      const op = new Decimal(this.xlPremiumFourCurrency || 0).mul(0.75);
      const sub = Decimal.sub(100, this.sumDeductions);
      const res = Decimal.div(op, sub / 100);

      if (isNaN(res)) return 0;
      return this.formatter.format(res.toNumber());
    },
    adjustedPremiumFive () {
      const op = new Decimal(this.xlPremiumFiveCurrency || 0).mul(0.75);
      const sub = Decimal.sub(100, this.sumDeductions);
      const res = Decimal.div(op, sub / 100);

      if (isNaN(res)) return 0;
      return this.formatter.format(res.toNumber());
    },
    adjustedPremiumSix () {
      const op = new Decimal(this.xlPremiumSixCurrency || 0).mul(0.75);
      const sub = Decimal.sub(100, this.sumDeductions);
      const res = Decimal.div(op, sub / 100);

      if (isNaN(res)) return 0;
      return this.formatter.format(res.toNumber());
    },
    adjustedPremiumGreat () {
      const op = new Decimal(this.xlPremiumGreatCurrency || 0).mul(0.75);
      const sub = Decimal.sub(100, this.sumDeductions);
      const res = Decimal.div(op, sub / 100);

      if (isNaN(res)) return 0;
      return this.formatter.format(res.toNumber());
    },
    qsth () {
      const op = new Decimal((`${this.tivNon.total}` || '$0').replace(/[^0-9.]/g, '') || 0).mul(2).div(1000).toNumber();

      return op;
    },
  },
  async mounted () {
    this.resetCalculatePML();
    await this.getLayers();
    await this.calculeData();
  },
  methods: {
    ...mapMutations(['resetCalculatePML']),
    ...mapActions(['getLayers']),
    checkDisabledInteraction() {
      alert('heu')
    },
    async calculeData () {
      if (this.layerSelect) {
        this.detachment = new Decimal((`${this.layerSelect.limit}` || '$0').replace(/[^0-9.]/g, '') || 0).add(
          new Decimal((`${this.layerSelect.excess}` || '$0').replace(/[^0-9.]/g, '') || 0)
        );
        this.attachment = new Decimal((`${this.layerSelect.excess}` || '$0').replace(/[^0-9.]/g, '') || 0);

        this.resetCalculatePML();

        for (var i = 0; i <= 100; i++) {
          this.calculatePML.push(new Decimal((`${this.premiumNon.pml}` || '$0').replace(/[^0-9.]/g, '').valueOf() || 0).div(100).mul(i).toNumber());
        }
        var indexAllDet = 0,
          indexAllAtt = 0;
        this.calculatePML.forEach((val, index, { length }) => {
          const lastItem = index >= length ? index : index + 1 // para asegurar que no busque un item mayor al length del array
          if (this.detachment.toNumber() >= val && this.detachment.toNumber() < this.calculatePML[lastItem]) {
            indexAllDet = index;
          }
        });
        this.calculatePML.forEach((val, index, { length }) => {
          const lastItem = index >= length ? index : index + 1 // para asegurar que no busque un item mayor al length del array
          if (this.attachment.toNumber() >= val && this.attachment.toNumber() < this.calculatePML[lastItem]) {
            indexAllAtt = index;
          }
        });

        this.values.diagonalDet = indexAllDet;
        this.values.diagonalAtt = indexAllAtt;
        this.values.smallestRisksDet = new Decimal(this.smallestRisks[indexAllDet] || 0)
        this.values.smallestRisksAtt = new Decimal(this.smallestRisks[indexAllAtt] || 0)
        this.values.smallHousesDet = new Decimal(this.smallHouses[indexAllDet] || 0)
        this.values.smallHousesAtt = new Decimal(this.smallHouses[indexAllAtt] || 0)
        this.values.unMayorDet = new Decimal(this.unMayor[indexAllDet] || 0)
        this.values.unMayorAtt = new Decimal(this.unMayor[indexAllAtt] || 0)
        this.values.dosMayorDet = new Decimal(this.dosMayor[indexAllDet] || 0)
        this.values.dosMayorAtt = new Decimal(this.dosMayor[indexAllAtt] || 0)
        this.values.tresMayorDet = new Decimal(this.tresMayor[indexAllDet] || 0)
        this.values.tresMayorAtt = new Decimal(this.tresMayor[indexAllAtt] || 0)
        this.values.greatDet = new Decimal(this.great[indexAllDet] || 0)
        this.values.greatAtt = new Decimal(this.great[indexAllAtt] || 0)
        this.values.minDiagonal = Decimal.sub(this.values.diagonalDet, this.values.diagonalAtt)
        this.values.minSmallestRisks = Decimal.sub(this.values.smallestRisksDet, this.values.smallestRisksAtt)
        this.values.minSmallHouses = Decimal.sub(this.values.smallHousesDet, this.values.smallHousesAtt)
        this.values.minUnMayor = Decimal.sub(this.values.unMayorDet, this.values.unMayorAtt)
        this.values.minDosMayor = Decimal.sub(this.values.dosMayorDet, this.values.dosMayorAtt)
        this.values.minTresMayor = Decimal.sub(this.values.tresMayorDet, this.values.tresMayorAtt)
        this.values.minGreat = Decimal.sub(this.values.greatDet, this.values.greatAtt)
      }
    },
  },
  watch: {
    layersArray: {
      handler: debounce(function () {
        this.calculeData();
      }, 1000),
      deep: true,
    },
    layerSelect: {
      handler: debounce(function () {
        this.calculeData();
      }, 1000),
      deep: true,
    },
    tivNon: {
      handler: debounce(function () {
        this.calculeData();
      }, 1000),
      deep: true,
    },
    deductions: {
      handler: debounce(function () {
        this.calculeData();
      }, 1000),
      deep: true,
    },
    premiumNon: {
      handler () {
        this.calculeData();
      },
      deep: true,
    },
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
.ExpandMiniTitle {
  position: absolute;
  width: 100%;
  left: 24px;
  color: #003d6d !important;
  font-weight: 600 !important;
  height: 100%;
  top: 0;
  .iconExpand {
    background: #003d6d;
    color: white !important;
    margin-right: 15px;
  }
}
.ExpansionLineTop {
  background: #d2deed;
}
.ExpandContent {
  justify-content: center !important;
}
//TABLA
.TableContent {
  width: 85%;
  height: 400px;
  //CABEZA DE LA TABLE
  .TableHead {
    width: 100%;
    height: 16%;

    .TableHeadSn {
      width: 81%;
      height: 100%;

      //TITULOS DE LA PARTE SUPERIOR
      .TableHeadTitle {
        width: 14.28%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: left;
        font-weight: bold;
        color: #547fa9;
      }
    }
  }

  //CUERPO DE LA TABLA
  .TableBody {
    width: 100%;
    height: 84%;
    align-content: center;
    align-items: center;

    //PARTE IZQUIERDA DE LA TABLA
    .TableSideCont {
      width: 19%;
      height: 80%;
      margin-top: -60px;

      //TITULOS DE LA PARTE IZQUIERDA
      .SideLeftTitle {
        width: 100%;
        height: 25%;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .text {
          font-size: 16px;
          font-weight: 400;
          text-align: right;
          color: #547fa9;
          b {
            color: inherit;
          }
        }
      }
    }

    //VALORES DE LA TABLA
    .TableValuesCont {
      width: calc(81% - 1px);
      height: 100%;
      display: flex;
      align-items: flex-start;
      align-content: flex-start;
      flex-wrap: wrap;

      //FILAS DE LA TABLA
      .TableRowsCont {
        width: 100%;
        height: 25%;
        display: flex;
        justify-content: space-between;

        .font-weight-bold {
          font-weight: 700 !important;
        }
        .TableRow {
          width: 14.28%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;

          .data {
            border-bottom: solid 1px black;
          }
        }
      }
    }
  }
}

//TABLA DE DOS COLUMNAS
.TableTwoColumns {
  width: 85%;
  height: 80px;

  //CONTENEDOR PADRE
  .TableTwoSideCont {
    width: 19%;
    height: 100%;

    //TITULOS DE LA PARTE IZQUIERDA
    .SideLeftTwo {
      width: 100%;
      height: 50%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-weight: bold;
      color: #547fa9;
    }
  }

  //CONTENEDOR PADRE DE LOS VALORES DE LA TABLA
  .TableTwoValuesCont {
    width: 81%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    //FILAS DE LA TABLA
    .TableTwoRowsCont {
      width: 100%;
      height: 50%;
      display: flex;
      justify-content: space-between;

      //VALORES DE LA TABLA
      .TableTwoText {
        width: 14.28%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        .data {
          border-bottom: solid 1px black;
        }
      }
    }
  }
}

//AREA DE TEXTOS
.TextAreaCont {
  width: 100%;
  height: auto;

  .TextAreaTitle {
    width: 100%;
    font-size: 14px;
    color: #547fa9;
  }

  textarea {
    width: 100%;
    height: 90px;
    border: solid 1px #d2deed;
    border-radius: 15px;
    resize: none;
  }
}

//FONDOS GRISES PARA LA TABLA
.bgTable {
  background: #edf2f8 !important;
}
</style>
