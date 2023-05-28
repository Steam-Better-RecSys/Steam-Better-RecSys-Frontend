<template>
    <div class="card p-3 mx-3">
        <img class="card-img-top" :src="getImage" :alt="name" />
        <div class="card-body pb-0">
            <h1>
                <b
                    ><a
                        :href="getSteamLink"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {{ name }}
                    </a></b
                >
            </h1>
            <p v-html="description"></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RecommendationCard',
    props: {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        nameSlug: {
            type: String,
        },
        gameId: {
            type: Number,
        },
    },
    computed: {
        getSteamLink() {
            return (
                'https://store.steampowered.com/app/' +
                this.gameId +
                '/' +
                this.nameSlug
            );
        },
        getImage() {
            return (
                'https://cdn.cloudflare.steamstatic.com/steam/apps/' +
                this.gameId +
                '/header.jpg'
            );
        },
    },
};
</script>

<style scoped>
.card {
    background: var(--bg-color);
    border: 5px solid var(--additional-bg-color);
    border-radius: 30px;
    color: var(--main-text-color);
}

img {
    border-radius: 20px;
}

a {
    text-decoration: None;
    color: var(--main-theme-color);
}
</style>
