<template>
    <div class="d-flex flex-column flex-grow-1">
        <div class="wrapper mx-2" v-if="games.length !== 0">
            <div
                    class="d-flex justify-content-center mb-3"
                    v-for="game in games"
            >
                <GameCard
                        :title="game.title"
                        :id="game.id"
                        :game-id="game.gameId"
                        :name-slug="game.nameSlug"
                        :isActive="currentSelectedGames.has(game.gameId)"
                        @select-game="handleSelect"
                        @delete-game="handleDelete"
                />
            </div>
        </div>
        <div
                class="d-flex flex-row flex-fill justify-content-center align-items-center mx-3 mb-3"
                v-if="games.length !== 0 && games.length >= 50"
        >
            <button role="button" class="btn btn-outline-primary flex-grow-1" @click="handleOffset()">
                <font-awesome-icon icon="fas fa-magnifying-glass"/>
                Show More
            </button>
        </div>
        <div
                class="d-flex flex-row flex-fill justify-content-center align-items-center"
                v-if="games.length === 0"
        >
            <span>Ooops.. :( nothing found, try other tags</span>
        </div>
        <!-- <Pagination @page-change="handleOffset" /> -->
    </div>
</template>

<script>
import {mapActions, mapState} from 'pinia';
import useGamesStore from '@/stores/games';
import Pagination from '@/components/UI/Pagination.vue';
import GameCard from '@/components/GameCard.vue';

export default {
    name: 'mainCard',
    data() {
        return {
            offset: 0,
            currentSelectedGames: new Set(this.selectedGames)
        };
    },
    components: {
        GameCard,
        Pagination,
    },
    methods: {
        ...mapActions(useGamesStore, [
            'getFilteredGamesStore',
            'setSelectedState',
        ]),
        async render() {
            await this.getFilteredGamesStore(new Map(), new Map(), '', this.offset);
        },
        handleOffset() {
            this.offset += 50;
        },
        handleSelect(id) {
            this.currentSelectedGames.add(id);
            this.setSelectedState(Array.from(this.currentSelectedGames));
        },
        handleDelete(id) {
            this.currentSelectedGames.delete(id);
            this.setSelectedState(Array.from(this.currentSelectedGames));
        },
    },
    computed: {
        ...mapState(useGamesStore, ['games', 'selectedGames']),
    },
    mounted() {
        this.render();

    },
    watch: {
        async offset(offset) {
            await this.getFilteredGamesStore(new Map(), new Map(), '', offset);
        },
    },
};
</script>

<style scoped>
@import '../styles/main.css';

span {
    color: var(--light-theme-color);
    font-size: xx-large;
}

.wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}
</style>
