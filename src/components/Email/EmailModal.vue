<template>
  <transition name="fade">
    <div v-if="showModal" class="modal" @click.self="CloseModal()">
      <div class="modalSn">
        <!--CERRAR MODAL-->
        <div @click="CloseModal()" class="CloseModalCont d-flex justify-center align-center">
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
            <EmailHeader :header="headerEmail" :account="nameReference" :reference="nameReference" />
            <CcParticipants ref="ccClose" :ccParticipants="ccParticipants" />
            <CcoParticipants ref="ccoClose" :ccoParticipants="ccoParticipants" />
            <div class="ExpansionLineTop mt-4"></div>
            <!--EDITOR DE TEXTO DEL EMAIL-->
            <EmailEditor ref="emailEditor" :htmlEmail="htmlEmail" />
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
import { mapActions, mapGetters } from "vuex";
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
    /* header */
    headerEmail: {
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

      //CCO Participants
      ccoParticipants: [],
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
    ...mapGetters(["nameReference", "currentEmailTemplate", "close_account", "currentTemplateRiskID", "subscription_id", "selectedLang", "lang"]),
    /* html template */
    htmlEmail: {
      get() {
        return this.currentEmailTemplate;
      },
    },
    currentLang: {
      get() {
        return this.selectedLang;
      },
      async set(value) {
        const langId = Array.from(this.lang).find((v) => v.lang === value);
        await this.setCurrentTemplateLanguage({
          langId: langId.id,
          id: this.subscription_id,
        });
        await this.setTemplateLang();
      },
    },
  },
  methods: {
    ...mapActions(["setEmailTemplate", "getEmailTemplate", "sendEmailAction", "getCatalogByName", "setCurrentTemplateLanguage", "getCurrentTemplateLanguage", "resetTemplateLang"]),
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
    async setTemplateLang() {
      await this.getEmailTemplate({
        id: this.currentTemplateRiskID,
        lang: this.selectedLang,
      });
      if (!this.$refs.emailEditor) return;
      this.$refs.emailEditor.editor.commands.setContent(this.currentEmailTemplate, true);
    },
    async closeAccountAndSendEmail() {
      const ccClose = this.$refs.ccClose;
      const ccoClose = this.$refs.ccoClose;
      const attachRef = this.$refs.emailEditor;

      /* touch models */
      ccClose.$v.ccValue.$touch();
      ccoClose.$v.ccoValue.$touch();

      const cc = Array.isArray(ccClose.$v.ccValue.$model) ? Array.from(ccClose.$v.ccValue.$model) : null;
      const cco = Array.isArray(ccoClose.$v.ccoValue.$model) ? Array.from(ccoClose.$v.ccoValue.$model) : null;

      const emailData = {
        subject: `Reference Number: ${this.nameReference}`,
        body: this.currentEmailTemplate,
        cc,
        cco,
        closeAccount: true,
        attachedFiles: attachRef.filesUpload.map(({ currentName }) => currentName).join(","),
      };

      await this.sendEmailAction({ emailData });
      await this.CloseModal();
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
