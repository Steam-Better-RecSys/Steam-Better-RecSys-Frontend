import {defineStore} from 'pinia';
import {gamesAPI, recommendationsAPI} from '@/api';

const useGamesStore = defineStore('gameSystems', {
    state: () => ({
        games: [],
        selectedGames: [],
        currentRecommendedGames: [],
        sorting: new Map(),
        selectedTags: new Map(),
        searchingString: null,
        offset: 0,
        limit: 0
    }),
    actions: {
        async getFilteredGamesStore(
            sort = new Map(),
            tags = new Map(),
            searchString,
            offset,
            limit
        ) {
            this.sorting = sort
            this.selectedTags = tags
            this.searchString = searchString
            this.offset = offset

            const response = await gamesAPI.getFilteredGames(
                sort,
                tags,
                searchString,
                offset
            );
            let proxy = response.data[0];
            this.limit = response.data[1];
            if (offset === 0) {
                this.games = []
            }
            this.games.push(...proxy)
        },

        async getNextFilteredGames() {
            this.offset += 50
            await this.getFilteredGamesStore(this.soring, this.selectedTags, this.searchString, this.offset)
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
            this.selectedGames = [];
        },
    },
});

export default useGamesStore;
