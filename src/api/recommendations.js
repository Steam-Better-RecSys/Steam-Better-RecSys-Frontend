class RecommendationsAPI {
    constructor(instance) {
        this.API = instance;
    }

    setSelectedGamesForRecommendations = async (gameIds) => {
        return this.API({
            method: 'POST',
            url: '/recommendations',
            withCredentials: true,
            credentials: 'include',
            data: {
                games_ids: gameIds,
            },
        });
    };

    getRecommendation = async (gameId, gameStatus) => {
        return this.API({
            method: 'GET',
            url: '/recommendations',
            withCredentials: true,
            credentials: 'include',
            params: {
                game_id: gameId,
                game_status: gameStatus,
            },
        });
    };
}

export default RecommendationsAPI;
