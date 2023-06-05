import instance from './instance';
import GamesAPI from '@/api/games';
import RecommendationsAPI from '@/api/recommendations';
import TagsAPI from '@/api/tags';
import ReviewsAPI from '@/api/reviews';

const recommendationsAPI = new RecommendationsAPI(instance);
const reviewsAPI = new ReviewsAPI(instance);
const gamesAPI = new GamesAPI(instance);
const tagsAPI = new TagsAPI(instance);

export { recommendationsAPI, gamesAPI, tagsAPI, reviewsAPI };
