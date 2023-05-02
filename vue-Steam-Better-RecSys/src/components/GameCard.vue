<template>
    <img
        class="game-img"
        :src="image"
        :alt="title"
        :id="id"
        @click="setActive(id)"
        :class="{ active: isActive }"
        @error="setImage($event.currentTarget)"
    />
</template>

<script>
export default {
    name: 'GameCard',
    data() {
        return {
            isActive: false,
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
    },
    methods: {
        setActive(id) {
            this.isActive = !this.isActive;
        },
        setImage(image) {
            image.setAttribute('src', 'src/assets/Image404.png');
        },
    },
};
</script>

<style scoped>
.game-img {
    width: 65%;
    display: flex;
    border-radius: 15px;
    opacity: 0.7;
}

.game-img.active {
    opacity: 1;
    -webkit-box-shadow: 0 0 25px #591fe7;
    box-shadow: 0 0 25px #591fe7;
    border-width: 5px;
    border: red;
}

.game-img:hover {
    transform: scale(1.03);
    transition: 0.3s;
    cursor: pointer;
}
</style>
