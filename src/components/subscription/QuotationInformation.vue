<template>
  <v-expansion-panels class="ExpansionComponent" :disabled="loadingPanel">
    <v-expansion-panel>
      <!--TITULO DEL ACORDEON-->
      <v-expansion-panel-header class="ExpansionTitle" expand-icon="mdi-plus-circle-outline"> Account information </v-expansion-panel-header>
      <!--CONTENIDO DEL ACORDEON-->
      <v-expansion-panel-content>
        <div class="ExpandContent">
          <!--LINEA DIVISORIA-->
          <div class="ExpansionLineTop"></div>

          <!--PARTE IZQUIERDA DEL FORMULARIO-->
          <div class="FormLeftContent d-flex justify-space-between align-start align-content-start flex-wrap">
            <!--INPUTS DE LA PARTE IZQUIERDA-->
            <div class="InputContent">
              <v-text-field v-model="referenceNumber" @change="emitInput($event, 'referenceNumber')" label="Reference number"></v-text-field>
            </div>
            <div class="InputContent">
              <v-text-field v-model="insured" @change="emitInput($event, 'insured')" label="Insured"></v-text-field>
            </div>

            <div class="InputContent">
              <v-text-field v-model="tiv" @change="emitInput($event, 'tiv')" label="TIV"></v-text-field>
            </div>
            <div class="InputContent">
              <v-text-field v-model="pml" @change="emitInput($event, 'pml')" label="PML (100% in $)"></v-text-field>
            </div>

            <div class="InputContent">
              <v-text-field v-model="insuredName" @change="emitInput($event, 'qs')" label="QS Technical Premium"></v-text-field>
            </div>
            <div class="InputContent">
              <v-text-field v-model="insuredName" @change="emitInput($event, 'pmñl')" label="PML Curve"></v-text-field>
            </div>

            <div class="InputContent">
              <v-text-field v-model="insuredName" @change="emitInput($event, 'comission')" label="Commission"></v-text-field>
            </div>
            <div class="InputContent">
              <v-text-field v-model="insuredName" @change="emitInput($event, 'scenario')" label="Scenario"></v-text-field>
            </div>
          </div>

          <!--LINEA DIVISORIO VERTICAL-->
          <div class="ExpansionLineVertical"></div>

          <!--PARTE DERECHA DEL FORMULARIO-->
          <div class="FormRightContent d-flex justify-space-between align-start align-content-start flex-wrap">
            <div class="InputContent">
              <v-text-field v-model="referenceNumber" @change="emitInput($event, 'referenceNumber')" label="Layer"></v-text-field>
            </div>
            <div class="InputContent">
              <v-text-field v-model="insured" @change="emitInput($event, 'insured')" label="XS of"></v-text-field>
            </div>
          </div>

          <!--LINEA DIVISORIA-->
          <div class="ExpansionLineTop"></div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
  name: "AccountInformation",
  props: {
    loadingPanel: {
      type: Boolean,
    },
  },
  watch: {
    loadingPanel(newVal, oldVal) {
      // console.log(newVal, oldVal)
    },
  },
  data() {
    return {
      insuredName: null,
      name: null,
      country: null,
      typeOfRisk: null,
      activity: null,
      currency: null,
      brokerOrCedent: null,
    };
  },
  methods: {
    /*
			ENVIA LOS DATOS AL COMPONENTE PADRE.
			ESTA FUNCION RECIVE POR PARAMETRO EL EVENTO
			Y EL NOMBRE DEL INPUT PARA IDENTIFICAR
			A QUE INPUT PERTENECE EL CAMBIO
		*/
    emitInput(text, inputName) {
      this.$emit(inputName, text);
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less"; //

/*PARTE IZQUIERDA DEL FORMULARIO*/
.FormLeftContent {
  width: 47%;
  height: auto;

  //INPUTS DE LA PARTE  IZQUIERDA
  .InputContent {
    width: 47%;
    height: 50px;
    margin-bottom: 25px;
  }
}
//LINEA DIVISORIA VERTICAL
.ExpansionLineVertical {
  width: 1px;
  height: 270px;
  background: grey;
}

//PARTE DERECHA DEL FORMULARIO
.FormRightContent {
  width: calc(47%);
  height: 300px;

  .InputContent {
    width: 52%;
  }
}
</style>
