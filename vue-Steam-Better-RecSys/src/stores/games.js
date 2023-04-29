import {defineStore} from 'pinia'
import {gamesAPI} from "@/api";

const useGamesStore = defineStore('gameSystems', {
    state: () => ({
        games: []
    }),
    actions: {

        async getAllGamesStore() {
            const response = await gamesAPI.getAllGames();
            this.games = response.data[0];
        },

        async getFilteredGamesStore(searchParams) {
            const response = await gamesAPI.getFilteredGames(searchParams);
            this.games = response.data[0];
        }
    }
})

export default useGamesStore
