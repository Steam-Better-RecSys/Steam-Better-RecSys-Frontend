import instance from "./instance"
import GamesAPI from "./games"
import TagsAPI from "@/api/tags";

const gamesAPI = new GamesAPI(instance);
const tagsAPI = new TagsAPI(instance);

export {
    gamesAPI,
    tagsAPI
}
