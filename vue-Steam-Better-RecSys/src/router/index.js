import {createRouter, createWebHistory} from 'vue-router'
import MainView from "@/views/MainView.vue";
import RecommendationView from "@/views/RecommendationView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: MainView
        },
        {
            path:'/recommendation',
            name: 'name',
            component: RecommendationView
        }
    ]
})

export default router
