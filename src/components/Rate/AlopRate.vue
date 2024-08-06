<template>
  <div
    class="Cont d-flex justify-start align-center flex-wrap align-content-center mt-6"
  >
    <!--TITULO-->
    <div class="TitleCont">
      <h5>ALOP Rate</h5>
    </div>
    <div class="Table d-flex justify-end align-content-start flex-wrap">
      <!--CABECERA DE LA TABLA-->
      <div class="Line">
        <div class="MiniRow Bold" />
        <div class="Row Bold" />
        <div class="Row Bold" />

        <div class="Row Bold">Factor</div>
        <div class="Row Bold">Rate</div>
        <div class="Row Bold">
          Credit / <br />
          Surcharge
        </div>
        <div class="Row Bold">Reason</div>
        <div class="Row Bold">Final Rate</div>
      </div>

      <div class="Line">
        <div class="MiniRow Txt">Months</div>
        <div class="Row">
          <v-text-field
            v-model.trim="$v.alopRates.month.$model"
            @input="$v.alopRates.month.$touch()"
            @blur="
              $v.alopRates.month.$touch();
              checkField('month');
            "
          >
          </v-text-field>
        </div>
        <div class="Row">
          <v-select
            v-model.trim="$v.alopRates.alopSelect.$model"
            @input="$v.alopRates.alopSelect.$touch()"
            @blur="
              $v.alopRates.alopSelect.$touch();
              checkField('alopSelect');
            "
            :items="ALOP"
            item-text="data"
            item-value="id"
            @change="changeFactor($v.alopRates.alopSelect.$model)"
          >
          </v-select>
        </div>
        <div class="Row">
          <v-text-field
            v-model.trim="$v.alopRates.factorAlop.$model"
            type="number"
            @input="$v.alopRates.factorAlop.$touch()"
            @blur="
              $v.alopRates.factorAlop.$touch();
              checkField('factorAlop');
            "
          >
          </v-text-field>
        </div>
        <div class="Row">
          <v-text-field
            v-model.trim="$v.alopRates.floodRate.$model"
            type="number"
            @input="SET_ALOP('credit', this), calculateFinal()"
            @blur="
              SET_ALOP('credit', this);
              checkField('floodRate');
            "
          >
          </v-text-field>
        </div>
        <div class="Row">
          <v-text-field
            v-model.trim="$v.alopRates.credit.$model"
            type="number"
            @input="
              SET_ALOP('credit', this);
              calculateFinal();
            "
            @blur="
              SET_ALOP('credit', this);
              checkField('credit');
            "
          >
          </v-text-field>
        </div>
        <div class="Row">
          <v-select
            v-model.trim="$v.alopRates.reasonsSelect.$model"
            @input="$v.alopRates.reasonsSelect.$touch()"
            @blur="
              $v.alopRates.reasonsSelect.$touch();
              checkField('reasonsSelect');
            "
            :items="reasons"
            item-text="data"
            item-value="id"
          >
          </v-select>
        </div>
        <div class="Row">
          <v-text-field v-model.trim="alopRate.finalRate" />
        </div>
      </div>

      <!--SEPARADOR-->
      <div class="ExpansionLineTop mt-3 HideOnMovil" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Decimal from "decimal.js";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { formValidations } from "@/mixins/formValidations";

export default {
  name: "AlopRate",
  mixins: [validationMixin, formValidations],
  data() {
    return {
      formatter: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }),
    };
  },
  async mounted() {
    await this.loadSectionRatesModal({ table: "alopTable" });
    await this.loadSectionRatesModal({ table: "catLarge" });
    this.initializeDefaultRates();
  },
  computed: {
    ...mapGetters([
      "reasons",
      "ALOP",
      "alopRate",
      "alopRates",
      "rates",
      "tarifarNonCatRate",
    ]),
    finalRate: function () {
      const sum = Decimal(
        !this.alopRates.credit ? 0 : this.alopRates.credit / 100
      ).mul(!this.alopRates.floodRate ? 0 : this.alopRates.floodRate);
      this.alopRate.finalRate = this.formatter.format(sum.toFixed(2));
      return this.formatter.format(sum.toFixed(2));
    },
  },
  validations: {
    alopRates: {
      month: { required },
      floodRate: { required },
      credit: { required },
      reasonsSelect: { required },
      alopSelect: { required },
      factorAlop: { required },
      finalRate: { required },
    },
  },
  methods: {
    ...mapActions(["saveRatesModalColumn", "loadSectionRatesModal"]),
    ...mapMutations(["SET_ALOP"]),
    async checkField(column) {
      this.$v.alopRates[column].$touch();
      if (
        this.$v.alopRates[column].$invalid ||
        this.$v.alopRates[column].$error
      )
        return;
      const value = this.$v.alopRates[column].$model;
      await this.saveRatesModalColumn({
        table: "alopTable",
        key: column,
        value,
      });
    },
    changeFactor(item) {
      this.alopRates.factorAlop = this.ALOP.find((v) => v.id === item).factor;
      this.rates.nonCatFinalRate = Decimal(this.rates.eqRate || 0)
        .add(this.rates.floodRate || 0)
        .add(this.rates.hydroRate || 0)
        .add(this.rates.otherRate || 0);
      this.alopRates.floodRate = Decimal(this.tarifarNonCatRate.finalRate || 0)
        .add(this.rates.nonCatFinalRate || 0)
        .mul(this.alopRates.factorAlop);
    },
    calculateFinal() {
      var sum = Decimal(
        !this.alopRates.credit
          ? 0
          : (100 + parseInt(this.alopRates.credit)) / 100
      ).mul(!this.alopRates.floodRate ? 0 : this.alopRates.floodRate);

      this.alopRate.finalRate = sum;
    },
    initializeDefaultRates() {
      if (this.alopRates.alopSelect) {
        this.changeFactor(this.alopRates.alopSelect);
      }
    },
  },
  watch: {
    "alopRates.floodRate": function () {
      this.calculateFinal();
    },
  },
};
</script>

<style lang="less" scoped>
/*
Estilos compartidos por los componentes
del tarifador, controlan:
	- Clase .flex()
	- Titulo general
	- Contenedor general
*/
@import "~@/assets/style/Subscription/Rate.less";
/*
		Estilos únicos del componente
	*/
.Table {
  .flex();
  width: 100%;
  height: auto;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;

  .Line {
    .flex();
    width: 100%;
    height: 50px;
    justify-content: space-between;

    .MiniRow {
      .flex();
      width: 8%;
      height: 50px;
      justify-content: flex-start;
    }
    .Row {
      .flex();
      width: 12.5%;
      height: 50px;
      justify-content: center;
      text-align: center;
    }
    .Txt {
      color: #547fa9;
    }

    .Bold {
      font-weight: 600;
    }
  }
}
</style>
