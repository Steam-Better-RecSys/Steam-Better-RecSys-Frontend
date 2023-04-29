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

    updateGameDescription = async (id) => {
        return this.API({
            method: 'PUT',
            url: '/games/description/' + id,
        })
    }
}

export default GamesAPI
