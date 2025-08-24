<template>
  <div class="accounts-and-instalments-modal" v-if="open">
    <div class="modal">
      <div class="modal__title">Accounts and installments</div>
      <div class="modal__close-btn">
        <v-btn @click="emitCloseModal" icon depressed>
          <img src="@/assets/img/icons/close.png" />
        </v-btn>
      </div>
      <div class="modal__divider modal__divider--margin-top" />
      <div class="modal__form">
        <!-- Ref number -->
        <div class="form-title"><b class="form-title--bold">Ref number:</b> {{ reference }}</div>
        <div class="modal__divider modal__divider--margin-top" />
        <!-- Comments -->
        <div class="form-subtitle">Comments available in</div>
        <div class="comments-avalible">
          <div class="comments-avalible__input-container" v-for="(data, index) in roles" :key="index" v-show="!hideAllRoles">{{ data.role }} <v-checkbox v-model="data.active" @change="addRole(data)" /></div>
        </div>
        <div v-if="errorMessageCheckBox !== ''" class="form-text-area-error-message">
          {{ errorMessageCheckBox }}
        </div>

        <div class="comments-avalible">
          <div class="comments-avalible__input-container">All Roles <v-checkbox v-model="allRoles" @change="addAllRoles($event)" /></div>
          <div class="comments-avalible__input-container" />
        </div>

        <!-- Add comments -->
        <div class="form-subtitle">Add comments:</div>
        <textarea class="form-text-area" v-model="text" required @input="updateStatusError"> </textarea>
        <div v-if="errorMessageTextArea !== ''" class="form-text-area-error-message">
          {{ errorMessageTextArea }}
        </div>

        <!-- Finish button -->
        <div class="finish-button">
          <v-btn rounded depressed @click="sendComment"> Send </v-btn>
        </div>
      </div>
    </div>
    <div class="modal-background" @click="emitCloseModal" />
  </div>
</template>
<script>
/**Validaciones */
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { OnlyText } from "@/constants/validations";

/**services */
import RoleService from "@/modules/home/services/role.service";
import WalletService from "../services/wallet.service";

export default {
  mixins: [validationMixin],
  name: "AccountsAndInstallmentsModal",
  data: () => {
    return {
      text: null,
      roles: [],
      allRoles: false,
      rolesIdsAccepted: [],
      hideAllRoles: false,
      errorMessageTextArea: "",
      errorMessageCheckBox: "",
    };
  },
  async beforeMount() {
    this.roles = await RoleService.getAllRoles();
    this.roles = this.roles.map((role) => ({ ...role, active: false }));
  },
  validations: {
    text: { required, OnlyText },
  },
  props: {
    reference: String,
    wallet: Number,
    open: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    emitCloseModal() {
      this.$emit("closeModal");
    },
    async sendComment() {
      //validamos que el comentario tenga texto
      if (this.text === "" || this.text === null) {
        this.errorMessageTextArea = "Message is required";
      }
      if (parseInt(this.rolesIdsAccepted.length) === 0 && !this.allRoles) {
        this.errorMessageCheckBox = "Role is required";
      }

      //guardamos el comentario
      await WalletService.createWalletComment(this.wallet, {
        text: this.text,
        all: this.allRoles,
        roles: this.rolesIdsAccepted,
      });

      this.$emit("showSuccessModal");
    },
    addRole(data) {
      this.updateCheckBoxStatusError();
      if (data.active) {
        this.rolesIdsAccepted.push(Number(data.id));
        return;
      }
      const tempIds = this.rolesIdsAccepted;
      this.rolesIdsAccepted = tempIds.filter((id) => {
        return id !== Number(data.id);
      });
    },
    updateStatusError() {
      this.errorMessageTextArea = "";
    },
    updateCheckBoxStatusError() {
      this.errorMessageCheckBox = "";
    },
    addAllRoles(value) {
      this.errorMessageCheckBox = "";
      value ? (this.hideAllRoles = true) : (this.hideAllRoles = false);
    },
  },
};
</script>
<style lang="less" scoped>
.accounts-and-instalments-modal {
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 6000;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal-background {
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.7;
    position: absolute;
    z-index: 0;
  }
  .modal {
    width: 613px;
    height: 559px;
    background: white;
    border-radius: 5px;
    padding: 20px 32px;
    position: absolute;
    z-index: 1;
    &__close-btn {
      width: 30px;
      height: 30px;
      position: absolute;
      right: -10px;
      top: -10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__title {
      font-weight: 600;
      font-size: 26px;
    }
    &__divider {
      width: 100%;
      height: 1px;
      background: #a8bfd9;
      &--margin-top {
        margin-top: 10px;
      }
    }
    &__form {
      overflow: scroll;
      width: 100%;
      height: 440px;
      border: solid 1px #a8bfd9;
      margin-top: 15px;
      border-radius: 16px;
      padding: 10px 20px;
      .form-text-area-error-message {
        width: 100%;
        height: 5px;
        color: red;
        margin-bottom: 35px;
      }
      .form-title {
        color: #547fa9;
        &--bold {
          color: inherit;
        }
      }
      .form-subtitle {
        font-weight: 800;
        font-size: 16px;
        margin-top: 15px;
      }
      .comments-avalible {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        align-content: flex-start;
        padding: 0px 80px;
        flex-wrap: wrap;
        margin-top: 10px;
        &__input-container {
          width: 45%;
          height: 50px;
          font-weight: 400;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
      .form-text-area {
        width: 100%;
        height: 120px;
        margin-top: 15px;
        background: #edf2f8;
        border-radius: 5px;
        padding: 8px 20px;
        resize: none;
        &:focus {
          outline: none;
        }
      }
      .finish-button {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        .v-btn {
          border-radius: 5px;
          width: 213px;
          height: 40px !important;
          font-weight: 400;
          letter-spacing: normal;
          color: #003d6d !important;
          background: transparent !important;
          border: solid 1px !important;
        }
      }
    }
  }
}
</style>
