import {defineStore} from 'pinia'
import {recommendationsAPI, gamesAPI} from "@/api";

const useGamesStore = defineStore('gameSystems', {
    state: () => ({
        recommendedGames: [],
        currentRecommendedGame: null
    }),
    actions: {
        async getAllGamesStore() {
            const response = await recommendationsAPI.getAllGames()
            this.recommendedGames = response.data[0]

            return this.recommendedGames;
        },
        async getRecommendedGame() {
            const response = await gamesAPI.getRecommendation()
            this.currentRecommendedGame = response.data[0]

            return this.currentRecommendedGame
        },
        async updateCurrentGameDescription() {
            const response = await recommendationsAPI.updateGameDescription(this.currentRecommendedGame.gameId)
            this.currentRecommendedGame = response.data[0]

            return this.currentRecommendedGame
        }
    }
})

export default useGamesStore
