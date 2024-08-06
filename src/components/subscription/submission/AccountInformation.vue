<template>
  <v-expansion-panels
    class="ExpansionComponent ExpansionBordered mt-3"
    v-model="accountPanel"
  >
    <ConfirmationPrecaptureModal
        :showConfirmationPrecaptureModal="IsPrecaptured"
        :title="'You have pre captured data Are you want to load them?'"
        @closeConfirmationPrecaptureModal="removeCapture"
        @confirmAction="precapture"
      />
    <v-expansion-panel :disabled="loadingPanel" @change="$emit('panel-event')">
      <!--TITULO DEL ACORDEON-->
      <v-expansion-panel-header
        @click="changeStateExpansive()"
        class="ExpansionTitle"
        expand-icon=""
      >
        Account information

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
          <!--INPUTS-->
          <div class="ExpansionInputContent mb-7">
            <v-text-field
              v-model.trim="$v.accountInformation.insuredName.$model"
              @input="$v.accountInformation.insuredName.$touch()"
              @blur="
                setStateAccount('insuredName', this);
                checkColumn('insuredName');
              "
              required
              :error-messages="
                requiredInputVuelidateParent(
                  'insuredName',
                  'accountInformation'
                )
              "
              label="Insured Name"
            ></v-text-field>
          </div>
          <!--
          <div class="ExpansionInputContent mb-7">
            <v-text-field
              v-model.trim="$v.accountInformation.name.$model"
              @input="$v.accountInformation.name.$touch()"
              @blur="
                setStateAccount('name', this);
                checkColumn('name');
              "
              required
              :error-messages="
                requiredInputVuelidateParent('name', 'accountInformation')
              "
              label="Name"
            ></v-text-field>
          </div>
          -->
          <div class="ExpansionInputContent mb-7">
            <v-select
              v-model.trim="$v.accountInformation.country.$model"
              @input="$v.accountInformation.country.$touch()"
              @blur="
                setStateAccount('country', this);
                checkColumn('country', 'catalog_country_id');
              "
              required
              :error-messages="
                requiredInputVuelidateParent('country', 'accountInformation')
              "
              label="Country"
              :items="countries"
              item-text="description"
              item-value="id"
              :loading="loadingCountries"
              :disabled="countries.length === 0"
            ></v-select>
          </div>
          <div class="ExpansionInputContent mb-7">
            <v-select
              v-model.trim="$v.accountInformation.typeOfRisk.$model"
              @input="
                $v.accountInformation.typeOfRisk.$touch();
                changeTypeOfRisk($v.accountInformation.typeOfRisk.$model.key);
              "
              @blur="
                setStateAccount('typeOfRisk', this);
                checkColumn('typeOfRisk', 'catalog_type_risk_id');
                changeTypeOfRisk(selectedRisk.key);
              "
              @change="resetActivities()"
              required
              :error-messages="
                requiredInputVuelidateParent('typeOfRisk', 'accountInformation')
              "
              label="Line of Risk"
              :items="risk_type"
              item-text="key"
              item-value="id"
              :hint="`${selectedRisk.description || 'Select a Line of Risk'}`"
              :loading="loadingRisks"
              :disabled="risk_type.length === 0 || facultativeReference !== null"
            ></v-select>
          </div>

          <div class="ExpansionInputContent">
            <v-select
              v-model.trim="$v.accountInformation.activity.$model"
              @input="$v.accountInformation.activity.$touch()"
              @blur="
                setStateAccount('activity', this);
                checkColumn('activity', 'catalog_activity_id');
              "
              required
              :error-messages="
                requiredInputVuelidateParent('activity', 'accountInformation')
              "
              label="Activity"
              :items="filteredActivities"
              :disabled="activityDisabled"
              item-text="description"
              item-value="id"
              :loading="loadingActivities"
            ></v-select>
          </div>
          <div class="ExpansionInputContent">
            <v-select
              v-model.trim="$v.accountInformation.currency.$model"
              @input="$v.accountInformation.currency.$touch()"
              @blur="
                setStateAccount('currency', this);
                checkColumn('currency', 'catalog_currency_id');
              "
              required
              :error-messages="
                requiredInputVuelidateParent('currency', 'accountInformation')
              "
              label="Currency"
              :items="currencies"
              item-text="key"
              item-value="id"
              :hint="`${selectedCurrency.region || 'Region'}, ${
                selectedCurrency.description || 'Description'
              }`"
              persistent-hint
              :loading="loadingCurrencies"
              :disabled="currencies.length === 0"
            >
              <template
                slot="item"
                slot-scope="data"
              >
                {{ data.item.key }} - {{ data.item.description }}
              </template>
            </v-select>
          </div>
          <div class="ExpansionInputContent">
            <v-select
              v-model.trim="$v.accountInformation.broker.$model"
              @input="$v.accountInformation.broker.$touch()"
              @blur="
                setStateAccount('broker', this);
                checkColumn('broker');
              "
              label="Broker"
              :items="availableBrokers"
              item-text="name"
              item-value="id"
              hint="Select a Broker"
              clearable
              :loading="loadingBrokers"
              :disabled="availableBrokers.length === 0"
            />
          </div>
          <div class="ExpansionInputContent">
            <v-select
              v-model.trim="$v.accountInformation.cedent.$model"
              @input="$v.accountInformation.cedent.$touch()"
              @blur="
                setStateAccount('cedent', this);
                checkColumn('cedent');
              "
              required
              :error-messages="
                requiredInputVuelidateParent('cedent', 'accountInformation')
              "
              label="Cedent"
              :items="availableCedents"
              item-text="name"
              item-value="id"
              hint="Select Cedent"
              :loading="loadingCedents"
              :disabled="availableCedents.length === 0"
            ></v-select>
          </div>

          <div class="ExpansionInputContent HideOnMovil"></div>

          <!--SEGUNDO ACORDEON-->
          <v-expansion-panels
            class="SubExpansionComponent mt-5"
            v-model="contactPanel"
          >
            <v-expansion-panel @change="$emit('panel-event')">
              <!--TITULO DEL ACORDION-->
              <v-expansion-panel-header
                @click="changeSubExpansion"
                class="ExpansionTitle d-flex justify-start"
                expand-icon=""
              >
                <template v-slot:actions>
                  <div class="subIconCont d-flex justify-start align-center">
                    <v-icon class="iconExpand mr-1">
                      {{ iconSubExpansion }}
                    </v-icon>

                    <div class="SubExpansionTitle">Contact</div>
                  </div>
                </template>
              </v-expansion-panel-header>
              <!--CONTENIDO DEL ACORDION-->
              <v-expansion-panel-content>
                <div class="ExpandContent">
                  <v-form
                    class="SubForm"
                    v-model="validContacts"
                    lazy-validation
                    ref="contactsForm"
                    @submit.prevent="null"
                  >
                    <div class="ExpandContent">
                      <div class="ExpansionInputContent">
                        <v-autocomplete
                          v-model.trim="value"
                          :error-messages="requiredInputVuelidate('value')"
                          :items="items"
                          :search-input.sync="search"
                          :loading="loadingItems"
                          placeholder="Start typing to Search"
                          label="Search contact by Name or Email"
                          @change="addValue"
                          item-value="id"
                          :filter="filterAutocomplete"
                          return-object
                          aria-autocomplete="nope"
                          autocomplete="nope"
                          :no-data-text="customText"
                        >
                          <template
                            slot="selection"
                            slot-scope="{ item }"
                          >
                            {{ item.name }} ({{ item.email }})
                          </template>
                          <template
                            slot="item"
                            slot-scope="{ item }"
                          >
                            <template v-if="(typeof item !== 'object')">
                              <v-list-item-content v-text="item.name"></v-list-item-content>
                            </template>
                            <template v-else>
                              <v-list-item-content>
                                <v-list-item-title v-text="item.name"></v-list-item-title>
                                <v-list-item-subtitle v-text="item.email"></v-list-item-subtitle>
                              </v-list-item-content>
                            </template>
                          </template>
                          <template #append-item>
                            <div class="AddCompanyCont">
                              <v-btn
                                text
                                @click="setModalCreateBrokerOrCedent()"
                                class="AddBtn"
                              >
                                <v-icon> mdi-plus-circle-outline </v-icon>
                                Add new Contact
                              </v-btn>
                            </div>
                          </template>
                        </v-autocomplete>
                      </div>
                    </div>
                  </v-form>
                  <!--TABLA-->
                  <UsersTableAccount
                    v-if="selectedItems && selectedItems.length > 0"
                    :selectedItems="selectedItems"
                    @deleteContact="removeValue"
                  />
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import { stateExpansiveManager } from '@/mixins/subscription.js';
import { formValidations } from '@/mixins/formValidations';

/* vuelidate mixin & validators */
import { validationMixin } from 'vuelidate';
import { required, requiredIf, minLength } from 'vuelidate/lib/validators';

import UsersTableAccount from '@/components/subscription/submission/UsersTableAccount.vue';
import ConfirmationPrecaptureModal from "@/components/ConfirmationPrecaptureModal.vue";
export default {
  name: 'AccountInformation',
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  components: {
    UsersTableAccount,
    ConfirmationPrecaptureModal,
  },
  data () {
    return {
      IsPrecaptured: false,
      /* paneles */
      accountPanel: null,
      contactPanel: null,
      /* valids */
      validContacts: true,
      activityDisabled: true,
      itemsTypeOfRisk: ['CAR', 'CPE', 'CECR', 'PRO', 'EAR'],
      /* loaders */
      loadingItems: false,
      loadingPanel: false,
      loadingRisks: false,
      loadingBrokers: false,
      loadingCedents: false,
      loadingContacts: false,
      loadingCountries: false,
      loadingActivities: false,
      loadingCurrencies: false,
      /* contacts */
      value: null,
      search: null,
      selectedItems: [],
    };
  },
  beforeMount () {
    this.resetAccountInformation();
    this.resetContactsInformation();
  },
  async mounted () {
    await this.initData();
  },
  computed: {
    ...mapGetters([
      'contacts',
      'countries',
      'risk_type',
      'currencies',
      'activities',
      'activitiesById',
      'subscription_id',
      'availableBrokers',
      'availableCedents',
      'accountInformation',
      'availableBrokersById',
      'availableBrokersCedents',
      'availableBrokersCedentsByUUID',
      'documents',
      'facultativeReference',
    ]),
    filteredActivities () {
      const id =
        this.accountInformation.typeOfRisk.id ||
        this.accountInformation.typeOfRisk;
      if (typeof id === 'number') {
        this.enableActivities();
        return this.activitiesById(id);
      }
      return [];
    },
    selectAllContacts: {
      get () {
        return this.selectedItems.length === this.contactsItems.length;
      },
    },
    selectSomeContact: {
      get () {
        return this.selectedItems.length > 0 && !this.selectAllContacts;
      },
    },
    icon: {
      get () {
        if (this.selectAllContacts) return 'mdi-close-box';
        if (this.selectSomeContact) return 'mdi-minus-box';
        return 'mdi-checkbox-blank-outline';
      },
    },
    isOptional: {
      get () {
        return true;
      },
    },
    items: {
      get () {
        const filteredArray = this.contacts.filter((x) => {
          if (this.selectedItems.some((v) => v.id === x.id)) return false;
          return true;
        });
        return filteredArray;
      },
    },
    selectedRisk: {
      get () {
        if (
          this.accountInformation.typeOfRisk &&
          this.risk_type &&
          this.risk_type.length > 0
        ) {
          const typeObj = this.risk_type.find(
            (v) => v.id === this.accountInformation.typeOfRisk
          );
          return typeObj;
        }
        return 0;
      },
    },
    selectedCurrency: {
      get () {
        if (
          this.accountInformation.currency &&
          this.currencies &&
          this.currencies.length > 0
        ) {
          const currencyObj = this.currencies.find(
            (v) => v.id === this.accountInformation.currency
          );
          return currencyObj;
        }
        return 0;
      },
    },
    selectedBroker: {
      get () {
        return this.$v.accountInformation.broker.$model;
      },
    },
    selectedCedent: {
      get () {
        return this.$v.accountInformation.cedent.$model;
      },
    },
    customText: {
      get () {
        if (!this.selectedBroker && !this.selectedCedent)
          return 'Select a broker/cedent to see their contacts.';
        if (!Array.from(this.contacts) || Array.from(this.contacts).length <= 0)
          return 'Type some data.';
        return 'No data avilable.';
      },
    },
  },
  watch: {
    '$route.params.subscriptionId': async function (id) {
      this.resetAccountInformation();
      this.resetContactsInformation();

      await this.initData();
    },
    selectedItems: {
      deep: true,
      async handler (val) {
        this.$v.contactsInformation.$model = val;
        await this.checkContacts('contactsInformation', 'contacts');
      },
    },
    search: async function (query) {
      const lit = 'loadingItems';

      if (this[lit]) return;

      this[lit] = !this[lit];

      await this.filterContactsByType({
        contact: [
          { type: 1, id: this.selectedBroker || 0 },
          { type: 2, id: this.selectedCedent || 0 },
        ],
        query,
      });

      this[lit] = false;
    },
  },
  methods: {
    /*
      ENVIA LOS DATOS AL COMPONENTE PADRE.
      ESTA FUNCION RECIVE POR PARAMETRO EL EVENTO
      Y EL NOMBRE DEL INPUT PARA IDENTIFICAR
      A QUE INPUT PERTENECE EL CAMBIO
    */
    ...mapActions([
      'saveColumn',
      'getBrokers',
      'getCedents',
      'loadContacts',
      'getCatalogByName',
      'filterContactsByType',
      'getBrokersAndCedents',
      'getCatalogByDocuments',
      'saveContactsSubmission',
      'resetContactsInformation',
      'checkSubscriptionStored',
      'resetAccountInformation',
    ]),
    ...mapMutations([
      'setDocuments',
      'setStateAccount',
      'setModalCreateBrokerOrCedent',
    ]),
    async checkColumn (column, difname = column) {
      const value = this.$v.accountInformation[column].$model.toString();
      localStorage.setItem(column, value);
      localStorage.setItem("IsPrecaptured", "1");
      if (!this.subscription_id) return;
      this.$v.accountInformation[column].$touch();
      if (this.$v.accountInformation[column].$invalid) return;
      await this.saveColumn({
        table: 'submission',
        parent: 'accountInformation',
        column,
        difname,
      });
    },
    async checkContacts (column, difname = column) {
      if (!this.subscription_id) return;
      this.$v[column].$touch();
      if (this.$v[column].$invalid) return;
      await this.saveContactsSubmission({
        table: 'submission',
        column,
        difname,
      });
    },
    changeTypeOfRisk (text) {
      const newdocs = [];
      this.documents.forEach((item) => {
        if (item.idrisk === this.accountInformation.typeOfRisk) {
          item.text = 'Upload the next document';
          newdocs.push(item);
        }
      });
      this.setDocuments(newdocs);
      this.$emit('changeDocuments', text);
    },
    emitInput (text, inputName) {
      this.$emit(inputName, text);
    },
    enableActivities () {
      this.activityDisabled = false;
    },
    resetActivities () {
      this.$v.accountInformation.activity.$model = '';
    },
    toggle () {
      this.$nextTick(() => {
        if (this.selectAllContacts) {
          this.selectedItems = [];
        } else {
          this.selectedItems = this.contactsItems.map((v) => v.id).slice();
        }
      });
    },
    addValue () {
      const isIncluded = this.selectedItems.includes(this.value);
      if (!isIncluded) this.selectedItems.push(this.value);
      this.$nextTick(() => {
        this.value = null;
      });
    },
    removeValue (id) {
      const item = this.selectedItems.findIndex((v) => v.id == id);
      this.selectedItems.splice(item, 1);
    },
    filterAutocomplete (item, queryText, itemText) {
      return (
        item.name.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
        -1 ||
        item.email.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
        -1
      );
    },
    getCountry (id) {
      const countryName = Array.from(this.countries).find((v) => v.id == id);
      if (countryName && countryName.description)
        return countryName.description;
      return 'N/A';
    },
    precapture() {
      this.IsPrecaptured = false;
      this.$v.accountInformation.insuredName.$model = localStorage.getItem("insuredName");
      this.$v.accountInformation.activity.$model = Number(localStorage.getItem("activity"));
      this.$v.accountInformation.broker.$model = Number(localStorage.getItem("broker"));
      this.$v.accountInformation.cedent.$model = Number(localStorage.getItem("cedent"));
      this.$v.accountInformation.country.$model = Number(localStorage.getItem("country"));
      this.$v.accountInformation.currency.$model = Number(localStorage.getItem("currency"));
      this.$v.accountInformation.typeOfRisk.$model = Number(localStorage.getItem("typeOfRisk"));
    },
    removeCapture(){
      this.IsPrecaptured = false;
      localStorage.removeItem("insuredName");
      localStorage.removeItem("activity");
      localStorage.removeItem("broker");
      localStorage.removeItem("cedent");
      localStorage.removeItem("country");
      localStorage.removeItem("currency");
      localStorage.removeItem("typeOfRisk");
      localStorage.setItem("IsPrecaptured", "0");
      
    }, 
    async initData () {
      /* set loadings (data) */
      const lpa = 'loadingPanel';
      const lri = 'loadingRisks';
      const lco = 'loadingCountries';
      const lac = 'loadingActivities';
      const lcu = 'loadingCurrencies';
      const lbr = 'loadingBrokers';
      const lce = 'loadingCedents';
      const lcn = 'loadingContacts';
      /* loaders to true */
      this[lpa] = !this[lpa];
      this[lri] = !this[lri];
      this[lco] = !this[lco];
      this[lac] = !this[lac];
      this[lcu] = !this[lcu];
      this[lbr] = !this[lbr];
      this[lce] = !this[lce];
      this[lcn] = !this[lcn];
      /* obtención de catálogos */
      await this.getCatalogByName({ name: 'activities' });
      await this.getCatalogByName({ name: 'countries' });
      await this.getCatalogByName({ name: 'risk_type' });
      await this.getCatalogByName({ name: 'currencies' });
      await this.getBrokers();
      await this.getCedents();
      // await this.getBrokersAndCedents()
      await this.getCatalogByDocuments({ name: 'documents' });
      
      await this.checkSubscriptionStored();

      /* loaders to false */
      this[lac] = false;
      this[lco] = false;
      this[lri] = false;
      this[lcu] = false;
      this[lbr] = false;
      this[lce] = false;
      this[lpa] = false;

      if (this.accountInformation.typeOfRisk) {
        this.activityDisabled = false;
      }

      if (this.$route.params && this.$route.params.subscriptionId) {
        this.selectedItems = this.$store.getters.contactsInformation;
      } else {
        const result = localStorage.getItem("IsPrecaptured");
        this.IsPrecaptured = (result && (result !== "0")) ? true : false;
      }
    },
  },
  validations: {
    accountInformation: {
      insuredName: { required },
      // name: { required },
      country: { required },
      typeOfRisk: { required },
      activity: {
        required: requiredIf(({ typeOfRisk: { key } }) => key != 'CPE'),
      },
      currency: { required },
      broker: {
        required: requiredIf(function () {
          return !this.isOptional;
        }),
      },
      cedent: { required },
    },
    contactsInformation: {
      required: requiredIf(function () {
        return !this.isOptional;
      }),
    },
    value: {
      required: requiredIf(function () {
        if (this.selectedItems && this.selectedItems.length > 0) return false;
        return true;
      }),
    },
    selectedItems: { required },
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';

.AddCompanyCont {
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: sticky;
  background-color: white;
  bottom: 0;
  width: 100%;
  .AddBtn {
    width: 100%;
    height: 100%;
    padding-left: 10px !important;
    text-align: left !important;
    border-radius: 0 !important;
    justify-content: flex-start !important;
    text-transform: capitalize;
    i {
      margin-right: 7px;
      font-size: 22px;
    }
  }
}

.w-100 {
  width: 100% !important;
}
@media (max-width: 640px) {
  .ExpansionComponent {
    margin-top: 0px !important;
  }
}
</style>
