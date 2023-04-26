<template>
    <div class="">
        <div class="main-wrap w-100 h-100 pa-8 d-flex flex-column align-center">
            <div class="grid-container">
                <div class="game-wrap" v-for="game in games">
                    <img class="game-img" :src="game.verticalImageUrl" alt="" :id="game.id"
                         @click="select(game.id)" :class="{active: game.isSelected}">
                </div>
            </div>
            <Pagination/>
        </div>
    </div>
</template>

<script>
import {mapActions} from "pinia";
import useGamesStore from "@/stores/games";
import Pagination from "@/components/UI/Pagination.vue";

export default {
    name: "mainCard",
    components: {
        Pagination
    },
    data() {
        return {
            games: [],
        }
    },
    methods: {
        ...mapActions(useGamesStore, ['getAllGamesStore']),
        async render() {
            this.games = await this.getAllGamesStore();
            for (let game in this.games) {
                this.games[game].isSelected = false;
            }

        },
        select(id) {
            this.games.find(game => game.id === id).isSelected = !this.games.find(game => game.id === id).isSelected

        }

    },
    mounted() {
        this.render()
    }
}
</script>

<style scoped>
div {
    height: max-content;
}

.grid-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 50px;
    margin-bottom: 30px;
}

.game-wrap {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    height: max-content;
}


.game-img {
    width: 65%;
    display: flex;
    border-radius: 15px;
    opacity: 0.7;
}

.game-img.active {
    opacity: 1;
    -webkit-box-shadow: 0 0 10px #fff;
    box-shadow: 0 0 10px #fff;
}

.game-img:hover {
    transform: scale(1.03);
    transition: 0.3s;
    cursor: pointer;
}
</style>