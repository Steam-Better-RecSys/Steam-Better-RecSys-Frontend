class GamesAPI {
    constructor(instance) {
        this.API = instance
    }

    getAllGames = async () => {
        return this.API({
            method: 'GET',
            url: '/games'
        })
    }
}

export default GamesAPI
