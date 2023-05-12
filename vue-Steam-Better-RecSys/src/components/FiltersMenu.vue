<template>
    <div class="px-4 py-2">
        <div class="row mb-2">
            <div class="col-6">
                <div class="input-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Search by title..."
                        aria-label="Search"
                        v-model="searchString"
                        @change="sortAndFilter"
                    />
                </div>
            </div>
            <div  class="col-6">
                <div class="input-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Get your games by profile link or steamid..."
                        aria-label="Username"
                        v-model="usernameString"
                        @change="sortAndFilter"
                    />
                </div>
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
                    <order-button @order-change="selectOrder" />
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
                tabindex="0"
                title="Firstly, select games to get recommendations"
                @mouseenter="updateTooltipTitle($event.currentTarget)"
            >
                <button
                    type="button"
                    class="btn btn-primary"
                    :class="{ disabled: selectedGames.length === 0 }"
                    @click="doMagic($event.currentTarget)"
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
import { Tooltip } from 'bootstrap';

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
                    name: 'Reviews',
                    sortId: 'reviews',
                    selected: true,
                },
                {
                    name: 'Name',
                    sortId: 'title',
                    selected: false,
                },
                {
                    name: 'Release Date',
                    sortId: 'releaseDate',
                    selected: false,
                },
            ],
            selectedSort: new Map(),
            selectedTags: new Map(),
            selectedOptions: [],
            searchString: null,
            usernameString: null
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
                this.usernameString,
                0
            );
        },

        preset() {
            this.selectedSort.set('sort', 'reviews');
            this.selectedSort.set('order', 'desc');
        },

        async doMagic() {
            await this.setSelectedGames(this.selectedGames).then(() =>
                this.$router.push('/recommendation')
            );
        },

        updateTooltipTitle(el) {
            if (this.selectedGames.length === 0) {
                el.setAttribute(
                    'data-bs-original-title',
                    'Firstly, choose games'
                );
            } else {
                el.setAttribute(
                    'data-bs-original-title',
                    'Get recommendations based on your choices'
                );
            }
        },
    },
    computed: {
        ...mapState(useTagsStore, ['tags']),
        ...mapState(useGamesStore, ['selectedGames']),
    },
    mounted() {
        this.preset();
        this.renderTags().then(() => this.selectClass(1));
        new Tooltip(document.body, {
            selector: "[data-bs-toggle='tooltip']",
            trigger: "hover"
        });
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
