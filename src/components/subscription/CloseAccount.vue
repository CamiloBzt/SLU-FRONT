<template>
  <div>
    <div class="closeCont d-flex justify-center align-center">
      <v-menu z-index="3000" :offset-x="offset">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="activateButton" rounded text v-bind="attrs" v-on="on" large :loading="loading" v-if="!(close_account.length === 0 || !subscription_id)">
            <div class="ButtonText">Close Account</div>
            <v-icon> mdi-close-circle </v-icon>
          </v-btn>
        </template>

        <v-list class="pl-5 pr-5">
          <div class="headerClose d-flex justify-start align-center">Reason to close account</div>
          <div @click="CloseAccount(item)" class="button" v-for="(item, index) in close_account" :key="index">
            <v-list-item-title>
              {{ item.description }}
            </v-list-item-title>
          </div>
        </v-list>
      </v-menu>
    </div>

    <!--
      MODAL PARA REDACTAR UN CORREO AL CERRAR LA CUENTA
    -->
    <EmailModal ref="emailModal" :headerEmail="reason" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EmailModal from "@/components/Email/EmailModal.vue";

export default {
  components: {
    EmailModal,
  },
  data() {
    return {
      offset: true,
      /* loaders */
      loading: false,
      /* modal reason title */
      reason: "",
    };
  },
  mounted() {
    /* store load for later */
    const lca = "loading";
    this[lca] = !this[lca];
    this.getCatalogByName({ name: "close_account" }).finally(() => {
      this[lca] = false;
    });
  },
  computed: {
    ...mapGetters(["close_account", "subscription_id", "currentTemplateRiskID", "selectedLang"]),
  },
  methods: {
    ...mapActions(["getCatalogByName", "getEmailTemplate", "setEmailRiskID"]),
    async CloseAccount(itemList) {
      try {
        this.reason = `Close account<br>${itemList.description}`;
        await this.setEmailRiskID({ id: itemList.id });
        await this.getEmailTemplate({
          id: itemList.id,
          lang: this.selectedLang,
        });
        this.$refs.emailModal.showModal = true;
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
<style lang="less" scoped>
//CERRAR CUENTA
.closeCont {
  width: auto;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;

  .activateButton {
    font-weight: normal !important;
    font-size: 16px;
    font-weight: 400 !important;
    letter-spacing: normal !important;
    text-transform: none !important;
    color: var(--lightColor);
    .ButtonText {
      color: inherit !important;
    }
    i {
      color: var(--secondaryColor) !important;
      margin-left: 15px;
    }
  }

  @media (max-width: 650px) {
    overflow: hidden;
    width: 35px;
    height: 35px;
    top: 22.5px;
    border-radius: 40px;
    .activateButton {
      height: 35px;
      .ButtonText {
        display: none !important;
      }
      i {
        margin-left: 0px;
        font-size: 37px !important;
      }
    }
  }
}

.flexClass {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.headerClose {
  width: 100%;
  height: 40px;
  margin-bottom: 15px;
  font-weight: 500;
  color: var(--mainColor2);
  border-bottom: solid 1px var(--secondaryColor);
  .flexClass();
}

.button {
  width: 100%;
  height: 40px;
  cursor: pointer;
  * {
    color: var(--lightColor) !important;
  }
  .flexClass();
}
</style>
