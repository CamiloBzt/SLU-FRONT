<template>
  <v-expansion-panels class="ExpansionBordered mt-6 ExpansionComponent">
    <v-expansion-panel>
      <!--TITULO DEL ACORDEON-->
      <v-expansion-panel-header @click="changeStateExpansive()" class="ExpansionTitle" expand-icon="">
        E-mail
        <div class="ExpansionState HideOnMovil">
          {{ stateExpansiveMessage }}
        </div>
        <template v-slot:actions>
          <v-icon class="iconExpand">
            {{ iconExpansive }}
          </v-icon>
        </template>
      </v-expansion-panel-header>
      <!--CUERPO-->
      <v-expansion-panel-content>
        <div class="ExpandContent d-flex justify-center">
          <div class="ExpandEmailCont pa-5">
            <div class="emailContainer">
              <div class="emailCont">
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
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EmailEditor from "@/components/Email/EmailEditor.vue";
import CcParticipants from "@/components/Email/CcParticipants.vue";
import CcoParticipants from "@/components/Email/CcoParticipants.vue";
import EmailHeader from "@/components/Email/EmailHeader.vue";
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
@import "~@/assets/style/AccordionStyle.less";
.ExpandEmailCont {
  width: 65%;
  height: auto;
  .emailContainer {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: space-between;
    flex-wrap: wrap;
    overflow: auto;

    .emailLang {
      width: 100%;
      height: 45px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0px;
      border-bottom: solid 1px #a8bfd9;
      background: red;
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
      padding: 20px;
    }
  }
}
</style>
