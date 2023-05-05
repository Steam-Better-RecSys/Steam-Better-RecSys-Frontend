class GamesAPI {
    constructor(instance) {
        this.API = instance;
    }

    getFilteredGames = async (sort, tags, offset) => {
        const params = new URLSearchParams();

        params.append('offset', offset)

        for (const elem of sort) {
            params.append(elem[0], elem[1]);
        }

        for (const elem of tags) {
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
