<template>
  <div>
    <h5>CC Participants</h5>
    <div class="OptionsCont">
      <v-combobox
        v-model.trim="$v.ccValue.$model"
        @change="$v.ccValue.$touch()"
        @input="$v.ccValue.$touch()"
        @blur="$v.ccValue.$touch()"
        :search-input.sync="dato"
        @update:search-input="inputText"
        solo
        flat
        label="Choose CC participants"
        color="white"
        multiple
        chips
        deletable-chips
        :items="contacts"
        item-text="email"
        item-value="email"
      >
        <template slot="no-data">
          <v-container>
            <v-row>
              <v-col cols="12">
                Press <code class="font-weight-bold">Enter</code> or
                <code class="font-weight-bold">Tab</code> to add new item.
              </v-col>
            </v-row>
          </v-container>
        </template>
      </v-combobox>
    </div>
  </div>
</template>

<script>
import { formValidations } from "@/mixins/formValidations";
/* vuelidate mixin & validators */
import { validationMixin } from "vuelidate";
import { helpers, email, requiredIf } from "vuelidate/lib/validators";

/**vuex */
import { mapActions } from "vuex";

/*Servicios */
import mailTemplatesServices from "@/application/services/mailTemplates.service";

const isOptional = (value) => !helpers.req(value) || value.indexOf("cool") >= 0;

export default {
  name: "participants",
  mixins: [validationMixin, formValidations],
  data() {
    return {
      subscriptionId: null,
      dato: "",
      contacts: [],
    };
  },
  props: {
    ccParticipants: {
      type: Array,
    },
  },
  methods: {
    ...mapActions(["getContactsBySubscriptionId"]),
  },
  methods: {
    inputText(event) {
      this.dato = event;
    },
    keydown(event) {
      if (event.key === "Enter" || event.key == "Tab") {
        const value = this.$v.dato;
        if (value.$invalid || value.$error) return;
        this.ccParticipants.push(value.$model);
      }
    },
  },
  validations: {
    ccValue: {
      isOptional,
    },
    dato: {
      required: requiredIf(function () {
        return false;
      }),
      email,
    },
  },
  async beforeMount() {
    this.subscriptionId = this.$route.params.subscriptionId;
    this.contacts = await mailTemplatesServices.getContactsBySubscription(
      this.subscriptionId
    );
  },
};
</script>

<style lang="less" scoped>
h5 {
  font-weight: normal !important;
  font-size: 15px !important;
  color: #547fa9;
  margin-top: 15px;
}
.OptionsCont {
  width: 100%;
  height: 45px;
}

@media (max-width: 640px) {
  h5 {
    font-size: 14px;
  }
}
</style>
