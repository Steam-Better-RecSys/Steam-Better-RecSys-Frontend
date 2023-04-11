import instance from "./instance"
import RecommendationsAPI from "./recommendations";

const recommendationsAPI = new RecommendationsAPI(instance)

export {
    recommendationsAPI
}
