<template>
  <v-app>
    <v-main>
      <the-notifications />
      <loading :show="loading" />
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import loading from '@/components/loading.vue';
import TheNotifications from '@/components/TheNotifications';
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    TheNotifications,
    loading,
  },
  computed: {
    ...mapGetters(['authStatus', 'user', 'loading']),
  },
  methods: {
    ...mapMutations(['setLanguage']),
  },
  mounted() {
    const language = sessionStorage.getItem('language');
    if (language) {
      this.setLanguage(language);
    }
  },
};
</script>
<style lang="css">
@import '../node_modules/vue-snotify/styles/material.css';
</style>
