class RecommendationsAPI {
    constructor(instance) {
        this.API = instance
    }

    getRecommendedGames = async () => {
        return this.API({
            method: 'GET',
            url: 'recommendations?game_id=730'
        })
    }
}

export default RecommendationsAPI
