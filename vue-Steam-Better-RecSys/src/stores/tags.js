import {defineStore} from 'pinia';
import {tagsAPI} from '@/api';

const useTagsStore = defineStore('tags', {
    state: () => ({
        classes: [],
        tags: []
    }),
    actions: {
        async getAllTagsStore() {
            const response = await tagsAPI.getAllTags();
            this.classes = response.data;
            return this.classes;
        },

        async getAllTagsById(map) {
            let tags = []
            let response = null;
            for (let [key, _] of map) {
                response = await tagsAPI.getTagById(key)
                tags.push({id: response.data.id, name: response.data.name})
            }
            this.tags = tags
        }
    },
});

export default useTagsStore;
