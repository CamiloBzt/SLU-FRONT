<template>
  <div class="w-100 d-flex justify-space-between flex-wrap">
    <div class="inputCont">
      <v-text-field label="Risk Reference" v-model="subscription_id" disabled />
    </div>
    <div class="inputCont">
      <v-select
        v-model.trim="$v.boundEng.status.$model"
        @blur="
          SET_BOUND_ENG('status', this);
          checkField('status');
        "
        label="Status"
        :items="statusEng"
        item-text="data"
        item-value="id"
        :disabled="statusEng.length === 0"
      ></v-select>
    </div>
    <div class="inputCont">
      <v-select
        v-model.trim="accountInformation.typeOfRisk"
        label="Line"
        :items="risk_type"
        item-text="key"
        item-value="id"
        :hint="`${accountInformation.typeOfRisk.description || 'Select a Line of Risk'}`"
        disabled
      ></v-select>
    </div>
    <div class="inputCont">
      <v-text-field v-model.trim="subscription_type" label="Business" disabled />
    </div>
    <div class="inputCont">
      <v-select
        v-model.trim="$v.boundEng.underwriter.$model"
        @blur="
          SET_BOUND_ENG('underwriter', this);
          checkField('underwriter');
        "
        label="Underwriter"
        :items="underwriter"
        item-text="data"
        item-value="id"
        :disabled="underwriter.length === 0"
      ></v-select>
    </div>

    <div class="inputCont">
      <v-select
        v-model.trim="$v.boundEng.awAnalist1.$model"
        @blur="
          SET_BOUND_ENG('awAnalist1', this);
          checkField('awAnalist1');
        "
        label="UW Analist 1"
        :items="underwriter"
        item-text="data"
        item-value="id"
        :disabled="underwriter.length === 0"
      ></v-select>
    </div>
    <div class="inputCont">
      <v-select
        v-model.trim="$v.boundEng.awAnalist2.$model"
        @blur="
          SET_BOUND_ENG('awAnalist2', this);
          checkField('awAnalist2');
        "
        label="UW Analist 2"
        :items="underwriter"
        item-text="data"
        item-value="id"
        :disabled="underwriter.length === 0"
      ></v-select>
    </div>
    <div class="inputCont">
      <v-select
        v-model.trim="selectedUnderwriterMonth"
        label="Underwriting Month"
        :items="underwriterMonth"
        item-text="data"
        item-value="id"
        :loading="underwriterMonth.length === 0"
        disabled
      />
    </div>
    <div class="inputCont">
      <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field v-model="quotation.inceptionDate" label="Inception" readonly v-bind="attrs" v-on="on" disabled></v-text-field>
        </template>
        <v-date-picker v-model="quotation.inceptionDate" @input="menu2 = false"></v-date-picker>
      </v-menu>
    </div>
    <div class="inputCont">
      <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field v-model="quotation.expiryDate" label="Expiry " readonly v-bind="attrs" v-on="on" disabled></v-text-field>
        </template>
        <v-date-picker v-model="quotation.expiryDate" @input="menu = false"></v-date-picker>
      </v-menu>
    </div>
    <div class="inputCont">
      <v-text-field label="Term" v-model="term" disabled />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
/* validations */
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { formValidations } from '@/mixins/formValidations';
/* libs & helpers */
import Decimal from 'decimal.js';
import numeral from 'numeral';
/* lodash */
import { debounce } from 'lodash';

export default {
  name: 'InputsRiskQuotator',
  mixins: [validationMixin, formValidations],
  data() {
    return {
      menu2: false,
      menu: false,

      formatter: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
    };
  },
  async beforeMount() {
    await this.getCatalogByName({ name: 'underwriters' });
    await this.getCatalogByName({ name: 'status_eng' });
    await this.getCatalogByName({ name: 'underwriter_month' });
    await this.getCatalogByName({ name: 'business_bound' });
  },
  mounted() {
    if (!this.quotation.inceptionDate) this.quotation.inceptionDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10);
    if (!this.quotation.expiryDate)
      this.quotation.expiryDate = new Date(Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10);
  },
  computed: {
    ...mapGetters([
      'risk_type',
      'accountInformation',
      'subscription_id',
      'subscription_type',
      'quotation',
      'statusEng',
      'businessBound',
      'underwriter',
      'underwriterMonth',
      'boundEng',
    ]),
    term: {
      get() {
        const div = 30;

        const inceptionDate = new Date(this.quotation.inceptionDate || 0);
        const expiryDate = new Date(this.quotation.expiryDate || 0);
        const dateSubs = (expiryDate.getTime() - inceptionDate.getTime()) / (1000 * 60 * 60 * 24);

        const result = Decimal.div(dateSubs, div);
        return this.formatter.format(result);
      },
    },
    selectedUnderwriterMonth: {
      get() {
        const inception = new Date(this.quotation.inceptionDate);
        const month = inception.getMonth();
        if (this.underwriterMonth.length) return this.underwriterMonth[month].id;
        return 1;
      },
      set() {},
    },
  },
  watch: {
    term: debounce(function(val) {
      this.$v.boundEng.term.$model = numeral((val || '$0').replace('$', '')).value() || 0;
      this.SET_BOUND_ENG('term', numeral((val || '$0').replace('$', '')).value() || 0);
      this.checkField('term');
    }, 1000),
    selectedUnderwriterMonth: debounce(function(val) {
      this.$v.boundEng.underwriterMonth.$model = val;
      this.SET_BOUND_ENG('underwriterMonth', val);
      this.checkField('underwriterMonth');
    }, 1000),
  },
  methods: {
    ...mapActions(['getCatalogByName', 'saveBoundColumn']),
    ...mapMutations(['SET_BOUND_ENG']),
    async checkField(column) {
      this.$v.boundEng[column].$touch();
      console.log(this.$v.boundEng[column].$invalid, this.$v.boundEng[column].$error);
      if (this.$v.boundEng[column].$invalid || this.$v.boundEng[column].$error) return;
      await this.saveBoundColumn({
        table: 'bound',
        parent: 'boundEng',
        column,
      });
    },
  },
  validations: {
    boundEng: {
      status: { required },
      business: { required },
      underwriter: { required },
      awAnalist1: { required },
      awAnalist2: { required },
      underwriterMonth: { required },
      cedentCompany: { required },
      operatingCompany: { required },
      term: { required },
    },
  },
};
</script>
<style lang="less" scoped>
.inputCont {
  width: 18%;
}
@media (max-width: 650px) {
  .inputCont {
    width: 100%;
  }
}
</style>
