<template>
    <div class="">
        <div class="main-wrap w-100 h-100 pa-8 d-flex flex-column align-center">
            <div class="grid-container">
                <div class="game-wrap" v-for="game in games">
                    <GameCard
                        :title="game.title"
                        :image="game.verticalImageUrl"
                        :id="game.id"
                    />
                </div>
            </div>
            <Pagination />
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import useGamesStore from '@/stores/games';
import Pagination from '@/components/UI/Pagination.vue';
import GameCard from './GameCard.vue';

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
</style>
