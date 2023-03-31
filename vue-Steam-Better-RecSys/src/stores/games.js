import { defineStore } from 'pinia'
import { recommendationsAPI } from "@/api";

const useGamesStore = defineStore('gameSystems', {
    state: () => ({
        recommendedGames: []
    }),
    actions: {
        async getRecommendedGames() {
            const response = await recommendationsAPI.getRecommendedGames()

            this.recommendedGames = response.data.items[0]

            return response
        },
    }
})

export default useGamesStore
