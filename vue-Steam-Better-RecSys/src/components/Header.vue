<template>
    <header class="header sticky-top p-1 text-center">
        <div @click="goHome()">
            <h1>
                <b>Steam Wizzard</b><sup><small>β</small></sup>
            </h1>
        </div>
    </header>
</template>

<script>
import router from '../router';

export default {
    name: 'Header',
    methods: {
        goHome() {
            router.push({ path: '/', replace: true });
        },
    },
};
</script>

<style scoped>
header {
    background-color: var(--additional-bg-color);
    font-family: 'Beautiful Magic', sans-serif;
}

h1 {
    color: var(--main-theme-color);
}

div {
    cursor: pointer;
}
</style>
