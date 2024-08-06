<template>
  <div>
    <h5>CCO Participants</h5>
    <div class="OptionsCont">
      <v-combobox
        v-model.trim="$v.ccoValue.$model"
        @change="$v.ccoValue.$touch()"
        @input="$v.ccoValue.$touch()"
        @blur="$v.ccoValue.$touch()"
        :search-input.sync="dato"
        @update:search-input="inputText"
        solo
        flat
        label="Choose CCO participants"
        color="white"
        multiple
        chips
        deletable-chips
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
import { formValidations } from '@/mixins/formValidations';
/* vuelidate mixin & validators */
import { validationMixin } from 'vuelidate';
import { helpers, email, requiredIf } from 'vuelidate/lib/validators';

const isOptional = (value) => !helpers.req(value) || value.indexOf('cool') >= 0;

export default {
  name: 'participants',
  mixins: [validationMixin, formValidations],
  data() {
    return {
      dato: '',
    };
  },
  props: {
    ccoParticipants: {
      type: Array,
    },
  },
  methods: {
    inputText(event) {
      this.dato = event;
    },
    keydown(event) {
      if (event.key === 'Enter' || event.key == 'Tab') {
        const value = this.$v.dato;
        if (value.$invalid || value.$error) return;
        this.ccoParticipants.push(value.$model);
      }
    },
  },
  validations: {
    ccoValue: {
      isOptional,
    },
    dato: {
      required: requiredIf(function () {
        return false;
      }),
      email,
    },
  },
};
</script>

<style lang="less" scoped>
h5 {
  font-weight: normal;
  font-size: 15px;
  color: #547fa9;
  margin-top: 15px;
  @media (max-width: 650px) {
    font-size: 14px;
  }
}

.OptionsCont {
  width: 100%;
  height: 50px;
}
</style>