<template>
  <div class="app-close-account d-flex justify-center align-center" :class="classRounded ? 'button-submit--outlined' : ''">
    <v-menu :top="top" :left="top ? false : true" z-index="3000">
      <template #activator="{ on, attrs }">
        <v-btn class="activateButton" rounded text v-bind="attrs" v-on="on" large :loading="loading">
          <div class="ButtonText">
            {{ text ? text : "Close Account" }}
          </div>
          <v-icon :color="iconColor">
            {{ icon }}
          </v-icon>
        </v-btn>
      </template>

      <v-list class="pl-5 pr-5">
        <div v-if="header !== ''" class="headerClose d-flex justify-start align-center">
          {{ header }}
        </div>
        <div @click="CloseAccount(item.id)" class="button" v-for="(item, index) in closeAccountData" :key="index">
          <v-list-item-title>
            {{ item.reasonText || item.description }}
          </v-list-item-title>
        </div>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
export default {
  name: "AppCloseAccount",
  props: {
    iconColor: {
      type: String,
      default: "#F59607",
    },
    icon: {
      type: String,
    },
    header: {
      type: String,
      default: "",
    },
    closeAccountData: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
    },
    classRounded: {
      type: Boolean,
    },
    top: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "	Close Account",
      required: false,
    },
  },
  methods: {
    CloseAccount(idOptionSelected) {
      this.$emit("close-account", {
        idOptionSelected,
      });
    },
  },
};
</script>
<style lang="less" scoped>
//CERRAR CUENTA
.app-close-account {
  width: auto;
  height: 100%;

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
.button-submit--outlined {
  border-radius: 5px !important;
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
.v-menu__content {
  min-width: 227px !important;
  margin-left: -25px !important;
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
