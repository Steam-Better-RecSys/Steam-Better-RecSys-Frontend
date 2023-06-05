<template>
    <header class="header sticky-top py-1 px-0 m-0 row text-center">
        <div class="col-2">
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <font-awesome-icon icon="fas fa-bars" />
                    </button>
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" :class="{ 'active' : this.currentPage === '/'}" href="/">Recommendations</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" :class="{ 'active' : this.currentPage === '/reviews'}" href="/reviews">Reviews</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        <div @click="goHome()" class="col-8 logo my-auto">
            <h1>
                <a href="/">SteamWizzard<sup><small>β</small></sup></a>
            </h1>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" :class="{ 'active' : this.currentPage === '/'}" href="/">Recommendations</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{ 'active' : this.currentPage === '/reviews'}" href="/reviews">Reviews</a>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
import router from '../router';

export default {
    name: 'Header',
    computed: {
        currentPage() {
            return this.$router.currentRoute._value.fullPath
        },
    },
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
}

.logo {
    cursor: pointer;
    font-family: 'Beautiful Magic', sans-serif;
}

.navbar-nav .nav-link.active {
    color: var(--dark-theme-color);
}

.nav-link {
    color: var(--main-text-color);
}

.nav-link:hover {
    color: var(--light-theme-color);
}

.navbar-toggler {
    border: None;
    color: var(--main-theme-color)
}

.navbar-toggler:focus {
    box-shadow: None;
}

h1 a {
    text-decoration: None;
    color: var(--main-theme-color);
}

</style>
