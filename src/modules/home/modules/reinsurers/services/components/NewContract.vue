<template>
  <div>
    <div class="reinsurers-wrapper">
      <!-- Sección 1: Reinsurer -->
      <div class="section">
        <div class="section-title">Data Basic</div>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="Name contract" v-model="reinsuranceRegistry.nameContract"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="reinsuranceRegistry.inceptionDate" label="Inception Date" v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="reinsuranceRegistry.inceptionDate" @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-menu v-model="menuExpiry" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="reinsuranceRegistry.expiryDate" label="Expiry Date" v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="reinsuranceRegistry.expiryDate" @input="menuExpiry = false"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </div>
    </div>
    <!-- Sección 2: Capacity -->
    <div class="reinsurers-wrapper">
      <div class="section">
        <div class="section-title">Capacity</div>
        <v-data-table :headers="capacityHeaders" :items="capacityRows" item-key="rowId" hide-default-footer class="capacity-table">
          <template v-slot:item="{ item, index }">
            <tr style="height: 64px">
              <td>
                <v-autocomplete v-model="item.type" :items="capacityTypes" label="Select type" clearable :rules="[(v) => !!v || 'Required']" />
              </td>

              <v-text-field v-model="item.amount" label="Amount" @input="formatAmountRowInput(index)" @blur="formatAmountRowBlur(index)" />

              <td>
                <div @click="removeCapacityRow(index)" style="cursor: pointer">
                  <img src="@/assets/img/icons/trash.png" alt="delete" />
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>

        <v-btn class="mt-3" @click="addCapacityRow"> <img src="@/assets/img/icons/plus.png" alt="add" /> Add capacity </v-btn>
      </div>
    </div>

    <!-- Sección: Period (tabla dinámica) -->
    <div class="reinsurers-wrapper">
      <div class="section">
        <div class="section-title">Period</div>

        <v-data-table :headers="periodHeaders" :items="periodRows" item-key="rowId" hide-default-footer class="period-table">
          <template v-slot:item="{ item, index }">
            <tr style="height: 64px">
              <td>
                <v-autocomplete v-model="item.type" :items="periodTypes" label="Select type" clearable :rules="[(v) => !!v || 'Required']" />
              </td>

              <v-text-field v-model="item.months" label="Months" @input="(val) => formatMonthsRow(index, val)" />

              <td>
                <div @click="removePeriodRow(index)" style="cursor: pointer">
                  <img src="@/assets/img/icons/trash.png" alt="delete" />
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>

        <v-btn class="mt-3" @click="addPeriodRow"> <img src="@/assets/img/icons/plus.png" alt="add" /> Add period </v-btn>
      </div>
    </div>

    <!-- Sección 4: Activities -->
    <div class="reinsurers-wrapper">
      <div class="section">
        <div class="section-title">Restricted Activities</div>
        <v-data-table :headers="activityHeaders" :items="actividades" item-key="id">
          <template v-slot:item.actions="{ item, index }">
            <v-icon @click="deleteActivity(index)">mdi-delete</v-icon>
          </template>
          <template v-slot:item="{ item, index }">
            <tr style="height: 64px">
              <td>
                <v-autocomplete v-model="item.valueActivities" :items="catalogActivities" item-value="id" item-text="description" label="Select Activity" />
              </td>
              <td>
                <div @click="deleteActivity(index)" style="cursor: pointer">
                  <img src="@/assets/img/icons/trash.png" alt="delete" />
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>
        <v-btn @click="addActivity"> <img src="@/assets/img/icons/plus.png" alt="delete" /> Activity </v-btn>
      </div>
    </div>

    <!-- Sección 5: Territorios Restringidos -->
    <div class="reinsurers-wrapper">
      <div class="section">
        <div class="section-title">Restricted Regions</div>
        <v-data-table :headers="territoryHeaders" :items="territories" item-key="id">
          <template v-slot:item.actions="{ item, index }">
            <v-icon @click="deleteTerritory(index)">mdi-delete</v-icon>
          </template>
          <template v-slot:item="{ item, index }">
            <tr style="height: 64px">
              <td>
                <v-autocomplete v-model="item.valueCountries" :items="catalogCountries" item-value="id" item-text="description" label="Select Region" />
              </td>
              <td>
                <div @click="deleteTerritory(index)" style="cursor: pointer">
                  <img src="@/assets/img/icons/trash.png" alt="delete" />
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>
        <v-btn @click="addTerritory"> <img src="@/assets/img/icons/plus.png" alt="delete" /> Region </v-btn>
      </div>
    </div>

    <!-- Sección 7: Broker Commission -->
    <div class="reinsurers-wrapper">
      <div class="section">
        <div class="section-title">Broker Commission</div>

        <v-data-table :headers="brokerCommHeaders" :items="brokerCommissions" item-key="rowId" hide-default-footer class="broker-table">
          <template v-slot:item="{ item, index }">
            <tr style="height: 64px">
              <td>
                <v-autocomplete v-model="item.brokerId" :items="catalogBrokers" item-value="id" item-text="name" label="Select broker" clearable :rules="[(v) => !!v || 'Required', (v) => brokerNotRepeated(v, index) || 'Already selected']" />
              </td>

              <td>
                <v-text-field v-model="item.percent" label="%" @input="formatPercentageRow(index)" persistent-hint />
              </td>

              <td>
                <div @click="removeBrokerRow(index)" style="cursor: pointer">
                  <img src="@/assets/img/icons/trash.png" alt="delete" />
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>

        <v-btn class="mt-3" @click="addBrokerRow"> <img src="@/assets/img/icons/plus.png" alt="add" /> Add broker </v-btn>
      </div>
    </div>

    <!-- Sección 6: Deductions -->
    <div class="reinsurers-wrapper">
      <div class="section">
        <div class="section-title">Deductions</div>

        <v-row>
          <!-- Select de tipo de deducción -->
          <v-col cols="12" sm="6" md="4">
            <v-select label="Deduction type" v-model="reinsuranceRegistry.deductionType" :items="deductionTypes" clearable />
          </v-col>

          <!-- Discount % (solo activo si deductionType !== 'standar') -->
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Discount %"
              v-model="reinsuranceRegistry.discount"
              :disabled="reinsuranceRegistry.deductionType === 'standar' || !reinsuranceRegistry.deductionType"
              @input="formatPercentageInput('discount')"
              :rules="[(v) => reinsuranceRegistry.deductionType === 'standar' || (v && v.trim() !== '') || 'Required when type is not standar']"
              hint="Ej. 2.30%, 4.00%, 5.55%"
              persistent-hint
            />
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- Sección 8: Premium Payment Terms -->
    <div class="reinsurers-wrapper">
      <div class="section">
        <div class="section-title">Premium Payment Terms</div>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="Days" v-model="reinsuranceRegistry.days" type="text" @input="formatDiasInput" @blur="formatDiasBlur"></v-text-field>
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- Sección 9: Claim -->
    <div class="reinsurers-wrapper">
      <div class="section">
        <div class="section-title">Claim</div>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="reinsuranceRegistry.Claimsretention"
              label="Claims retention fund"
              type="text"
              :rules="[(value) => !value || !isNaN(value.replace(/,/g, '')) || 'Only numeric values are allowed']"
              @input="formatClaimFundInputSimple"
              @blur="formatClaimFundBlurSimple"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="reinsuranceRegistry.ClaimControl"
              label="Claim control"
              type="text"
              :rules="[(value) => !value || !isNaN(value.replace(/,/g, '')) || 'Only numeric values are allowed']"
              @input="formatClaimControlInputSimple"
              @blur="formatClaimControlBlurSimple"
            />
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- Sección X: Broker Contacts -->
    <div class="reinsurers-wrapper">
      <div class="section">
        <div class="section-title">Broker Contacts</div>

        <v-data-table :headers="contactHeaders" :items="contactRows" item-key="rowId" hide-default-footer>
          <template v-slot:item="{ item, index }">
            <tr>
              <td>
                <v-text-field v-model="item.name" label="Name" />
              </td>
              <td>
                <v-text-field v-model="item.email" label="Email" :rules="[(v) => !!(v && v.trim()) || 'Required', (v) => isValidEmail(v) || 'Please enter a valid email address']" />
              </td>
              <td class="text-center">
                <div @click="removeContactRow(index)" style="cursor: pointer">
                  <img src="@/assets/img/icons/trash.png" alt="delete" />
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>

        <v-btn class="mt-3" @click="addContactRow"> <img src="@/assets/img/icons/plus.png" alt="add" /> Add contact </v-btn>
      </div>
    </div>

    <div class="finishButtonCont mt-7 d-flex justify-end align-center mb-7">
      <button class="button-new-contract finishBtn" @click="submit()">Create</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      reinsuranceRegistry: {
        nameContract: "",
        inceptionDate: "",
        expiryDate: "",
        property: "",
        Engineering: "",
        cpe: "",
        propertyPeriodo: "",
        PeriodEngineering: "",
        cpePeriodo: "",
        Claimsretention: "",
        ClaimControl: "",
        days: "",
        deductionType: "standar",
        discount: "",
      },

      menu2: false, // Control para el menú de Inception Date
      menuExpiry: false, // Control para el menú de Expiry Date

      actividades: [{ valueActivities: "", idActivities: 0 }],
      territories: [{ valueCountries: "", idCountries: 0 }],
      deductionTypes: ["fixed", "standar", "other", "maximum"],
      contactRows: [{ rowId: 1, name: "", email: "" }], // contactos independientes
      brokerCommissions: [{ rowId: 1, brokerId: null, percent: "" }],

      catalogActivities: [],
      catalogCountries: [],
      catalogBrokers: [],

      contactHeaders: [
        { text: "Name", value: "name", align: "start" },
        { text: "Email", value: "email", align: "start" },
        { text: "Action", value: "actions", align: "center" },
      ],

      activityHeaders: [
        { text: "Activity", align: "start", key: "activity" },
        { text: "Action", align: "start" },
      ],

      territoryHeaders: [
        { text: "Region", align: "start", key: "region" },
        { text: "Action", align: "start" },
      ],

      brokerCommHeaders: [
        { text: "Broker", value: "broker", align: "start" },
        { text: "%", value: "percent", align: "start" },
        { text: "Action", value: "actions", align: "start" },
      ],
      _rowSeq: 1, // contador simple para keys únicas
      _contactSeq: 1,

      capacityRows: [{ rowId: 1, type: null, amount: "" }],
      capacityTypes: ["Property", "Engineering (CAR/EAR)", "CPE"],
      capacityHeaders: [
        { text: "Type", value: "type" },
        { text: "Amount", value: "amount" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      _capRowSeq: 1,

      periodRows: [{ rowId: 1, type: null, months: "" }],
      periodTypes: ["Property", "Engineering (CAR/EAR)", "CPE"],
      periodHeaders: [
        { text: "Type", value: "type" },
        { text: "Months", value: "months" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  watch: {
    "reinsuranceRegistry.deductionType"(val) {
      if (val === "standar") this.reinsuranceRegistry.discount = "";
    },
  },

  methods: {
    _filledBrokerRows() {
      return this.brokerCommissions.filter((r) => r.brokerId && /\d/.test(r.percent || ""));
    },
    _filledTerritories() {
      return this.territories.filter((t) => t.valueCountries && t.valueCountries.toString().trim() !== "");
    },
    _filledActivities() {
      return this.actividades.filter((a) => a.valueActivities && a.valueActivities.toString().trim() !== "");
    },
    _filledContacts() {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return (this.contactRows || []).filter((c) => c.name && c.name.trim() !== "" && c.email && emailRegex.test(c.email));
    },
    _filledperiodRows() {
      return this.periodRows.filter((f) => f.type && f.type.toString().trim() !== "");
    },
    _filledcapacityRows() {
      return this.capacityRows.filter((w) => w.type && w.type.toString().trim() !== "");
    },
    submit() {
      let valid = true;
      let missingFields = [];

      // Campos obligatorios
      const requiredFields = ["nameContract", "inceptionDate", "expiryDate", "property", "Engineering", "cpe", "propertyPeriodo", "PeriodEngineering", "cpePeriodo", "Claimsretention", "ClaimControl", "days", "deductionType", "discount"];

      requiredFields.forEach((field) => {
        if (!this.reinsuranceRegistry[field] || this.reinsuranceRegistry[field].toString().trim() === "") {
          valid = false;
          missingFields.push(field);
        }
      });

      // Validar tablas con mínimo 1 registro
      if (!this.brokerCommissions || this.brokerCommissions.length === 0) {
        valid = false;
        missingFields.push("brokers (Min 1 row)");
      }
      if (!this.territories || this.territories.length === 0) {
        valid = false;
        missingFields.push("Regions (Min 1 row)");
      }
      if (!this.actividades || this.actividades.length === 0) {
        valid = false;
        missingFields.push("activities (Min 1 row)");
      }
      if (!this.contactRows || this.contactRows.length === 0) {
        valid = false;
        missingFields.push("contact (Min 1 row)");
      }
      if (!this.capacityRows || this.capacityRows.length === 0) {
        valid = false;
        missingFields.push("Capacity (Min 1 row)");
      }
      if (!this.periodRows || this.periodRows.length === 0) {
        valid = false;
        missingFields.push("Period (Min 1 row)");
      }

      // Mostrar errores si faltan campos
      if (!valid) {
        console.warn("Campos faltantes o inválidos:", missingFields);
        alert("Por favor, complete todos los campos requeridos");
        return;
      }

      // Si pasa las validaciones
      console.log("=== Datos del formulario ===");
      console.log("reinsuranceRegistry:", this.reinsuranceRegistry);
      console.log("Brokers:", this.brokerCommissions);
      console.log("Regions:", this.territories);
      console.log("Activities:", this.actividades);
      console.log("contactRows:", this.contactRows);
      console.log("capacityRows:", this.capacityRows);
      console.log("periodRows:", this.periodRows);

      // Aquí iría la lógica para enviar datos
      // this.$store.dispatch("guardarContrato", payload)
      console.log("Formulario válido, enviando datos...");
    },

    // Formatear Claimsretention
    formatClaimFundInputSimple() {
      const v = this.reinsuranceRegistry.Claimsretention || "";
      let value = v.replace(/[^0-9.]/g, "");
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.reinsuranceRegistry.Claimsretention = value;
    },

    formatClaimFundBlurSimple() {
      const raw = this.reinsuranceRegistry.Claimsretention;
      if (!raw) return;
      const num = parseFloat(raw.replace(/,/g, ""));
      if (isNaN(num)) return;
      this.reinsuranceRegistry.Claimsretention = num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    // Formatear ClaimControl
    formatClaimControlInputSimple() {
      const v = this.reinsuranceRegistry.ClaimControl || "";
      let value = v.replace(/[^0-9.]/g, "");
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.reinsuranceRegistry.ClaimControl = value;
    },

    formatClaimControlBlurSimple() {
      const raw = this.reinsuranceRegistry.ClaimControl;
      if (!raw) return;
      const num = parseFloat(raw.replace(/,/g, ""));
      if (isNaN(num)) return;
      this.reinsuranceRegistry.ClaimControl = num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    // Formato para "days" - Solo permite números con "days"
    formatDiasInput(value) {
      const v = (value ?? "").toString().replace(/[^0-9]/g, "");
      this.reinsuranceRegistry.days = v ? `${v} days` : "";
    },

    formatDiasBlur() {
      if (this.reinsuranceRegistry.days) {
        this.reinsuranceRegistry.days = this.reinsuranceRegistry.days.replace(/[^0-9]/g, "");
        if (this.reinsuranceRegistry.days) {
          this.reinsuranceRegistry.days = this.reinsuranceRegistry.days + " days";
        }
      }
    },

    formatPercentageInput(field) {
      let value = this.reinsuranceRegistry[field];
      if (value) {
        value = value.replace(/[^0-9.]/g, "");
        const parts = value.split(".");
        if (parts.length > 2) {
          parts.splice(2);
        }
        value = parts.join(".");
        if (value.indexOf(".") !== -1) {
          value = value.substring(0, value.indexOf(".") + 3);
        }
        if (!value.includes("%")) {
          value += "%";
        }
        this.reinsuranceRegistry[field] = value;
      }
    },

    // Agregar nueva actividad
    addActivity() {
      this.actividades.push({ valueActivities: "", idActivities: 0 });
    },

    // Eliminar actividad
    deleteActivity(index) {
      this.actividades.splice(index, 1);
    },

    // Agregar nuevo territorio
    addTerritory() {
      this.territories.push({ valueCountries: "", idCountries: 0 });
    },

    // Eliminar territorio
    deleteTerritory(index) {
      this.territories.splice(index, 1);
    },

    // Agregar nueva fila a Broker
    addBroker() {
      this.brokers.push({ name: "", contact: "" });
    },

    // Eliminar fila de Broker
    deleteBroker(index) {
      this.brokers.splice(index, 1);
    },

    // Validación del correo electrónico
    validateEmailInput(item, index) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(item.contact)) {
        console.error("Invalid email format");
      }
    },

    isValidEmail(value) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(value);
    },

    addBrokerRow() {
      this._rowSeq += 1;
      this.brokerCommissions.push({ rowId: this._rowSeq, brokerId: null, percent: "" });
    },

    removeBrokerRow(index) {
      this.brokerCommissions.splice(index, 1);
      if (this.brokerCommissions.length === 0) this.addBrokerRow();
    },

    // evita duplicados
    brokerNotRepeated(brokerId, rowIndex) {
      if (!brokerId) return true;
      return this.brokerCommissions.findIndex((r) => r.brokerId === brokerId) === rowIndex;
    },

    // Formato 2 decimales + símbolo %, p.e. “2.30%”
    formatPercentageRow(index) {
      let raw = (this.brokerCommissions[index].percent || "").toString();
      raw = raw.replace(/[^0-9.]/g, "");
      const parts = raw.split(".");
      if (parts.length > 2) {
        raw = parts[0] + "." + parts[1];
      }
      if (raw.includes(".")) {
        const [int, dec] = raw.split(".");
        raw = int + "." + dec.slice(0, 2);
      }
      this.brokerCommissions[index].percent = raw ? raw + "%" : "";
    },

    addContactRow() {
      this._contactSeq += 1;
      this.contactRows.push({ rowId: this._contactSeq, name: "", email: "" });
    },

    removeContactRow(index) {
      this.contactRows.splice(index, 1);
      if (this.contactRows.length === 0) this.addContactRow();
    },

    addCapacityRow() {
      const newId = this.capacityRows.length ? Math.max(...this.capacityRows.map((r) => r.rowId)) + 1 : 1;
      this.capacityRows.push({ rowId: newId, type: null, amount: "" });
    },

    removeCapacityRow(index) {
      this.capacityRows.splice(index, 1);
    },

    formatAmountRow(index) {
      let val = this.capacityRows[index].amount.replace(/,/g, "");
      if (!isNaN(val) && val !== "") {
        this.capacityRows[index].amount = Number(val).toLocaleString();
      }
    },

    addPeriodRow() {
      const newId = this.periodRows.length ? Math.max(...this.periodRows.map((r) => r.rowId)) + 1 : 1;
      this.periodRows.push({ rowId: newId, type: null, months: "" });
    },

    removePeriodRow(index) {
      this.periodRows.splice(index, 1);
      if (this.periodRows.length === 0) this.addPeriodRow();
    },

    formatAmountRowInput(index) {
      const v = (this.capacityRows[index].amount || "").toString();
      let value = v.replace(/[^0-9.]/g, ""); // solo dígitos y punto
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // miles
      this.capacityRows[index].amount = value;
    },

    // BLUR: fija a 2 decimales
    formatAmountRowBlur(index) {
      const raw = this.capacityRows[index].amount;
      if (!raw) return;
      const num = parseFloat(raw.replace(/,/g, ""));
      if (isNaN(num)) return;
      this.capacityRows[index].amount = num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
  },

  computed: {
    ...mapGetters(["countries", "activities", "brokers", "currencies"]),
  },

  mounted() {
    this.$store.dispatch("getCatalogByName", { name: "activities" }).then(() => {
      this.catalogActivities = this.activities;
    });
    /*this.$store.dispatch("getCatalogByName", { name: "countries" }).then(() => {
      this.catalogCountries = this.countries;
    });*/
    this.$store.dispatch("getCatalogByName", { name: "brokers" }).then(() => {
      this.catalogBrokers = this.brokers;
    });
    this.$store.dispatch("getCatalogByName", { name: "currencies" }).then(() => {
      console.log(this.currencies);
      const uniqueRegions = [...new Set(this.currencies.map((item) => item.region))];
      const regionsFormatted = uniqueRegions.map((region, index) => ({
        id: index + 1,
        description: region,
      }));
      console.log(regionsFormatted);
      this.catalogCountries = regionsFormatted;
    });
  },
};
</script>

<style scoped>
.section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.v-btn {
  margin-top: 1rem;
}

.reinsurers-wrapper {
  width: 100%;
  height: auto;
  border-radius: 5px;
  background: white;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem 2rem;
}

@media (max-width: 768px) {
  .v-col {
    flex: 1 1 100%;
  }
}
</style>
