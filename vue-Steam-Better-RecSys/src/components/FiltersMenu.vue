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
                        <td height="200px" class="pr-7 py-4 align-top">
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
                                        >{{ tagClass.name }}</label
                                    >
                                </div>
                            </div>

                            <div class="tags d-flex mt-3" v-if="idClass">
                                <button
                                    type="button"
                                    v-for="tag in idClass.tags"
                                    class="btn btn-light btn-sm rounded-pill m-0"
                                    @click="selectTag(tag.id)"
                                >
                                    {{ tag.name }}
                                </button>
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
                                        <span
                                            v-for="option in selectedOptions"
                                            >{{ option }}</span
                                        >
                                    </div>
                                </div>

                                <button type="button" class="btn btn-primary">
                                    Do Magic
                                </button>
                            </div>
                        </td>
                    </tr>
                </table>
                <hr />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import useTagsStore from '@/stores/tags';
import useGamesStore from '@/stores/games';

export default {
    components: {},
    data() {
        return {
            tagClasses: [],
            idClass: null,
            sortOptions: [
                {
                    name: 'Name',
                    sortId: 'title',
                },
                {
                    name: 'Release date',
                    sortId: 'releaseDate',
                },
                {
                    name: 'User Reviews',
                    sortId: 'reviews',
                },
            ],
            orderOptions: [
                {
                    name: 'ASC',
                    orderId: 'asc',
                },
                {
                    name: 'DESC',
                    orderId: 'desc',
                },
            ],
            selectedOptions: new Map(),
        };
    },
    methods: {
        ...mapActions(useGamesStore, ['getFilteredGamesStore']),
        ...mapActions(useTagsStore, ['getAllTagsStore', 'updateOptionsState']),

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

        selectTag(id) {
            this.selectedOptions.set(id, 'tag');
        },

        selectSort(id) {
            this.selectedOptions.set(id, 'sort');
        },

        selectOrder(id) {
            this.selectedOptions.set(id, 'order');
        },

        async sortAndFilter() {
            await this.getFilteredGamesStore(this.selectedOptions);
            this.selectedOptions = new Map();
        },
    },
    computed: {
        ...mapState(useTagsStore, ['tags']),
    },
    mounted() {
        this.renderTags();
    },
};
</script>

<style scoped>
@import '../styles/main.css';

.main-container {
    color: var(--main-text-color);
}

.main-row {
    height: auto;
}

.sort-col {
}

.tags {
    flex-wrap: wrap;
    gap: 20px;
}
</style>
