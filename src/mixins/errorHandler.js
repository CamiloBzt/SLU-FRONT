import { mapGetters, mapMutations } from 'vuex'
import messages from '../constants/messages'

export const errorHandler = {
  computed: {
    ...mapGetters(['errors'])
  },
  methods: {
    ...mapMutations(['addNotification'])
  },
  watch: {
    errors() {
      // message config here
      if (this.errors) {
        if (Array.isArray(this.errors)) {
          this.errors.forEach(err => {
            this.addNotification({
              type: messages.DANGER,
              text: err
            })
          });
        } else {
          this.addNotification({
            type: messages.DANGER,
            text: this.errors
          })
        }
      }
    }
  },
}