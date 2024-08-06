export const formValidations = {
  methods: {
    validEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email) || 'Invalid e-mail';
    },
    requiredInput(value) {
      return !!value || 'Required.';
    },
    requiredInputVuelidateParent(prop, parent) {
      const errors = [];
      if (!this.$v[parent][prop].$dirty) return errors;
      !this.$v[parent][prop].required && errors.push('Required.');
      this.$v[parent][prop].$error && errors.push('Invalid data.');
      return errors;
    },
    requiredNestedInputParent(prop, parent, index) {
      const errors = [];
      if (!this.$v[parent]['$each'][index][prop].$dirty) return errors;
      !this.$v[parent]['$each'][index][prop].required &&
        errors.push('Required.');
      return errors;
    },
    requiredNestedEmailVuelidateParent(prop, parent, index) {
      const errors = [];
      if (!this.$v[parent]['$each'][index][prop].$dirty) return errors;
      (!this.$v[parent]['$each'][index][prop].required ||
        !this.$v[parent]['$each'][index][prop].email) &&
        errors.push('Valid email required.');
      return errors;
    },
    requiredEmailVuelidateParent(prop, parent) {
      const errors = [];
      if (!this.$v[parent][prop].$dirty) return errors;
      (!this.$v[parent][prop].required || !this.$v[parent][prop].email) &&
        errors.push('Valid email required.');
      return errors;
    },
    requiredInputVuelidate(prop) {
      const errors = [];
      if (!this.$v[prop].$dirty) return errors;
      !this.$v[prop].required && errors.push('Required.');
      return errors;
    },
    requiredToBeDefined(prop) {
      const errors = [];
      if (!this.$v.toBeDefined[prop].$dirty) return errors;
      !this.$v.toBeDefined[prop].required && errors.push('Required.');
      this.$v.toBeDefined[prop].$error && errors.push('Not A Number');
      return errors;
    },
    requiredQuotation(prop) {
      const errors = [];
      if (!this.$v.quotation[prop].$dirty) return errors;
      !this.$v.quotation[prop].required && errors.push('Required.');
      (this.$v.quotation[prop].$error || this.$v.quotation[prop].$invalid) &&
        errors.push('Input a valid number.');
      return errors;
    },
    quotationValids(parent, child) {
      const errors = [];
      if (!this.$v[parent][child].$dirty) return errors;
      !this.$v[parent][child].required && errors.push('Required.');
      !this.$v[parent][child].DigitsAndDecimals &&
        typeof this.$v[parent][child].DigitsAndDecimals !== 'undefined' &&
        errors.push('Input valid digits.');
      !this.$v[parent][child].Percentage &&
        typeof this.$v[parent][child].Percentage !== 'undefined' &&
        errors.push('Input a number between 0 and 100.');
      (this.$v[parent][child].$error || this.$v[parent][child].$invalid) &&
        errors.push('Invalid data.');
      return errors;
    },
    focusFirstStatus(component = this) {
      console.log(component, component.status);
      if (component.status) {
        component.$el.focus();
        return true;
      }

      const focused = [false];

      component.$children.some(childComponent => {
        focused[0] = this.focusFirstStatus(childComponent);
        return focused[0];
      });

      return focused[0];
    },
  },
};
