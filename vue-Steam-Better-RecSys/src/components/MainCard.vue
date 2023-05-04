<template>
    <div class="d-flex flex-column flex-grow-1">
        <div class="d-flex flex-row flex-wrap justify-content-center">
            <div class="mb-3 mx-3" v-for="game in games">
                <GameCard
                    :title="game.title"
                    :image="game.verticalImageUrl"
                    :id="game.id"
                />
            </div>
        </div>
        <Pagination />
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import useGamesStore from '@/stores/games';
import Pagination from '@/components/UI/Pagination.vue';
import GameCard from '@/components/GameCard.vue';

export default {
    name: 'mainCard',
    components: {
        GameCard,
        Pagination,
    },
    methods: {
        ...mapActions(useGamesStore, ['getAllGamesStore', 'getFilteredGames']),
        async render() {
            await this.getAllGamesStore();
        },
    },
    computed: {
        ...mapState(useGamesStore, ['games']),
    },
    mounted() {
        this.render();
    },
};
</script>

<style scoped></style>
