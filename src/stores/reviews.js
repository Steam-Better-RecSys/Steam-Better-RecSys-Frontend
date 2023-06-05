import { defineStore } from 'pinia';
import { reviewsAPI } from '@/api';

const useReviewsStore = defineStore('tags', {
    state: () => ({
        reviews: {
            pros: [],
            cons: [],
        },
    }),
    actions: {
        async getSummarizedReviews(id) {
            const response = await reviewsAPI.getReviews(id);
            this.reviews = response.data;
            return this.reviews;
        },
        clearSummarizedReviews() {
            this.reviews = {
                pros: [],
                cons: [],
            }
            return this.reviews
        }
    },
});

export default useReviewsStore;
