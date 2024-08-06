<template>
  <div
    class="CopyAccount HideOnMovil d-flex justify-space-between align-center"
  >
    <v-menu left z-index="3000">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          class="btn"
          text
          rounded
          v-if="!disabled"
        >
          <div class="ButtonText">Copy Account</div>

          <div class="icon">
            <v-icon> mdi-content-copy </v-icon>
          </div>
        </v-btn>
      </template>

      <div>
        <v-list>
          <div class="">
            <v-btn
              v-for="(item, index) in CopyOptions"
              :key="index"
              text
              class="button d-flex justify-start align-center"
              @click="createCopyAccount(copySection)"
            >
              {{ item.content }}
            </v-btn>
          </div>
        </v-list>
      </div>
    </v-menu>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CopyAccount',
  data() {
    return {
      CopyOptions: [
        {
          content: 'New Account',
        },
      ],
      settings: {
        'Subs submission': 'submission',
        'Edit Subs submission': 'submission',
        'Quotation non proportional': 'quotation',
        'Quotation proportional': 'quotation',
        'Edit Subs quotation': 'quotation',
        'Edit Subs quotation non-proportional': 'quotation',
        Bound: 'bound',
        'Edit Bound': 'bound',
        'Bound Property Quotator': 'bound',
        'Edit Bound Property Quotator': 'bound',
      },
    };
  },
  computed: {
    ...mapGetters(['subscription_id']),
    disabled: {
      get() {
        if (this.subscription_id) return false;
        return true;
      },
    },
    copySection: {
      get() {
        return this.settings[this.$route.name] || null;
      },
    },
  },
  methods: {
    ...mapActions(['createCopyAccount']),
  },
};
</script>
<style lang="less" scoped>
.CopyAccount {
  width: auto;
  height: 100%;
  position: absolute;
  right: 0;
  .btn {
    font-weight: normal !important;
    font-size: 16px;
    color: #547fa9 !important;
    font-weight: 400 !important;
    letter-spacing: normal !important;
    text-transform: none !important;
    cursor: pointer;
    display: inline-flex;
    .ButtonText {
      color: inherit;
    }
    .icon {
      width: 30px;
      height: 30px;
      border-radius: 30px;
      background: #a8bfd9;
      margin-left: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 14px;
        color: #003d6d;
      }
    }
  }
}
.button {
  height: 45px;
  color: #003d6d;
  cursor: pointer;
  width: 100% !important;
  text-transform: none;
  letter-spacing: initial;
}

@media (max-width: 640px) {
  .CopyAccount {
    height: 40px;
    .btn {
      width: 30px !important;
      height: 30px;

      .ButtonText {
        display: none;
      }
      .icon {
        margin-left: 0px;
      }
    }
  }

  .v-btn:not(.v-btn--round).v-size--default {
    min-width: 30px !important;
  }
}
</style>