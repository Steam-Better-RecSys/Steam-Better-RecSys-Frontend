import {createApp} from 'vue'

import App from './App.vue'
import router from './router'
import store from './stores'

import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {far} from "@fortawesome/free-regular-svg-icons";
import {faS, faBan, faWandMagic, faThumbsUp, faThumbsDown, faHeart} from "@fortawesome/free-solid-svg-icons";
import {faForward, faBackward} from "@fortawesome/free-solid-svg-icons";

import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import {aliases, fa} from 'vuetify/iconsets/fa-svg'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


const vuetify = createVuetify({
    icons: {
        defaultSet: 'fa',
        aliases,
        sets: {
            fa,
        }
    },
    components,
    directives,
})

const app = createApp(App)

library.add(faS, far, faThumbsUp, faThumbsDown, faBan, faHeart, faForward, faBackward, faWandMagic)

app.use(store)
app.use(router)
app.use(vuetify)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
