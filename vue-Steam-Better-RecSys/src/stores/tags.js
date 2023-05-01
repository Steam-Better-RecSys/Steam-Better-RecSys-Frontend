import { defineStore } from 'pinia';
import { tagsAPI } from '@/api';

const useTagsStore = defineStore('tags', {
    state: () => ({
        classes: [],
    }),
    actions: {
        async getAllTagsStore() {
            const response = await tagsAPI.getAllTags();
            this.classes = response.data;
            return this.classes;
        },
    },
});

export default useTagsStore;
