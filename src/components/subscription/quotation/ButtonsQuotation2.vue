<template>
  <div class="ButtonsCont d-flex flex-column align-end">
    <div class="dropCont mt-3">
      <v-menu left z-index="3000" :offset-x="offset">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            rounded
            large
            depressed
            outlined
            class="btn"
            color="#003D6D"
          >
            <v-icon class="mr-2"> mdi-chevron-down </v-icon>
            Define Authorized
          </v-btn>
        </template>

        <div class="ListFh">
          <v-list class="listContent">
            <div class="pl-5 pr-5">
              <div
                @click="defineQuotation(item, item.id)"
                v-for="(item, index) in items"
                :key="index"
                class="button d-flex justify-start align-center"
              >
                {{ item.description }}
              </div>

              <!-- <div
                @click="
                  defineQuotation(
                    'Send proportional  and non-proportional quotation without slip'
                  )
                "
                class="buttoNoBorder d-flex justify-start align-center"
              >
                Send proportional and non-proportional quotation without slip
              </div> -->
            </div>

            <div class="declineOffer">
              <div
                class="
                  buttoNoBorder
                  d-flex
                  justify-start
                  align-center
                  pl-5
                  pr-5
                "
              >
                Ask for more information
              </div>
            </div>
          </v-list>
        </div>
      </v-menu>
    </div>

    <v-btn
      rounded
      large
      color="#003D6D"
      depressed
      class="btn btn--bound mt-3"
      @click="$emit('sendToBound')"
      :loading="loadBtn"
    >
      Send to Bound
    </v-btn>
    <EmailModal
      ref="emailModal"
      :headerEmail="reason"
      :item="item"
    />
  </div>
</template>
<script>
import EmailModal from '@/components/Email/EmailModalWithQuotation.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  beforeMount() {
    Promise.all([
      this.getTemplateEmail(),
      this.getContactsBySubscriptionId({ subscriptionId: this.$route.params.subscriptionId })
    ]).finally(() => {
      this.loading = false;
    })
  },
  components: {
    EmailModal
  },
  data: () => ({
    reason: '',
    loading: false,
    offset: true,
    loadBtn: false,
    item: '',
  }),
  computed: {
    ...mapState({
      items: state => state.emailTemplatesQuotation, 
    })
  },
  methods: {
    ...mapActions(['getTemplateEmail', 'getContactsBySubscriptionId']),
    ...mapMutations(['SET_MAIL_TEMPLATE']),
    /*
				El metodo defineQuotation devuelve el tipo de quotation elegido
    	*/
    defineQuotation(event, id) {
      //alert(event)
      this.reason = event.description;
      this.item = id
      this.SET_MAIL_TEMPLATE(event)
      this.$refs.emailModal.showModal = true
    },
  },
};
</script>
<style lang="less" scoped>
.ButtonsCont {
  width: 100%;
  height: auto;
  margin-top: 10px;
}
.ListFh {
  overflow: hidden !important;
  .listContent {
    width: 400px;
    height: 320px !important;
    overflow: auto;

    //BOTONES
    .button {
      color: #003d6d;
      border-bottom: solid 1px;
      text-transform: capitalize;
      cursor: pointer;
      min-height: 60px;
    }
    .buttoNoBorder {
      color: #003d6d;
      cursor: pointer;
      height: 60px;
      text-transform: capitalize;
    }
    .declineOffer {
      width: 100%;
      height: 150px;

      .declineTitle {
        width: 100%;
        height: 50px;
        background: #edf2f8;
        color: #003d6d;
      }
      .declineButton {
        width: 80%;
        margin-left: 10%;
        height: 45px;
        color: #003d6d;
        border-bottom: solid 1px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
      }
    }
  }
}

.btn {
  width: 200px;
  color: white;
  text-transform: none;
  font-weight: 500;
  height: 40px !important;
  font-size: 15px;
  letter-spacing: normal !important;
}
.btn--bound {
  width: 200px !important;
  color: white !important;
  text-transform: none !important;
  font-weight: 500 !important;
  height: 40px !important;
  font-size: 15px !important;
  letter-spacing: normal !important;
}

.v-menu__content {
  position: fixed !important;
}
@media (max-width: 640px) {
  .ListFh {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto !important;

    .listContent {
      width: 90%;
      border-radius: 15px;
    }
  }
  /*
  MODIFICA REGLAS DE VUETIFY
  */
  .v-menu__content {
    max-width: 100% !important;
    left: 0 !important;
    top: 0 !important;
  }
}
</style>