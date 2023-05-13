<template>
    <Header />
    <div class="d-flex justify-content-center my-2 mx-4">
        <div class="col-12 col-sm-12 col-md-10 col-lg-8">
            <h1>Privacy Policy</h1>
            <p>
                We are not collecting any personal information at the moment, so
                there's nothing here yet :)
            </p>
        </div>
    </div>
    <Footer />
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
    components: {
        Header,
        Footer,
    },
};
</script>

<style scoped></style>
