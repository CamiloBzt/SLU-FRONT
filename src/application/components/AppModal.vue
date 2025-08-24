<template>
  <div v-if="open" class="app-modal">
    <div class="modal">
      <div class="modal__title">Confirm bound complete</div>
      <div class="modal__close-btn">
        <v-btn @click="emitCloseModal" icon depressed>
          <img src="@/assets/img/icons/close.png" />
        </v-btn>
      </div>
      <div class="modal__divider modal__divider--margin-top" />
      <div class="modal__form">
        <!-- Title -->
        <h2 class="modal-title">
          This account will change his status for bound complete. <br />
          Are you shure this action?
        </h2>
        <!-- Finish button -->
        <div class="finish-button">
          <v-btn rounded depressed @click="emitConfirmation"> Confirm </v-btn>
          <v-btn class="v-btn--outlined" rounded depressed @click="emitCloseModal"> Cancel </v-btn>
        </div>
      </div>
    </div>
    <div class="modal-background" @click="emitCloseModal" />
  </div>
</template>
<script>
export default {
  name: "AppModal",
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    emitCloseModal() {
      this.$emit("close-modal");
    },
    emitConfirmation() {
      this.$emit("confirmation-modal");
    },
  },
};
</script>
<style lang="less" scoped>
.app-modal {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  position: fixed;
  left: 0;
  top: 0;
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
    height: auto;
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
      width: 100%;
      height: auto;
      margin-top: 15px;
      border-radius: 16px;
      .modal-title {
        font-size: 16px;
        width: 100%;
        margin: 0;
        padding: 0;
        font-weight: 500;
      }
      .finish-button {
        margin-top: 15px;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        .v-btn {
          border-radius: 5px;
          width: 213px;
          height: 40px !important;
          font-weight: 400;
          letter-spacing: normal;
          background: #003d6d !important;
          color: white !important;
        }
        .v-btn--outlined {
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
