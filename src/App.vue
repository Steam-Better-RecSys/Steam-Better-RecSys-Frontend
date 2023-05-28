<script>
import CookieMessage from './components/CookieMessage.vue';
export default {
    components: { CookieMessage },
};
</script>

<template>
    <body class="d-flex flex-column min-vh-100 my-body">
        <RouterView />
        <CookieMessage />
    </body>
</template>

<style></style>
