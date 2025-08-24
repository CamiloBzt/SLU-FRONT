<template>
  <div>
    <v-expansion-panels class="ExpansionComponent ExpansionBordered mt-6 MarginTopMovil" v-model="userPanel">
      <v-expansion-panel>
        <!--TITULO DEL ACORDEON-->
        <v-expansion-panel-header @click="changeStateExpansive()" class="ExpansionTitle" expand-icon="">
          Contact Information
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
            <!--LINEA DIVISORIA-->
            <div class="ExpansionLineTop"></div>
            <!--INPUTS-->
            <div class="ExpansionInputContent mb-7">
              <v-text-field
                v-model.trim="$v.createContactData.name.$model"
                autocomplete="new-password"
                @input="$v.createContactData.name.$touch()"
                @blur="$v.createContactData.name.$touch()"
                required
                :error-messages="requiredInputVuelidateParent('name', 'createContactData')"
                label="Contact Name"
              >
              </v-text-field>
            </div>
            <div class="ExpansionInputContent mb-7">
              <v-text-field
                v-model.trim="$v.createContactData.email.$model"
                @input="$v.createContactData.email.$touch()"
                @blur="$v.createContactData.email.$touch()"
                required
                type="email"
                :error-messages="requiredEmailVuelidateParent('email', 'createContactData')"
                label="Email"
              >
              </v-text-field>
            </div>
            <div class="ExpansionInputContent mb-7">
              <v-text-field
                v-model.trim="$v.createContactData.phone.$model"
                @input="$v.createContactData.phone.$touch()"
                @blur="$v.createContactData.phone.$touch()"
                required
                :error-messages="requiredInputVuelidateParent('phone', 'createContactData')"
                label="Phone Number"
              >
              </v-text-field>
            </div>
            <div class="ExpansionInputContent mb-7">
              <v-text-field
                v-model.trim="$v.createContactData.address.$model"
                @input="$v.createContactData.address.$touch()"
                @blur="$v.createContactData.address.$touch()"
                required
                :error-messages="requiredInputVuelidateParent('address', 'createContactData')"
                label="Address"
              >
              </v-text-field>
            </div>
            <div class="ExpansionInputContent mb-7">
              <v-select
                v-model.trim="$v.createContactData.type.$model"
                @input="$v.createContactData.type.$touch()"
                @blur="$v.createContactData.type.$touch()"
                required
                :error-messages="requiredInputVuelidateParent('type', 'createContactData')"
                label="Contact Type"
                :items="typeOptions"
                item-text="text"
                item-value="value"
                @change="onTypeChange"
              >
              </v-select>
            </div>
            <div class="ExpansionInputContent mb-7">
              <v-select
                v-model.trim="$v.createContactData.brokerOrCedentId.$model"
                @input="$v.createContactData.brokerOrCedentId.$touch()"
                @blur="$v.createContactData.brokerOrCedentId.$touch()"
                required
                :error-messages="requiredInputVuelidateParent('brokerOrCedentId', 'createContactData')"
                :label="getRelatedEntityLabel()"
                :items="getRelatedEntityItems()"
                item-text="name"
                item-value="id"
                :loading="loadingRelatedEntities"
                return-object
              >
              </v-select>
            </div>
            <div class="ExpansionInputContent">
              <v-switch v-model="createContactData.active" label="Active" color="primary"></v-switch>
            </div>
            <div class="ExpansionInputContent HideOnMovil"></div>
            <div class="WhiteSpace HideOnMovil" />

            <div class="finishButtonCont mt-8 d-flex justify-end align-center">
              <v-btn rounded large class="finishBtn" :loading="loading" depressed @click="cancel()" color="#003D6D" style="margin: 10px"> Cancel </v-btn>
              <v-btn rounded outlined large class="finishBtn" :loading="loading" @click="submitForm()">
                {{ labelButton }}
              </v-btn>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
/* vuelidate mixin & validations */
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { ValidChars, validPhone } from "@/constants/validations";
/* project validations (in some cases depends on vuelidate) */
import { formValidations } from "@/mixins/formValidations";
import { stateExpansiveManager } from "@/mixins/subscription.js";

export default {
  name: "ContactInformation",
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  props: {
    contactId: {
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      userPanel: 0,
      isNew: true,
      labelButton: "Create Contact",
      loadingRelatedEntities: false,
      typeOptions: [
        { text: "Broker", value: "1" },
        { text: "Cedent", value: "2" },
      ],
      createContactData: {
        name: "",
        email: "",
        phone: "",
        address: "",
        type: "",
        brokerOrCedentId: "",
        active: true,
      },
    };
  },
  beforeMount() {
    //console.log(this.contactId);

    // Load brokers and cedents for the selects
    Promise.all([this.getBrokers(), this.getCedents()]);

    if (parseFloat(this.contactId) !== 0) {
      this.isNew = false;
      this.labelButton = "Save";

      // Primero cargar todos los contactos para encontrar el tipo
      this.loadContacts()
        .then(() => {
          const contact = this.contacts.find((c) => c.id == this.contactId);

          if (contact && (contact.type || contact.brokerOrCedentId)) {
            // Si el contacto tiene type, usar getContactsById para obtener datos más específicos
            const contactType = contact.type || (contact.brokerOrCedentId ? 1 : 2); // fallback logic

            this.getContactsById({
              id: contact.brokerOrCedentId || this.contactId,
              type: contactType,
            }).then(() => {
              // Usar los datos específicos de getContactsById
              this.setupContactForEdit();
            });
          } else {
            // Si no tiene type, usar los datos básicos de loadContacts
            this.setupBasicContactForEdit(contact);
          }
        })
        .catch((error) => {
          console.error("Error loading contacts for edit:", error);
          this.$router.push({ name: "list-contacts" });
        });
    }
  },
  computed: {
    ...mapGetters(["contacts", "availableBrokers", "availableCedents"]),
  },
  validations: {
    createContactData: {
      name: { required, ValidChars },
      email: { required, email },
      phone: { required, validPhone },
      address: { required, ValidChars },
      type: { required },
      brokerOrCedentId: { required },
    },
  },
  methods: {
    ...mapActions(["loadContacts", "getBrokers", "getCedents", "createContact"]),
    cancel() {
      this.$router.push({ name: "list-contacts" });
    },
    onTypeChange() {
      // Reset the broker/cedent selection when type changes
      this.createContactData.brokerOrCedentId = "";
    },
    getRelatedEntityLabel() {
      if (this.createContactData.type === "1") {
        return "Select Broker";
      } else if (this.createContactData.type === "2") {
        return "Select Cedent";
      }
      return "Select Entity";
    },
    getRelatedEntityItems() {
      if (this.createContactData.type === "1") {
        return this.availableBrokers;
      } else if (this.createContactData.type === "2") {
        return this.availableCedents;
      }
      return [];
    },

    setupContactForEdit() {
      // Buscar el contacto específico en la lista filtrada
      const contact = this.contacts.find((c) => c.id == this.contactId);
      if (contact) {
        this.createContactData = { ...contact };
        this.mapBrokerOrCedentData(contact);
      }
    },

    setupBasicContactForEdit(contact) {
      if (contact) {
        this.createContactData = { ...contact };
        // Establecer valores por defecto si no existen
        if (!this.createContactData.type) {
          this.createContactData.type = "1"; // default to broker
        }
        if (this.createContactData.active === undefined) {
          this.createContactData.active = true;
        }
      }
    },

    mapBrokerOrCedentData(contact) {
      if (contact.type === 1 || contact.type === "1") {
        const broker = this.availableBrokers.find((b) => b.id == contact.brokerOrCedentId);
        if (broker) {
          this.createContactData.brokerOrCedentId = broker;
        }
      } else if (contact.type === 2 || contact.type === "2") {
        const cedent = this.availableCedents.find((c) => c.id == contact.brokerOrCedentId);
        if (cedent) {
          this.createContactData.brokerOrCedentId = cedent;
        }
      }

      this.createContactData.type = contact.type.toString();

      if (this.createContactData.active === undefined) {
        this.createContactData.active = true;
      }
    },
    async submitForm() {
      this.$v.createContactData.$touch();
      const errorExists = this.$v.createContactData.$invalid;
      if (errorExists) this.userPanel = 0;
      if (errorExists) return;

      const {
        name: { $model: name },
      } = this.$v.createContactData;
      const {
        email: { $model: email },
      } = this.$v.createContactData;
      const {
        phone: { $model: phone },
      } = this.$v.createContactData;
      const {
        address: { $model: address },
      } = this.$v.createContactData;
      const {
        type: { $model: type },
      } = this.$v.createContactData;
      const {
        brokerOrCedentId: { $model: brokerOrCedentId },
      } = this.$v.createContactData;

      this.loading = true;
      const contactInfo = {
        id: parseInt(this.contactId) !== 0 ? parseInt(this.contactId) : undefined,
        name,
        email,
        phone,
        address,
        type,
        brokerOrCedentId: brokerOrCedentId.id ? brokerOrCedentId.id.toString() : brokerOrCedentId.toString(),
      };

      // Usar la action existente
      await this.createContact(contactInfo);
      this.loading = false;
      this.createContactData = {};
      this.$v.createContactData.$reset();
      this.$router.push({ name: "list-contacts" });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";
</style>
