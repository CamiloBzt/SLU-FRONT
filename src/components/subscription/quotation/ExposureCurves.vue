<template>
  <v-expansion-panels>
    <v-expansion-panel @click="onExpansionPanelClick">
      <!--TITULO DEL ACORDEON-->
      <v-expansion-panel-header
        @click="changeSubExpansion"
        class="d-flex justify-start align-center"
        expand-icon=""
      >
        <template v-slot:actions>
          <div class="ExpandMiniTitle d-flex justify-start align-center">
            <div class="subIconCont d-flex justify-start align-center">
              <v-icon class="iconExpand">
                {{ iconSubExpansion }}
              </v-icon>
            </div>
            Exposure Curves
          </div>
        </template>
      </v-expansion-panel-header>
      <!--CONTENIDO DEL ACORDEON-->
      <v-expansion-panel-content>
        <div class="ExpandContent flex-wrap">
          <div class="ChartCont">
            <canvas id="myChart"></canvas>
          </div>
          <div class="ChartInfo d-flex justify-start align-start">
            <div class="InfoTitle">
              <v-icon> mdi-information </v-icon>
              Information
            </div>
            <div class="InfoText">
              The information presented in this image is only for consultation
              purposes. This image doesn't represent the information shown in
              the Excess of Loss Curves section.
            </div>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import Chart from 'chart.js';
import { stateExpansiveManager } from '@/mixins/subscription.js';
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  name: 'exposureCurves',
  mixins: [stateExpansiveManager],
  data() {
    return {
      /*
			Cada variable chartData se encarga
			de generar las curvas de la
			grafica
    	*/
    };
  },
  methods: {
    /*
  	generateChart
		METODO PARA GENERAR UNA NUEVA
		GRAFICA.
  	*/
    generateChart() {
      var vm = this;
      var el = document.getElementById('myChart');
      if (!el) return;
      const ctx = el.getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'line',
        plugins: [
          {
            beforeInit: function (chart, options) {
              chart.legend.afterFit = function () {
                this.height = this.height + 25;
              };
            },
          },
        ],
        data: {
          labels: this.calculatePML,
          datasets: [
            {
              label: 'Diagonal',
              data: vm.chartData1,
              fill: false,
              backgroundColor: '#F31010',
              borderColor: ['#F31010'],
              borderWidth: 1,
            },
            {
              label: 'Smallest Risk',
              data: vm.chartData2,
              fill: false,
              backgroundColor: '#99D919',
              borderColor: ['#99D919'],
              borderWidth: 1,
            },
            {
              label: 'Small Houses',
              data: vm.chartData3,
              fill: false,
              backgroundColor: '#594CCB',
              borderColor: ['#594CCB'],
              borderWidth: 1,
            },
            {
              label: '>',
              data: vm.chartData4,
              fill: false,
              backgroundColor: '#2AECFF',
              borderColor: ['#2AECFF'],
              borderWidth: 1,
            },
            {
              label: '>>',
              data: vm.chartData5,
              fill: false,
              backgroundColor: '#FF9F2C',
              borderColor: ['#FF9F2C'],
              borderWidth: 1,
            },
            {
              label: '>>>',
              data: vm.chartData6,
              fill: false,
              backgroundColor: '#2CACFF',
              borderColor: ['#2CACFF'],
              borderWidth: 1,
            },
            {
              label: 'Great Industries',
              data: vm.chartData7,
              fill: false,
              backgroundColor: '#7C2009',
              borderColor: ['#7C2009'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            line: {
              tension: 0.3,
            },
            point: {
              radius: 0,
            },
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  display: true,
                },
                gridLines: {
                  display: false,
                  drawBorder: false,
                },
              },
            ],
          },

          legend: {
            align: 'start',
          },
        },
      });
    },
    /*
  		onExpansionPanelClick
			Genera las curvas después de
			abrir la sección expandible
  	*/
    onExpansionPanelClick(event) {
      if (
        !event.target.classList.contains('v-expansion-panel-header--active')
      ) {
        setTimeout(() => {
          this.generateChart();
        }, 100);
      }
    },
  },
  created() {
    //this.generateChart();
  },
  watch: {
    calculatePML: function () {
      this.generateChart();
    },
    layerSelect: function () {
      this.generateChart();
    },
  },
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
    ]),
    chartData1: function () {
      var data = [
        { x: 0, y: 0 },
        { x: this.calculatePML[50], y: 50 },
        { x: this.calculatePML[100], y: 100 },
      ];
      return data;
    },
    chartData2: function () {
      var data = [];
      this.smallestRisks.forEach((value, index) => {
        data.push({ x: this.calculatePML[index], y: value });
      });
      return data;
    },
    chartData3: function () {
      var data = [];
      this.smallHouses.forEach((value, index) => {
        data.push({ x: this.calculatePML[index], y: value });
      });
      return data;
    },
    chartData4: function () {
      var data = [];
      this.unMayor.forEach((value, index) => {
        data.push({ x: this.calculatePML[index], y: value });
      });
      return data;
    },
    chartData5: function () {
      var data = [];
      this.dosMayor.forEach((value, index) => {
        data.push({ x: this.calculatePML[index], y: value });
      });
      return data;
    },
    chartData6: function () {
      var data = [];
      this.tresMayor.forEach((value, index) => {
        data.push({ x: this.calculatePML[index], y: value });
      });
      return data;
    },
    chartData7: function () {
      var data = [];
      this.great.forEach((value, index) => {
        data.push({ x: this.calculatePML[index], y: value });
      });
      return data;
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
.ExpandMiniTitle {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 24px;
  top: 0;
  color: #003d6d !important;
  font-weight: 600 !important;
  .iconExpand {
    background: #003d6d;
    color: white !important;
    margin-right: 15px;
  }
}

.ExpandContent {
  justify-content: center !important;

  .ChartCont {
    width: 60vw;
    height: 80vh;
    border: solid 1px #a8bfd9;
    padding: 20px;
  }

  .ChartInfo {
    width: 65%;
    height: auto;
    margin-top: 15px;

    .InfoTitle {
      width: 18%;
      height: 100%;
      font-weight: 600;
      i {
        color: #003d6d;
      }
    }

    .InfoText {
      width: 82%;
      height: 100%;
      font-size: 15px;
    }
  }
}
</style>
