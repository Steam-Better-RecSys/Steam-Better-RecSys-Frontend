class TagsAPI {
    constructor(instance) {
        this.API = instance;
    }

    getAllTags = async () => {
        return this.API({
            method: 'GET',
            url: '/classes',
        });
    };

    getTagById = async (id) => {
        return this.API({
            method: 'GET',
            url: `/tags/${id}`
        })
    }
}

export default TagsAPI;
