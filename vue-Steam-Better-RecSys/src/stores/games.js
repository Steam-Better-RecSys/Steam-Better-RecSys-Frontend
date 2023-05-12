import {defineStore} from 'pinia';
import {gamesAPI, recommendationsAPI} from '@/api';

const useGamesStore = defineStore('gameSystems', {
    state: () => ({
        games: [],
        selectedGames: [],
        currentRecommendedGames: [],
    }),
    actions: {
        async getFilteredGamesStore(
            sort = new Map(),
            tags = new Map(),
            searchString,
            offset
        ) {
            const response = await gamesAPI.getFilteredGames(
                sort,
                tags,
                searchString,
                offset
            );
            let proxy = response.data[0];
            if (offset === 0) {
                this.games = []
            }
            this.games.push(...proxy)
        },

        async getRecommendedGames(gameId, gameStatus) {
            const response = await recommendationsAPI.getRecommendation(
                gameId,
                gameStatus
            );
            this.currentRecommendedGame = response.data;

            return this.currentRecommendedGame;
        },

        setSelectedState(games) {
            this.selectedGames = games;
        },

        async setSelectedGames(ids) {
            await recommendationsAPI.setSelectedGamesForRecommendations(ids);
        },
    },
});

export default useGamesStore;
