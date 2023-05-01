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
}

export default TagsAPI;
