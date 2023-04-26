import {defineStore} from 'pinia'
import {recommendationsAPI} from "@/api";

const useGamesStore = defineStore('gameSystems', {
    state: () => ({
        recommendedGames: []
    }),
    actions: {
        async getAllGamesStore() {
            const response = await recommendationsAPI.getAllGames()
            this.recommendedGames = response.data.slice(0,14)

            return this.recommendedGames;
        },
    }
})

export default useGamesStore
