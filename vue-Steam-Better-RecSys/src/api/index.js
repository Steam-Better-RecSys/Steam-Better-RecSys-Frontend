import instance from "./instance"
import GamesAPI from "@/api/games"
import RecommendationsAPI from "@/api/recommendations"
import TagsAPI from "@/api/tags"

const recommendationsAPI = new GamesAPI(instance)
const gamesAPI = new RecommendationsAPI(instance)
const tagsAPI = new TagsAPI(instance)

export {
    recommendationsAPI,
    gamesAPI,
    tagsAPI
}
