import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './stores';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faS,
    faBan,
    faWandMagicSparkles,
    faThumbsUp,
    faThumbsDown,
    faHeart,
    faForward,
    faMagnifyingGlass,
    faCookieBite,
    faUpRightFromSquare,
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
    faWandMagicSparkles,
    faMagnifyingGlass,
    faCookieBite,
    faUpRightFromSquare
);

app.use(store);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
