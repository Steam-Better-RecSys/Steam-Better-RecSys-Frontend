import {createRouter, createWebHistory} from 'vue-router'
import MainView from "@/views/MainView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'All Games',
            component: MainView
        },
        {
            path:'/recommendation',
            name: 'Recommenations',
            component: () => import('../views/RecommendationView.vue'),
        }
    ]
})

router.beforeEach((to, from, next) => {
    document.title = to.name;
    next();
});

export default router
