import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {far,faThumbsUp, faThumbsDown, faHeart} from "@fortawesome/free-regular-svg-icons";
import {faS, faBan} from "@fortawesome/free-solid-svg-icons";
import {faForward, faBackward} from "@fortawesome/free-solid-svg-icons";

import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import {aliases, fa} from 'vuetify/iconsets/fa-svg'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

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

library.add(faS, far, faThumbsUp, faThumbsDown, faBan, faHeart, faForward, faBackward)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
