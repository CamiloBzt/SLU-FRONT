import 'babel-polyfill';
import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { io } from 'socket.io-client';

import Vuelidate from 'vuelidate';
//Import global styles
import '@/assets/global.less';
import '@/assets/fonts/Fonts.less';

import { createProvider } from '@/lib/api';

/* Vue Config & Providers */
Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  beforeCreate(){
     const socket = io(process.env.VUE_APP_API_URL,{
      secure: true,
      withCredentials:true,
    });

     this.$store.dispatch('startSocket',socket)
  },
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount('#app');
