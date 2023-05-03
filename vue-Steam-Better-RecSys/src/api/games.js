class GamesAPI {
    constructor(instance) {
        this.API = instance;
    }

    getAllGames = async () => {
        const params = new URLSearchParams();

        params.append('limit', '10')

        return this.API({
            method: 'GET',
            url: '/games',
            validateStatus: false,
            params: params,
        });
    };

    getFilteredGames = async (sort, tags) => {
        const params = new URLSearchParams();

        params.append('limit', '10')

        for (const elem of sort) {
            params.append(elem[0], elem[1]);
        }

        for(const elem of tags){
            params.append(elem[1], elem[0])
        }

        return this.API({
            method: 'GET',
            url: '/games',
            params: params,
        });
    };
}

export default GamesAPI;
