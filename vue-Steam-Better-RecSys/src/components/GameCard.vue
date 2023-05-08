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
            :src="image"
            :alt="title"
            :id="id"
            @error="setImage($event.currentTarget)"
            @load="checkImage($event.currentTarget)"
            @click="setActive(gameId)"
        />
        <div class="centered disable-events text-blend" v-show="isBroken">
            <small> {{ title }} </small>
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
        image: {
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
        brokenImage: {
            type: String,
        },
    },
    methods: {
        setActive(id) {
            !this.isActive
                ? this.$emit('selectGame', id)
                : this.$emit('deleteGame', id);
        },
        setImage(image) {
            image.setAttribute('src', this.brokenImage);
            console.clear()
        },
        checkImage(image) {
            this.isBroken = image.src !== this.image;
        },
        openInNewTab(url) {
            window.open(url, '_blank', 'noreferrer');
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
    filter: blur(10px);
    -webkit-filter: blur(10px);
}

.container {
    transition: 0.4s;
    position: relative;
    text-align: center;
    color: var(--main-text-color);
    max-height: 200px;
    max-width: 133px;
    overflow: hidden;
}

.container:hover {
    transform: scale(1.05);
    transition: 0.3s;
    cursor: pointer;
}

.container.active {
    transform: scale(1.03);
    -webkit-box-shadow: 0 0 0 4px var(--dark-theme-color);
    box-shadow: 0 0 0 4px var(--dark-theme-color);
}

.text-blend {
    mix-blend-mode: lighten;
    color: white;
}

.centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.right-top {
    position: absolute;
    top: 10%;
    left: 85%;
    transform: translate(-50%, -50%);
}
</style>
