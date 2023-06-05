import { createRouter, createWebHistory } from 'vue-router';
import MainView from '@/views/MainView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'SteamWizzard — All Games',
            component: MainView,
        },
        {
            path: '/recommendation',
            name: 'SteamWizzard — Recommenations',
            component: () => import('../views/RecommendationView.vue'),
        },
        {
            path: '/cookies',
            name: 'SteamWizzard — Cookie Policy',
            component: () => import('../views/CookiesView.vue'),
        },
        {
            path: '/about',
            name: 'SteamWizzard — About',
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/privacy',
            name: 'SteamWizzard — Privacy Policy',
            component: () => import('../views/PrivacyView.vue'),
        },
        {
            path: '/reviews',
            name: 'SteamWizzard — Reviews',
            component: () => import('../views/ReviewsView.vue'),
        },
    ],
});

router.beforeEach((to, from, next) => {
    document.title = to.name;
    next();
});

export default router;
