import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './stores';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faS,
    faBan,
    faWandMagic,
    faThumbsUp,
    faThumbsDown,
    faHeart,
    faForward,
} from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app = createApp(App);

library.add(
    faS,
    faThumbsUp,
    faThumbsDown,
    faBan,
    faHeart,
    faForward,
    faWandMagic
);

app.use(store);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
