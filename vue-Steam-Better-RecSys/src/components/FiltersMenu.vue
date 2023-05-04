<template>
    <div class="px-4 py-2">
        <div class="d-flex flex-row flex-wrap-reverse flex-md-nowrap">
            <div class="d-flex flex-column col-12 col-sm-12 col-md-2">
                <p class="d-none d-sm-none d-md-block mb-1"><b>Sorting</b></p>
                <div class="mb-2">
                    <div
                        class="btn-group d-flex flex-column"
                        role="group"
                        v-for="option in sortOptions"
                    >
                        <input
                            type="radio"
                            class="btn-check btn-primary"
                            name="btnRadioSort"
                            :checked="option.selected"
                            autocomplete="off"
                            :id="option.sortId"
                            @change="selectSort(option.sortId)"
                        />
                        <label
                            class="btn btn-outline-primary custom-control-label border-0"
                            :for="option.sortId"
                        >{{ option.name }}</label
                        >
                    </div>
                </div>
                <div>
                    <div
                        class="btn-group w-50"
                        role="group"
                        v-for="order in orderOptions"
                    >
                        <input
                            type="radio"
                            class="btn-check"
                            autocomplete="off"
                            :id="order.orderId"
                            :checked="order.selected"
                            @change="selectOrder(order.orderId)"
                            name="btnRadioOrder"
                        />
                        <label
                            class="btn btn-outline-primary custom-control-label"
                            :for="order.orderId"
                        >{{ order.name }}</label
                        >
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column col-12 col-sm-12 col-md-10 mx-2">
                <p class="d-none d-sm-none d-md-block mb-1"><b>Filtering</b></p>
                <div>
                    <ul class="nav nav-tabs">
                        <li class="nav-item" v-for="tagClass in tagClasses">
                            <a class="nav-link" :class="{ 'active': tagClass.id === this.idClass.id }" :id="tagClass.id" @click="selectClass(tagClass.id)"> {{ tagClass.name }} </a>
                        </li>
                    </ul>
                </div>
                <div class="mt-2 d-flex flex-wrap" v-if="idClass">
                    <tag-button :tag="tag"
                                v-for="tag in idClass.tags"
                                :isSelected=this.selectedTags.has(tag.id)
                                :class="{ 'selected': this.selectedTags.has(tag.id) }"
                                @selection-event="selectTag"
                                @deletion-event="deleteTag"
                    />
                </div>
            </div>
        </div>
        <div class="d-flex flex-row mt-3">
            <div class="d-flex flex-column col-6 col-sm-6 col-md-2">
                <button
                    type="button"
                    class="btn btn-primary"
                    @click="sortAndFilter"
                >
                    <font-awesome-icon icon="fas fa-magnifying-glass" />
                    Search
                </button>
            </div>
            <div class="d-none d-sm-none d-md-flex flex-row col-8 overflow-auto mx-2">
                <div class="flex-shrink-0"  v-for="tag in tags">
                    <tag-button :tag="tag"
                                class="selected"
                                @selection-event="deleteTag"
                                @deletion-event="deleteTag"
                    />
                </div>
            </div>
            <div class="d-flex flex-column col-6 col-sm-6 col-md-2">
                <button type="button" class="btn btn-primary">
                    <font-awesome-icon icon="fas fa-wand-magic-sparkles" />
                    Do Magic
                </button>
            </div>
        </div>
        <hr/>
    </div>
</template>

<script>
import {mapActions, mapState} from 'pinia';
import useTagsStore from '@/stores/tags';
import useGamesStore from '@/stores/games';
import TagButton from "@/components/UI/TagButton.vue";
import ChosenTag from "@/components/UI/ChosenTag.vue";

export default {
    components: {
        ChosenTag,
        TagButton,
    },
    data() {
        return {
            tagClasses: [],
            idClass: 0,
            sortOptions: [
                {
                    name: 'Name',
                    sortId: 'title',
                    selected: true,
                },
                {
                    name: 'Release date',
                    sortId: 'releaseDate',
                    selected: false,
                },
                {
                    name: 'User Reviews',
                    sortId: 'reviews',
                    selected: false,
                },
            ],
            orderOptions: [
                {
                    name: 'ASC',
                    orderId: 'asc',
                    selected: true,
                },
                {
                    name: 'DESC',
                    orderId: 'desc',
                    selected: false,
                },
            ],
            selectedSort: new Map(),
            selectedTags: new Map(),
            selectedOptions: [],
        };
    },
    methods: {
        ...mapActions(useGamesStore, ['getFilteredGamesStore']),
        ...mapActions(useTagsStore, ['getAllTagsStore', 'getAllTagsById']),

        async renderTags() {
            this.tagClasses = await this.getAllTagsStore();
            this.clearSelect();
        },

        selectClass(id) {
            this.tagClasses.find((tagClass) => tagClass.id === id).isSelected =
                !this.tagClasses.find((tagClass) => tagClass.id === id)
                    .isSelected;
            this.idClass = this.tagClasses.find(
                (tagClass) => tagClass.id === id
            );
        },

        clearSelect() {
            for (let tagClass in this.tagClasses) {
                this.tagClasses[tagClass].isSelected = false;
            }
        },

        async selectTag(id) {
            console.log('selection')
            this.selectedTags.set(id, 'tag')
            await this.getAllTagsById(this.selectedTags)
        },

        async deleteTag(id) {
            console.log('deletion')
            this.selectedTags.delete(id)
            await this.getAllTagsById(this.selectedTags)
        },

        selectSort(id) {
            this.selectedSort.set('sort', id);
        },

        selectOrder(id) {
            this.selectedSort.set('order', id);
        },

        async sortAndFilter() {
            await this.getFilteredGamesStore(this.selectedSort, this.selectedTags);
        },

        preset() {
            this.selectedSort.set('sort', 'title')
            this.selectedSort.set('order', 'asc')
        }
    },
    computed: {
        ...mapState(useTagsStore, ['tags']),
    },
    mounted() {
        this.preset()
        this.renderTags().then(
            res => {
                this.selectClass(1)
            }
        )
    },
    beforeMount() {
        localStorage.removeItem('pinia_tags')
    },
};
</script>

<style scoped>
@import '../styles/main.css';

a:hover {
    color: var(--light-theme-color)
}
</style>
