import instance from "./instance"
import GamesAPI from "./games"
import TagsAPI from "@/api/tags";

const recommendationsAPI = new GamesAPI(instance);
const tagsAPI = new TagsAPI(instance);

export {
    recommendationsAPI,
    tagsAPI
}
