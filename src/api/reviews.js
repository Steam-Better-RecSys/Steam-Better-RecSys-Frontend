class ReviewsAPI {
    constructor(instance) {
        this.API = instance;
    }

    getReviews = async (id) => {
        return this.API({
            method: 'GET',
            url: `/reviews/${id}`,
        });
    };
}

export default ReviewsAPI;
