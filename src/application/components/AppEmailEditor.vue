<template>
  <transition name="fade">
    <div v-if="openEmailEditor" class="modal" @click.self="closeModal()">
      <div class="modalSn">
        <!--CERRAR MODAL-->
        <div @click="closeModal()" class="CloseModalCont d-flex justify-center align-center">
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
                label="English"
                v-model="currentLang"
                @blur="setTemplateLang(selectedLang)"
                @input="setTemplateLang(selectedLang)"
                @change="setTemplateLang(selectedLang)"
              ></v-select>
            </div>
          </div>
          <div class="emailCont pl-3 pr-3 pt-2 pb-1">
            <EmailHeader :header="headerEmail" :account="account" reference="nameReference" />
            <CcParticipants :ccParticipants="ccParticipants" />
            <CcoParticipants ref="ccoClose" :ccoParticipants="ccoParticipants" />
            <div class="ExpansionLineTop mt-4"></div>
            <!--EDITOR DE TEXTO DEL EMAIL-->
            <EmailEditor ref="emailEditor" :htmlEmail="htmlEmail" :fileUpload="fileUpload" />
          </div>
          <div class="sendCont">
            <v-btn rounded depressed color="#003D6D" class="button" @click="closeAccountAndSendEmail()"> Send </v-btn>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import EmailTemplateService from "../services/mailTemplates.service";
import StarterKit from "@tiptap/starter-kit";
import EmailEditor from "@/components/Email/EmailEditor.vue";
import CcParticipants from "@/components/Email/CcParticipants.vue";
import CcoParticipants from "@/components/Email/CcoParticipants.vue";
import EmailHeader from "@/components/Email/EmailHeader.vue";

/* mixins */
import { stateExpansiveManager } from "@/mixins/subscription.js";

export default {
  name: "EmailRichEditor",
  mixins: [stateExpansiveManager],
  components: {
    EmailEditor,
    CcParticipants,
    CcoParticipants,
    EmailHeader,
  },
  props: {
    openEmailEditor: {
      type: Boolean,
      required: true,
      default: false,
    },
    idTemplate: {
      type: Number,
      required: false,
    },
    headerEmail: {
      type: String,
    },
    account: {
      type: String,
    },
  },
  data() {
    return {
      /* Datos que se envían a las partes que conforman el componente para redactar correos */
      loadingLanguages: false,
      //CcParticipants
      ccParticipants: [],
      ccValue: null, //cc que elige el usuario
      template: {},
      //CCO Participants
      ccoParticipants: [],
      ccoValue: null, //cco que elige el usuario,
      showModal: false,
      htmlEmail: "",
      fileUpload: [],
      lang: ["Spanish", "English"],
    };
  },
  methods: {
    currentLang() {
      return "currentLang";
    },
    resetTemplateLang() {
      return "resetTemplateLang";
    },
    getCurrentTemplateLanguage() {
      return "getCurrentTemplateLanguage";
    },
    setCurrentTemplateLanguage() {
      return "setCurrentTemplateLanguage";
    },
    getCatalogByName() {
      return "getCatalogByName";
    },
    setEmailTemplate() {
      return "setEmailTemplate";
    },
    getEmailTemplate() {
      return "getEmailTemplate";
    },
    sendEmailAction() {
      return "sendEmailAction";
    },
    updateData() {
      return "updateData";
    },
    setTemplateLang() {
      return "setTemplateLang";
    },
    closeAccountAndSendEmail() {
      return "closeAccountAndSendEmail";
    },
    closeModal() {
      this.$emit("close-modal");
    },
  },
  watch: {
    // watch para automatizar el cambio del id y hace el request para traerlo de la bade de datos
    idTemplate: async function (id) {
      this.template = await EmailTemplateService.getEmailTemplateById(id);
      this.htmlEmail = this.template.html_template;
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
  z-index: 5000;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;

  .modalSn {
    width: 650px;
    height: 95%;
    background: white;
    border-radius: 5px;
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
        border-radius: 5px;
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

/**/
@media (min-width: 1724px) and (min-height: 1024px) {
  .modalSn {
    width: 900px !important;
    height: 900px !important;
  }
}
/**/
</style>
