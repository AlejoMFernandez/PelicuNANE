import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import 'vuetify/styles';
import './style.css';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';

import Home from './views/Home.vue';
import Search from './views/Search.vue';
import MovieDetail from './views/MovieDetail.vue';
import Favorites from './views/Favorites.vue';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
});

const pinia = createPinia();

const routes = [
  { path: '/', component: Home },
  { path: '/search', component: Search },
  { path: '/movie/:id', component: MovieDetail, props: true },
  { path: '/favorites', component: Favorites },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .use(vuetify)
  .use(pinia)
  .use(router)
  .mount('#app');
