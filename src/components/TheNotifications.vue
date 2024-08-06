<template>
  <section class="simple-snotify">
    <vue-snotify></vue-snotify>
  </section>
</template>

<script scoped lang="js">
  import Vue from 'vue';
  import Snotify, { SnotifyPosition} from 'vue-snotify';
  import { mapState, mapMutations, mapActions } from 'vuex';
  import { io } from 'socket.io-client';

  const options = {
    toast: {
      position: SnotifyPosition.centerTop,
    }
  };

  Vue.use(Snotify, options);

  export default {
    name: 'notifications',
    computed: {
      ...mapState({ notifications: state => state.ui.notifications.reverse() })
    },
    methods: {
      ...mapMutations(['deleteNotification']),
      ...mapActions(['startSocket']),
      showSnotify (notification) {
        switch (notification.type) {
          case "success":
            this.$snotify.success(notification.text, {
              timeout: 2000,
              showProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
          case "danger":
            this.$snotify.error(notification.text, {
              timeout: 2000,
              showProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
          case "warning":
            this.$snotify.warning(notification.text, {
              timeout: 2000,
              showProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
          default:
            this.$snotify.info(notification.text, {
              timeout: 2000,
              showProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
        }
      }
    },
    watch: {
      notifications: function () {
        this.showSnotify(this.notifications[0]);
      }
    }
  }
</script>

<style scoped lang="scss">
.simple-snotify {
  display: flex;
  justify-content: center;
}
</style>
