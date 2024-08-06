export const validationForm = {
  data() {
    return {
			textRules: [
        v => !!v || 'This field is required',
      ],
			emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ]
    }
  }
}