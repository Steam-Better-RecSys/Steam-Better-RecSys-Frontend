<template>
    <footer class="mt-auto d-flex flex-column align-items-center py-1">
        <div class="text-center my-0">
            <p>Questions or problems?</p>
            <p>
                tw:
                <a
                    href="https://twitter.com/evllko"
                    target="_blank"
                    rel="noopener noreferrer"
                    >@evllko</a
                >
                | gm: evlko.oklve
            </p>
        </div>
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 d-flex flex-row my-0">
            <div class="col-4">
                <p class="text-center">
                    <small
                        ><a class="disable-a" href="/privacy"
                            >Privacy Policy</a
                        ></small
                    >
                </p>
            </div>
            <div class="col-4">
                <p class="text-center">
                    <small><a class="disable-a" href="/about">About</a></small>
                </p>
            </div>
            <div class="col-4">
                <p class="text-center">
                    <small
                        ><a class="disable-a" href="/cookies">Cookies</a></small
                    >
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
    background: var(--contrast-bg-color);
    color: var(--main-text-color);
}
p {
    margin-bottom: 0;
}
.disable-a {
    color: var(--main-text-color);
}
</style>
