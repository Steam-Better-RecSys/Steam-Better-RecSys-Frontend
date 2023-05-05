<template>
    <div class="d-flex flex-column flex-grow-1">
        <div class="d-flex flex-row flex-wrap justify-content-center">
            <div class="mb-3 mx-3" v-for="game in games">
                <GameCard
                        :title="game.title"
                        :image="game.verticalImageUrl"
                        :id="game.id"
                        :game-id="game.gameId"
                        @select-game="handleSelect"
                        @delete-game="handleDelete"
                />
            </div>
        </div>
        <Pagination @page-change="handleOffset"/>
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
            selectedGames: new Set(),
        }
    },
    components: {
        GameCard,
        Pagination,
    },
    methods: {
        ...mapActions(useGamesStore, ['getFilteredGamesStore', "setSelectedState"]),
        async render() {
            await this.getFilteredGamesStore(new Map(), new Map(), this.offset)
        },
        handleOffset(offset) {
            this.offset = offset
        },
        handleSelect(id) {
            this.selectedGames.add(id)
            this.setSelectedState(Array.from(this.selectedGames))
        },
        handleDelete(id) {
            this.selectedGames.delete(id)
            this.setSelectedState(Array.from(this.selectedGames))
        },
    },
    computed: {
        ...mapState(useGamesStore, ['games']),
    },
    mounted() {
        this.render();
    },
    watch: {
        async offset(offset) {
            await this.getFilteredGamesStore(new Map(), new Map(), offset)
        }
    }
};
</script>

<style scoped></style>
