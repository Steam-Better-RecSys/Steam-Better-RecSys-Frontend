<template>
    <div class="main-container px-4 py-2">
        <div class="wrapper" id="collapseSorting">
            <div>
                <table class="w-100">
                    <tr>
                        <th width="15%">
                            <p class="mb-1 font-weight-black">Sorting</p>
                        </th>
                        <th>
                            <p class="mb-1 font-weight-black">Filtering</p>
                        </th>
                    </tr>
                    <tr class="">
                        <td height="200px" class=" py-4 align-top pa-5">
                            <div class="mb-4">
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
                                            class="btn btn-outline-primary custom-control-label"
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
                                            class="btn-check btn-primary w-33"
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
                        </td>
                        <td class="pt-4 d-flex flex-column justify-start">
                            <div>
                                <div
                                        class="btn-group mr-1"
                                        role="group"
                                        v-for="tagClass in tagClasses"
                                >
                                    <input
                                            type="radio"
                                            class="btn-check filtering"
                                            name="btnradio"
                                            :id="tagClass.id"
                                            autocomplete="off"
                                            @change="selectClass(tagClass.id)"
                                    />
                                    <label
                                            class="btn btn-outline-primary custom-control-label"
                                            :for="tagClass.id"
                                    >{{ tagClass.name }}</label>
                                </div>
                            </div>

                            <div class="tags d-flex mt-3" v-if="idClass">
                                <tag-button :tag="tag"
                                            v-for="tag in idClass.tags"
                                            @selection-event="selectTag"
                                            @deletion-event="deleteTag"
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="12" class="pt-7">
                            <div
                                    class="col-12 d-flex justify-content-between mt-0 mb-1"
                            >
                                <div class="w-50 d-flex align-center">
                                    <div
                                            class="w-25 d-flex justify-content-between align-center"
                                    >
                                        <button
                                                type="button"
                                                class="btn btn-primary"
                                                @click="sortAndFilter"
                                        >
                                            Sort & Filter
                                        </button>
                                        <span>You chose:</span>
                                    </div>
                                    <div>
                                       <chosen-tag :tag="tag" v-for="tag in tags" @delete-selected="deleteTag"/>
                                    </div>
                                </div>

                                <button type="button" class="btn btn-primary">
                                    Do Magic
                                </button>
                            </div>
                        </td>
                    </tr>
                </table>
                <hr/>
            </div>
        </div>
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
            idClass: null,
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
        this.renderTags();
        this.preset()
    },
    beforeMount() {
        localStorage.removeItem('pinia_tags')
    }
};
</script>

<style scoped>
@import '../styles/main.css';

.main-container {
    color: var(--main-text-color);
}

.tags {
    flex-wrap: wrap;
    gap: 20px;
}
</style>
