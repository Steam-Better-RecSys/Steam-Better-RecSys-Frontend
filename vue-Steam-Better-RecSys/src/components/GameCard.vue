<template>
    <div class="container p-0 m-0">
        <img
            class="game-img rounded-3"
            :src="image"
            :alt="title"
            :id="id"
            @click="setActive(gameId)"
            :class="{ active: isActive }"
            @error="setImage($event.currentTarget)"
        />
        <div class="centered" v-if="showTitle">
            <small> {{ title }} </small>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GameCard',
    data() {
        return {
            isActive: false,
            showTitle: false,
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
    },
    methods: {
        setActive(id) {
            !this.isActive
                ? this.$emit('selectGame', id)
                : this.$emit('deleteGame', id);
            this.isActive = !this.isActive;
        },
        setImage(image) {
            image.setAttribute('src', 'src/assets/Image404.png');
            this.showTitle = true;
        },
    },
    emits: ['selectGame', 'deleteGame'],
};
</script>

<style scoped>
.game-img {
    max-height: 200px;
    transition: 0.3s;
}

.game-img.active {
    -webkit-box-shadow: 0 0 20px var(--dark-theme-color);
    box-shadow: 0 0 20px var(--dark-theme-color);
    transform: scale(1.03);
    transition: 0.3s;
}

.game-img:hover {
    transform: scale(1.05);
    transition: 0.3s;
    cursor: pointer;
}

.container {
    position: relative;
    text-align: center;
    color: var(--main-text-color);
}

.centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
