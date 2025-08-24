<template>
  <div v-if="showConfirmationPrecaptureModal" class="Modal py-13 d-flex justify-center">
    <div class="Form px-6 confirmationModal">
      <!-- Close button -->
      <div class="CloseModalBtn">
        <v-btn class="closeBtn" icon @click="closeConfirmationPrecaptureModal">
          <img class="iconClose" src="@/assets/img/icons/close.png" />
        </v-btn>
      </div>

      <!-- Header -->
      <div class="Header">{{ title }}</div>

      <!-- Actions -->
      <v-row justify="space-around">
        <v-btn outlined rounded color="#003D6D" class="buttons" @click="closeConfirmationPrecaptureModal"> Cancel </v-btn>

        <v-btn rounded color="#003D6D" class="buttons white--text" @click="confirmAction"> Confirm </v-btn>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationPrecaptureModal",
  data() {
    return {
      response: false,
    };
  },
  props: {
    showConfirmationPrecaptureModal: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Do you want to continue?",
    },
  },
  methods: {
    closeConfirmationPrecaptureModal() {
      this.$emit("closeConfirmationPrecaptureModal");
    },
    confirmAction() {
      this.$emit("confirmAction");
    },
  },
};
</script>

<style lang="less">
.buttons {
  text-transform: none;
  width: 7rem;
}

.confirmationModal {
  width: auto !important;
  height: 128px !important;
}

.Modal {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000000;
  position: absolute;
  top: 0;
  left: 0;

  .Form {
    width: auto;
    height: 128px;
    background: white;
    border-radius: 10px;
    position: relative;

    .Header {
      width: 100%;
      height: 50px;
      border-bottom: solid 1px grey;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }

    .Form {
      width: 100%;
      height: auto;
      position: relative;
      .InputCont {
        width: 19%;
      }
    }
    .btn {
      border-radius: 5px;
      width: 190px;
      height: 40px;
      position: absolute;
      right: 30px;
      margin-top: 35px;
      text-transform: none;
      background: var(--mainColor2);
      color: white;
      text-transform: none !important;
      font-style: normal !important;
      font-weight: 500 !important;
      letter-spacing: normal !important;
      i {
        padding-right: 0px;
      }
    }

    // Cerrar modal
    .CloseModalBtn {
      width: auto;
      height: auto;
      position: absolute;
      right: -15px;
      top: -15px;
      z-index: 1000;
      border-radius: 25px;
      cursor: pointer;

      .closeBtn {
        width: 30px !important;
        height: 30px !important;
        .iconClose {
          width: 34px;
          height: 34px;
        }
      }
    }
  }
}
</style>
