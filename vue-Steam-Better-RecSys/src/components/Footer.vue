<template>
    <footer class="mt-auto d-flex flex-column align-items-center py-1">
        <div class="text-center my-0">
            <p>
                Something wrong or broken? Contact evlko.oklve [at] gmail [dot]
                com
            </p>
        </div>
        <div class="col-12 col-sm-2 col-md-6 col-lg-4 d-flex flex-row my-0">
            <div class="col-4">
                <p class="text-center">
                    <small><a>Privacy Polciy</a></small>
                </p>
            </div>
            <div class="col-4">
                <p class="text-center">
                    <small><a href="/about">About</a></small>
                </p>
            </div>
            <div class="col-4">
                <p class="text-center">
                    <small><a href="/cookies">Cookies</a></small>
                </p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {};
</script>

<style scoped>
@import '../styles/main.css';

footer {
    background: var(--additional-bg-color);
    color: var(--main-text-color);
}
p {
    margin-bottom: 0;
}
a {
    color: var(--main-text-color);
}
</style>
