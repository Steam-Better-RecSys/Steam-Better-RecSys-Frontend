<template>
    <div class="px-4 py-2">
        <div class="d-flex flex-row">
            <div class="input-group mb-2">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Search by title..."
                    aria-label="Title"
                    v-model="searchString"
                    @change="sortAndFilter"
                />
            </div>
        </div>
        <div class="d-flex flex-row flex-wrap-reverse flex-md-nowrap">
            <div class="d-flex flex-column col-12 col-sm-12 col-md-2 mb-1">
                <p class="d-none d-sm-none d-md-block mb-0"><b>Sorting</b></p>
                <div class="mb-2 mt-1">
                    <div
                        class="btn-group btn-custom-vertical-group d-flex flex-column"
                        role="group"
                        v-for="option in sortOptions"
                    >
                        <input
                            type="radio"
                            class="btn-check"
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
                    <div>
                        <order-button @order-change="selectOrder" />
                    </div>
                    <!--                    <div class="btn-group w-50"-->
                    <!--                            role="group"-->
                    <!--                            v-for="order in orderOptions">-->
                    <!--                        <input-->
                    <!--                                type="radio"-->
                    <!--                                class="btn-check"-->
                    <!--                                autocomplete="off"-->
                    <!--                                :id="order.orderId"-->
                    <!--                                :checked="order.selected"-->
                    <!--                                @change="selectOrder(order.orderId)"-->
                    <!--                                name="btnRadioOrder"-->
                    <!--                        />-->
                    <!--                        <label-->
                    <!--                                class="btn btn-outline-primary custom-control-label"-->
                    <!--                                :for="order.orderId"-->
                    <!--                        >{{ order.name }}</label-->
                    <!--                        >-->
                    <!--                    </div>-->
                </div>
            </div>
            <div
                class="d-flex flex-column col-12 col-sm-12 col-md-10 mx-2 mb-1"
            >
                <p class="d-none d-sm-none d-md-block mb-0"><b>Filtering</b></p>
                <div class="mt-1">
                    <ul class="nav nav-tabs">
                        <li class="nav-item" v-for="tagClass in tagClasses">
                            <a
                                class="nav-link"
                                :class="{
                                    active: tagClass.id === this.idClass.id,
                                }"
                                :id="tagClass.id"
                                @click="selectClass(tagClass.id)"
                            >
                                {{ tagClass.name }}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="mt-2 d-flex flex-wrap" v-if="idClass">
                    <tag-button
                        :tag="tag"
                        v-for="tag in idClass.tags"
                        :isSelected="this.selectedTags.has(tag.id)"
                        :class="{ selected: this.selectedTags.has(tag.id) }"
                        @selection-event="selectTag"
                        @deletion-event="deleteTag"
                    />
                </div>
            </div>
        </div>
        <div class="d-flex flex-row mt-1">
            <div
                class="d-flex flex-column col-6 col-sm-6 col-md-2 pe-1 pe-sm-1 pe-md-0"
            >
                <button
                    type="button"
                    class="btn btn-primary"
                    @click="sortAndFilter"
                >
                    <font-awesome-icon icon="fas fa-magnifying-glass" />
                    Search
                </button>
            </div>
            <div class="d-none d-sm-none d-md-flex flex-column col-8">
                <div class="d-flex flex-row overflow-auto mx-2">
                    <div class="flex-shrink-0" v-for="tag in tags">
                        <tag-button
                            :tag="tag"
                            class="selected"
                            @selection-event="deleteTag"
                            @deletion-event="deleteTag"
                        />
                    </div>
                </div>
            </div>
            <div
                class="d-flex flex-column col-6 col-sm-6 col-md-2 ps-1 ps-sm-1 ps-md-0"
            >
                <button
                    type="button"
                    class="btn btn-primary"
                    v-if="selectedGames.length > 0"
                    @click="doMagic()"
                >
                    <font-awesome-icon icon="fas fa-wand-magic-sparkles" />
                    Do Magic
                </button>
            </div>
        </div>
        <hr />
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import useTagsStore from '@/stores/tags';
import useGamesStore from '@/stores/games';
import TagButton from '@/components/UI/TagButton.vue';
import ChosenTag from '@/components/UI/ChosenTag.vue';
import OrderButton from '@/components/UI/OrderButton.vue';

export default {
    components: {
        ChosenTag,
        TagButton,
        OrderButton,
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
            selectedSort: new Map(),
            selectedTags: new Map(),
            selectedOptions: [],
            searchString: null
        };
    },
    methods: {
        ...mapActions(useGamesStore, [
            'getFilteredGamesStore',
            'setSelectedGames',
        ]),
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
            this.selectedTags.set(id, 'tag');
            await this.getAllTagsById(this.selectedTags);
        },

        async deleteTag(id) {
            this.selectedTags.delete(id);
            await this.getAllTagsById(this.selectedTags);
        },

        selectSort(id) {
            this.selectedSort.set('sort', id);
        },

        selectOrder(id) {
            this.selectedSort.set('order', id);
        },

        async sortAndFilter() {
            await this.getFilteredGamesStore(
                this.selectedSort,
                this.selectedTags,
                this.searchString,
                0
            );
        },

        preset() {
            this.selectedSort.set('sort', 'title');
            this.selectedSort.set('order', 'asc');
        },

        async doMagic() {
            console.log(this.selectedGames);
            await this.setSelectedGames(this.selectedGames).then(() =>
                this.$router.push('/recommendation')
            );
        },
    },
    computed: {
        ...mapState(useTagsStore, ['tags']),
        ...mapState(useGamesStore, ['selectedGames']),
    },
    mounted() {
        this.preset();
        this.renderTags().then(() => this.selectClass(1));
    },
    beforeMount() {
        localStorage.removeItem('pinia_tags');
    },
};
</script>

<style scoped>
@import '../styles/main.css';

.nav-tabs .nav-link {
    cursor: pointer;
}

.nav-tabs .nav-link.active {
    cursor: default;
}
</style>
