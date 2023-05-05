import {defineStore} from 'pinia';
import {gamesAPI, recommendationsAPI} from '@/api';

const useGamesStore = defineStore('gameSystems', {
    state: () => ({
        games: [],
        selectedGames: [],
        currentRecommendedGames: [],
        pages: []
    }),
    actions: {
        async getFilteredGamesStore(sort = new Map, tags = new Map, offset) {
            const response = await gamesAPI.getFilteredGames(sort, tags, offset);
            this.games = response.data[0];
            if (Math.ceil(response.data[1] / 50) < 10) {
                this.pages.push(Math.ceil(response.data[1] / 50))
            } else {
                let arr = []
                for (let i = 1; i < 11; i++) {
                    arr.push(i)
                }
                this.pages = arr
            }
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
            this.selectedGames = games
        },

        async setSelectedGames(ids) {
            await recommendationsAPI.setSelectedGamesForRecommendations(ids);
            this.selectedGames = []
        },
    },
});

export default useGamesStore;
