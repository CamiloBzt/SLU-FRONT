<template>
  <div>
    <h5>CC Participants</h5>
    <div class="OptionsCont">
      <v-combobox v-model="select" :search-input.sync="dato" @update:search-input="inputText" ref="autoComplete" solo flat label="Choose CC participants" color="white" multiple chips deletable-chips>
        <template slot="no-data">
          <v-container>
            <v-row>
              <v-col cols="12"> Press <code class="font-weight-bold">Enter</code> or <code class="font-weight-bold">Tab</code> to add new item. </v-col>
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
import { helpers } from "vuelidate/lib/validators";

const isOptional = (value) => !helpers.req(value) || value.indexOf("cool") >= 0;

export default {
  name: "ccParticipantsQuotation",
  mixins: [validationMixin, formValidations],
  data() {
    return {
      select: this.ccParticipants,
      dato: "",
    };
  },
  props: {
    ccParticipants: {
      type: Array,
      default: [],
    },
  },
  validations: {
    ccValue: {
      isOptional,
    },
  },
  watch: {
    select(newValue) {
      this.$emit("input", newValue);
    },
    value(newValue) {
      this.ccParticipants = value;
    },
  },
  methods: {
    inputText(event) {
      this.dato = event;
    },
    keydown(event) {
      if (event.key === "Enter" || event.key == "Tab") {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(String(this.dato).toLowerCase())) return false;
        this.ccParticipants.push(this.dato);
      }
    },
    clickauto() {
      this.dato = "";
      this.$refs.autoComplete.search = "";
    },
    selectedSearchedCandidate(event) {
      //console.log(event);
    },
  },
};
</script>

<style lang="less" scoped>
h5 {
  font-weight: normal;
  font-size: 15px;
  color: #547fa9;
}

.OptionsCont {
  width: 100%;
  height: 50px;
}

@media (max-width: 640px) {
  h5 {
    font-size: 14px;
  }
}
</style>
