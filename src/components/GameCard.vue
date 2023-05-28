<template>
    <div
        class="container p-0 m-0 rounded-3"
        :class="{ active: isActive }"
        @mouseover="showButton = true"
        @mouseleave="showButton = false"
    >
        <img
            class="game-img"
            :class="{ 'broken-img': isBroken }"
            :src="getVerticalImage"
            :alt="title"
            :id="id"
            @error="setImage($event.currentTarget)"
            @load="checkImage($event.currentTarget)"
            @click="setActive(gameId)"
            @touchstart="setActive(gameId)"
        />
        <div class="centered disable-events" v-show="isBroken">
            <small
                ><p class="m-0 p-1 text-background">{{ title }}</p></small
            >
        </div>
        <div class="right-top" v-show="showButton">
            <button
                role="link"
                class="btn btn-sm btn-light flex-grow-1"
                @click="
                    openInNewTab(
                        'https://store.steampowered.com/app/' +
                            this.gameId +
                            '/' +
                            this.nameSlug
                    )
                "
            >
                <font-awesome-icon icon="fas fa-up-right-from-square" />
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GameCard',
    data() {
        return {
            isBroken: false,
            showButton: false,
        };
    },
    props: {
        title: {
            type: String,
        },
        id: {
            type: Number,
        },
        gameId: {
            type: Number,
        },
        nameSlug: {
            type: String,
        },
        isActive: {
            type: Boolean,
        },
    },
    computed: {
        getVerticalImage() {
            return (
                'https://cdn.cloudflare.steamstatic.com/steam/apps/' +
                this.gameId +
                '/library_600x900.jpg'
            );
        },
        getHorizontalImage() {
            return (
                'https://cdn.cloudflare.steamstatic.com/steam/apps/' +
                this.gameId +
                '/header.jpg'
            );
        },
    },
    methods: {
        setActive(id) {
            !this.isActive
                ? this.$emit('selectGame', id)
                : this.$emit('deleteGame', id);
        },
        setImage(image) {
            image.setAttribute('src', this.getHorizontalImage);
            console.clear();
        },
        checkImage(image) {
            this.isBroken = image.src !== this.getVerticalImage;
        },
        openInNewTab(url) {
            window.open(url, '_blank', 'noopener noreferrer');
        },
    },
    emits: ['selectGame', 'deleteGame'],
};
</script>

<style scoped>
@import '../styles/main.css';

.game-img {
    height: 100%;
    width: auto;
}

.broken-img {
    width: auto;
    filter: blur(9px);
    -webkit-filter: blur(9px);
}

.container {
    position: relative;
    text-align: center;
    color: var(--main-text-color);
    max-height: 200px;
    max-width: 133px;
    overflow: hidden;
    transform: scale(1);
    -webkit-transform: scale(1);
    transition: 0.3s;
}

.container:hover {
    box-shadow: 0 0 0 4px var(--main-theme-color);
    -webkit-box-shadow: 0 0 0 4px var(--contrast-bg-color);
    cursor: pointer;
    transform: scale(1.05);
    -webkit-transform: scale(1.05);
    transition: 0.3s;
}

.container.active {
    box-shadow: 0 0 0 4px var(--main-theme-color);
    -webkit-box-shadow: 0 0 0 4px var(--main-theme-color);
}

.centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
}

.right-top {
    position: absolute;
    top: 10%;
    left: 85%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
}
</style>
