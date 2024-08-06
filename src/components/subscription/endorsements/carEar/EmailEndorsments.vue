<template>
  <transition name="fade">
    <div v-if="showModal" class="modal" @click.self="CloseModal()">
      <div class="modalSn">
        <!--CERRAR MODAL-->
        <div
          @click="CloseModal()"
          class="CloseModalCont d-flex justify-center align-center"
        >
          <v-icon> mdi-close-circle </v-icon>
        </div>
        <div class="emailContainer">
          <div class="emailLang">
            <h2>Email</h2>
            <div class="selectEmail">
              <v-select
                color="#547FA9"
                solo
                flat
                :items="lang"
                :disabled="loadingLanguages"
                item-value="lang"
                item-text="description"
                v-model="currentLang"
                label="English"
              ></v-select>
            </div>
          </div>
          <div class="emailCont pl-3 pr-3 pt-2 pb-1">
            <EmailHeader
              :header="headerEmail"
              :account="nameReference"
              :reference="nameReference"
            />
            <CcParticipantsQuotation ref="ccClose" :ccParticipants="ccParticipants" v-model="ccParticipants" />
            <CcoParticipantsQuotation
              ref="ccoClose"
              :ccoParticipants="ccoParticipants"
              v-model="ccoParticipants"
            />
            <div class="ExpansionLineTop mt-4"></div>
            <!--EDITOR DE TEXTO DEL EMAIL-->
            <EmailEditor ref="emailEditor" :htmlEmail="htmlTemplate"  v-model="htmlTemp"/>
          </div>
          <div class="sendCont">
            <v-btn
              rounded
              depressed
              color="#003D6D"
              class="button"
              @click="closeAccountAndSendEmail()"
            >
              Send
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";

import EmailEditor from "@/components/Email/EmailEditor.vue";
import CcParticipantsQuotation from "@/components/Email/CCParticipantsQuotation.vue";
import CcoParticipantsQuotation from "@/components/Email/CCoParticipantsQuotation.vue";
import EmailHeader from "@/components/Email/EmailHeader.vue";

/* mixins */
import { stateExpansiveManager } from "@/mixins/subscription.js";

export default {
  name: "EmailModalWithQuotation",
  mixins: [stateExpansiveManager],
  components: {
    EmailEditor,
    CcParticipantsQuotation,
    CcoParticipantsQuotation,
    EmailHeader,
  },
  props: {
    /* header */
    headerEmail: {
      type: String,
    },
    item: {
      type: Number | String,
    }
  },
  data() {
    return {
      /* Datos que se envían a las partes que conforman el componente para redactar correos */
      loadingLanguages: false,
      //CcParticipants
      ccParticipants: [
      ],
      htmlTemp: '',
      ccValue: null, //cc que elige el usuario

      //CCO Participants
      ccoParticipants: [
      ],
      ccoValue: null, //cco que elige el usuario,
      showModal: false,
    };
  },
  async mounted() {
    /* set loadings (data) */
    const lla = "loadingLanguages";
    /* loaders to true */
    this[lla] = !this[lla];

    await this.getCatalogByName({ name: "lang" });
    await this.getCurrentTemplateLanguage();

    this[lla] = false;
  },
  computed: {
    ...mapGetters([
      "nameReference",
      "currentEmailTemplate",
      "close_account",
      "currentTemplateRiskID",
      "subscription_id",
      "selectedLang",
      "lang",
    ]),
    ...mapState({
      htmlTemplate: state => state.htmlTemplate,
      selectedLang: state => state.selectedLang,
      template: state => state.currentEmailTemplate
    }),
    /* html template */
    currentLang: {
      get() {
        return this.selectedLang;
      },
      async set(value) {
        this.SET_SELECTED_TEMPLATE_LANG(value)
        this.SET_LANG_MAIL_TEMPLATE(value)
        await this.setTemplateLang(this.item);
      },
    },
  },
  methods: {
    ...mapActions([
      "setEmailTemplate",
      "getEmailTemplate",
      "sendEmailAction",
      "getCatalogByName",
      "setCurrentTemplateLanguage",
      "getCurrentTemplateLanguage",
      "resetTemplateLang",
      "sendEmail",
      "getTemplateEmail"
    ]),
    ...mapMutations(['SET_LANG_MAIL_TEMPLATE', 'SET_SELECTED_TEMPLATE_LANG']),
    async send() {
      this.sendEmail();
    },
    /* EL METODO updateData OBTIENE  LOS DATOS DE LOS SUB COMPONENTES CUANDO EL USUARIO VA MODIFICANDO LA INFORMACIÓN */
    updateData(event) {
      const eventType = event.type;
      const eventContent = event.name;
      switch (eventType) {
        // CC SELECCIONADOS
        case "ccValue":
          this.ccValue = eventContent;
          break;

        // CCO SELECCIONADOS
        case "ccoValue":
          this.ccoValue = eventContent;
          break;
      }
    },
    async setTemplateLang(id) {
      await this.getTemplateEmail(id);
      if (!this.$refs.emailEditor) return;
      this.$refs.emailEditor.editor.commands.setContent(
        this.currentEmailTemplate,
        true
      );
    },
    async closeAccountAndSendEmail() {
      console.log(this.ccoParticipants);
      console.log(this.ccParticipants);
      const cc = Array.isArray(this.ccParticipants)
        ? this.ccParticipants
        : this.ccoParticipants.split(",");
      const cco = Array.isArray(this.ccoParticipants)
        ? this.ccoParticipants
        : this.ccParticipants.split(",");
      const emailData = {
        subject: `Reference Number:${this.nameReference}`,
        body: this.template,
        cc,
        cco
      };

      await this.sendEmailAction({ emailData });
      this.CloseModal();
    },
    async CloseModal() {
      this.showModal = false;
      this.ccValue = null;
      this.ccoValue = null;
    },
  },
};
</script>

<style lang="less" scoped>
//CONTENEDOR DE QUOTATION
.modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3000;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;

  .modalSn {
    width: 650px;
    height: 95%;
    background: white;
    border-radius: 15px;
    position: relative;
    //CERRAR MODAL
    .CloseModalCont {
      width: 25px;
      height: 24px;
      position: absolute;
      right: -10px;
      top: -10px;
      z-index: 1000;
      border-radius: 25px;
      background: white;
      cursor: pointer;
      i {
        color: #f59607;
        font-size: 30px;
      }
    }
    .emailContainer {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: space-between;
      flex-wrap: wrap;
      overflow: auto;
      padding-left: 25px;
      padding-right: 25px;
      padding-top: 10px;
      padding-bottom: 10px;

      .emailLang {
        width: 100%;
        height: 45px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0px;
        border-bottom: solid 1px #a8bfd9;
        h2 {
          font-size: 18px;
        }

        .selectEmail {
          width: 150px;
          height: 100%;
          overflow: hidden;
        }
      }

      .sendCont {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 15px;

        .button {
          color: white;
          width: 200px;
          text-transform: none;
          font-weight: normal;
        }
      }
      .emailCont {
        width: 100%;
        height: auto;
        border-radius: 15px;
        overflow: auto;
        position: relative;
        margin-top: 15px;
        border: solid 1px #cbdbeb;
      }
    }
  }
}

/* animación */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
