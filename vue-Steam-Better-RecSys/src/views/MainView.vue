<template>
    <Header />
    <filters-menu />
    <main-card />
    <Footer />
</template>

<script>
import Header from '@/components/Header.vue';
import FiltersMenu from '@/components/FiltersMenu.vue';
import MainCard from '@/components/MainCard.vue';
import Footer from '@/components/Footer.vue';

export default {
    components: {
        MainCard,
        Header,
        FiltersMenu,
        Footer,
    },
};
</script>

<style scoped></style>
