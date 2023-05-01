import {defineStore} from 'pinia'
import {recommendationsAPI, gamesAPI} from "@/api";

const useGamesStore = defineStore('gameSystems', {
    state: () => ({
        recommendedGames: [],
        currentRecommendedGames: []
    }),
    actions: {
        async getAllGamesStore() {
            const response = await recommendationsAPI.getAllGames()
            this.recommendedGames = response.data[0]

            return this.recommendedGames;
        },
        async getRecommendedGames(gameId, gameStatus) {
            const response = await gamesAPI.getRecommendation(gameId, gameStatus)
            this.currentRecommendedGame = response.data

            return this.currentRecommendedGame
        },
        async setSelectedGames(ids) {
            const response = await gamesAPI.setSelectedGamesForRecommendations(ids)
        }
    }
})

export default useGamesStore
