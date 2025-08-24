<template>
  <div class="Cont d-flex justify-start align-center flex-wrap align-content-center mt-7">
    <div class="Table">
      <!--CABECERA DE LA TABLA-->
      <div class="Line">
        <div class="Row Number" />

        <div class="Row Bold">Country / Zone</div>
        <div class="Row Bold Percentaje">%</div>
        <div class="Row Bold">Earthquake</div>
        <div class="Row Bold">Hidro-meteorlogical</div>
        <div class="Row Bold">Flood</div>
        <div class="Row Bold">Other</div>
        <div class="Row Bold Percentaje">Earthquake Rate</div>
        <div class="Row Bold Percentaje">Wind Rate</div>
        <div class="Row Bold Percentaje">Flood Rate</div>
        <div class="Row Bold Percentaje">Other Rate</div>
      </div>

      <!--LINEA 1-->
      <div class="Line" v-for="(v, index) in $v.computedGroup.$each.$iter" :key="index">
        <div class="Row Bold Number">
          <Modal @acceptConfirmationModal="removeField(index)" />
          {{ parseInt(index) + 1 }}
        </div>
        <div class="Row">
          <v-text-field
            v-model.trim="v.country.$model"
            @input="v.country.$touch()"
            @blur="
              v.country.$touch();
              checkField(index, 'country');
            "
          />
        </div>
        <div class="Row Percentaje">
          <v-text-field
            v-model.trim="v.rate.$model"
            @input="v.rate.$touch()"
            @blur="
              v.rate.$touch();
              checkField(index, 'rate');
            "
            type="number"
            suffix="%"
          />
        </div>
        <div class="Row">
          <v-select
            v-model.trim="v.earthquake.$model"
            @input="v.earthquake.$touch()"
            @blur="
              v.earthquake.$touch();
              checkField(index, 'earthquake');
            "
            :items="items"
            item-text="description"
            item-value="id"
          />
        </div>
        <div class="Row">
          <v-select
            v-model.trim="v.hidro.$model"
            @input="v.hidro.$touch()"
            @blur="
              v.hidro.$touch();
              checkField(index, 'hidro');
            "
            :items="items"
            item-text="description"
            item-value="id"
          />
        </div>
        <div class="Row">
          <v-select
            v-model.trim="v.flood.$model"
            @input="v.flood.$touch()"
            @blur="
              v.flood.$touch();
              checkField(index, 'flood');
            "
            :items="items"
            item-text="description"
            item-value="id"
          />
        </div>
        <div class="Row">
          <v-select
            v-model.trim="v.other.$model"
            @input="v.other.$touch()"
            @blur="
              v.other.$touch();
              checkField(index, 'other');
            "
            :items="items"
            item-text="description"
            item-value="id"
          />
        </div>

        <div class="Row Percentaje">
          <v-text-field
            v-model.trim="v.earthquakeRate.$model"
            @input="v.earthquakeRate.$touch()"
            @blur="
              v.earthquakeRate.$touch();
              checkField(index, 'earthquakeRate');
            "
            readonly
          />
        </div>
        <div class="Row Percentaje">
          <v-text-field
            v-model.trim="v.windRate.$model"
            @input="v.windRate.$touch()"
            @blur="
              v.windRate.$touch();
              checkField(index, 'windRate');
            "
            readonly
          />
        </div>
        <div class="Row Percentaje">
          <v-text-field
            v-model.trim="v.floodRate.$model"
            @input="v.floodRate.$touch()"
            @blur="
              v.floodRate.$touch();
              checkField(index, 'floodRate');
            "
            readonly
          />
        </div>
        <div class="Row Percentaje">
          <v-text-field
            v-model.trim="v.otherRate.$model"
            @input="v.otherRate.$touch()"
            @blur="
              v.otherRate.$touch();
              checkField(index, 'otherRate');
            "
            readonly
          />
        </div>
      </div>

      <!--BOTON AÑADIR-->
      <div class="Line ButtonLine">
        <v-btn class="btn" rounded text color="#003D6D" @click="addFields()">
          <v-icon class="mr-2"> mdi-plus-circle </v-icon>
          Add New
        </v-btn>
      </div>

      <!--SEPARADOR-->
      <div class="ExpansionLineTop mt-4 HideOnMovil" />
    </div>
  </div>
</template>
<script>
/* validations */
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { formValidations } from "@/mixins/formValidations";
/* constantes */
import { proportionalCategories } from "../../constants/proportionalCategories";
import { mapActions, mapGetters } from "vuex";
/* components */
import Modal from "@/components/Rate/Modal.vue";
import Decimal from "decimal.js";

export default {
  name: "CatTableProp",
  mixins: [validationMixin, formValidations],
  components: { Modal },
  data() {
    return {
      items: proportionalCategories,
      dialog: false,
    };
  },
  async mounted() {
    await this.loadMultipleSectionRatesModal({ table: "catTable" });
  },
  computed: {
    ...mapGetters(["deductions", "catRatesGroup", "quotation"]),
    sumDeductions: {
      get() {
        const op =
          (!this.deductions.brokerage ? 0 : parseFloat(this.deductions.brokerage)) +
          (!this.deductions.fronting ? 0 : parseFloat(this.deductions.fronting)) +
          (!this.deductions.eng ? 0 : parseFloat(this.deductions.eng)) +
          (!this.deductions.taxes ? 0 : parseFloat(this.deductions.taxes)) +
          (!this.deductions.lta ? 0 : parseFloat(this.deductions.lta)) +
          (!this.deductions.others ? 0 : parseFloat(this.deductions.others));
        return op.toFixed(2);
      },
    },
    computedGroup: {
      get() {
        const sum = this.sumDeductions;

        return this.catRatesGroup.map((i) => {
          const row = i;
          const eq = proportionalCategories.find((v) => v.id === i.earthquake) || { earthquake: 0 };
          const hy = proportionalCategories.find((v) => v.id === i.hidro) || {
            hydro: 0,
          };
          const fl = proportionalCategories.find((v) => v.id === i.flood) || {
            flood: 0,
          };
          const ot = proportionalCategories.find((v) => v.id === i.other) || {
            other: 0,
          };

          const calcDeductions = Decimal.div(100 - sum, 100);
          const eqOp = Decimal.div(eq.earthquake, calcDeductions);
          const hyOp = Decimal.div(hy.hydro, calcDeductions);
          const flOp = Decimal.div(fl.flood, calcDeductions);
          const otOp = Decimal.div(ot.other, calcDeductions);
          row.earthquakeRate = eqOp.toFixed(3);
          row.windRate = hyOp.toFixed(3);
          row.floodRate = flOp.toFixed(3);
          row.otherRate = otOp.toFixed(3);

          return row;
        });
      },
    },
  },
  validations: {
    computedGroup: {
      $each: {
        country: { required },
        rate: { required },
        earthquake: { required },
        hidro: { required },
        flood: { required },
        other: { required },
        earthquakeRate: { required },
        windRate: { required },
        floodRate: { required },
        otherRate: { required },
      },
    },
  },
  methods: {
    ...mapActions(["saveRatesModalColumn", "loadMultipleSectionRatesModal", "addNewFieldModal"]),
    addFields() {
      this.addNewFieldModal("catTable");
    },
    removeField(index) {
      const id = this.$v.computedGroup.$each[index].$model.id;
      this.catRatesGroup.splice(index, 1);
      this.saveRatesModalColumn({
        table: "catTable",
        key: "active",
        value: false,
        id,
      });
    },
    async checkField(index, column) {
      if (this.$v.computedGroup.$each[index][column].$invalid || this.$v.computedGroup.$each[index][column].$error) return;
      const value = this.$v.computedGroup.$each[index][column].$model;
      const id = this.$v.computedGroup.$each[index].$model.id;
      await this.saveRatesModalColumn({
        table: "catTable",
        key: column,
        value,
        id,
      });
    },
  },
};
</script>
<style lang="less" scoped>
/*
Se importan los stilos compartidos por los componentes
del tarifador, controlan:
	- Clase .flex()
	- Contenedor general
*/
@import "~@/assets/style/Subscription/Rate.less";

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

    .Row {
      .flex();
      width: 9%;
      height: 50px;
      justify-content: center;
      text-align: center;
    }

    .Number {
      width: 3%;
    }
    .Bold {
      font-weight: 600;
    }
    .Percentaje {
      width: 9%;
    }
  }
}
</style>
