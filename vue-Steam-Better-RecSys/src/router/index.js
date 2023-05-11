import { createRouter, createWebHistory } from 'vue-router';
import MainView from '@/views/MainView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Steam Wizzard — All Games',
            component: MainView,
        },
        {
            path: '/recommendation',
            name: 'Steam Wizzard — Recommenations',
            component: () => import('../views/RecommendationView.vue'),
        },
        {
            path: '/cookies',
            name: 'Steam Wizzard — Cookie Policy',
            component: () => import('../views/CookiesView.vue'),
        },
        {
            path: '/about',
            name: 'Steam Wizzard — About',
            component: () => import('../views/AboutView.vue'),
        },
    ],
});

router.beforeEach((to, from, next) => {
    document.title = to.name;
    next();
});

export default router;
