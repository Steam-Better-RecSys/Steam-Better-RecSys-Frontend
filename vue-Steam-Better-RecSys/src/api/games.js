class GamesAPI {
    constructor(instance) {
        this.API = instance;
    }

    getAllGames = async () => {
        return this.API({
            method: 'GET',
            url: '/games',
            validateStatus: false,
        });
    };

    getFilteredGames = async (searchParams) => {
        const params = new URLSearchParams();

        for (const elem of searchParams) {
            params.append(elem[1], elem[0]);
        }

        return this.API({
            method: 'GET',
            url: '/games',
            params: params,
        });
    };
}

export default GamesAPI;
