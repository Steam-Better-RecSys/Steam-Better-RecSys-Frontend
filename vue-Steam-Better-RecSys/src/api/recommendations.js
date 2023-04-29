class RecommendationsAPI {
    constructor(instance) {
        this.API = instance
    }

    getRecommendation = async () => {
        return this.API({
            method: 'GET',
            url: '/recommendations'
        })
    }
}

export default RecommendationsAPI
