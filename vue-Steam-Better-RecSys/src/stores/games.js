import { defineStore } from 'pinia';
import { gamesAPI, recommendationsAPI } from '@/api';

const useGamesStore = defineStore('gameSystems', {
    state: () => ({
        games: [],
        selectedGames: [],
        currentRecommendedGames: [],
        sorting: new Map(),
        selectedTags: new Map(),
        searchString: null,
        usernameString: null,
        offset: 0,
        limit: 0,
    }),
    actions: {
        async getFilteredGamesStore(
            sort = new Map(),
            tags = new Map(),
            searchString,
            usernameString,
            offset
        ) {
            this.sorting = sort;
            this.selectedTags = tags;
            this.searchString = searchString;
            this.usernameString = usernameString;
            this.offset = offset;

            const response = await gamesAPI.getFilteredGames(
                sort,
                tags,
                searchString,
                usernameString,
                offset
            );
            let proxy = response.data[0];
            this.limit = response.data[1];
            if (offset === 0) {
                this.games = [];
            }
            this.games.push(...proxy);
        },

        async getNextFilteredGames() {
            this.offset += 50;
            await this.getFilteredGamesStore(
                this.sorting,
                this.selectedTags,
                this.searchString,
                this.usernameString,
                this.offset
            );
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
