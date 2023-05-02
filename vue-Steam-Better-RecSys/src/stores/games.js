import { defineStore } from 'pinia';
import { gamesAPI, recommendationsAPI } from '@/api';

const useGamesStore = defineStore('gameSystems', {
    state: () => ({
        games: [],
        currentRecommendedGames: [],
    }),
    actions: {
        async getAllGamesStore() {
            const response = await gamesAPI.getAllGames();
            this.games = response.data[0];
        },

        async getFilteredGamesStore(sort, tags) {
            const response = await gamesAPI.getFilteredGames(sort, tags);
            this.games = response.data[0];
        },

        async getRecommendedGames(gameId, gameStatus) {
            const response = await recommendationsAPI.getRecommendation(
                gameId,
                gameStatus
            );
            this.currentRecommendedGame = response.data;

            return this.currentRecommendedGame;
        },

        async setSelectedGames(ids) {
            const response =
                await recommendationsAPI.setSelectedGamesForRecommendations(
                    ids
                );
        },
    },
});

export default useGamesStore;
