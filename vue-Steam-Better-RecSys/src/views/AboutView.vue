<template>
    <Header />
    <div class="d-flex justify-content-center my-2 mx-4">
        <div class="col-12 col-sm-12 col-md-10 col-lg-8">
            <h1>About SteamWizzard</h1>
            <h2>Idea</h2>
            <p>
                Great idea!
            </p>
            <h2>Beta</h2>
            <p>
                The project is in beta stage, so:
            </p>
            <ol>
                <li>If authorization will be added, at some point there is a possibility of losing your account;</li>
                <li>Recommendation algorithms may change (for the better);</li>
                <li>Gradually there will be new functionality.</li>
            </ol>
            <h2>Team</h2>
            <p>Lev Kobelev (tw: <a href="https://twitter.com/evllko" target="_blank" rel="noopener noreferrer">@evllko</a>) — author & main wizard.</p>
            <p>Special Thanks to Anton Konev (gh: <a href="https://github.com/VenomouSTaCo" target="_blank" rel="noopener noreferrer">@VenomouSTaCo</a>) & Vladimir Ivanov (gh: <a href="https://github.com/IVladimirA" target="_blank" rel="noopener noreferrer">@IVladimirA</a>) for helping with the project at the beginning.</p>
            <h2>Licenses</h2>
            <p>
                We use...
            </p>
            <p>
                License...
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

<style scoped>
@import '../styles/main.css';
</style>
