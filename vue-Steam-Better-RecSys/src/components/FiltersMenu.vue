<template>
    <div class="main-container pa-8">
        <div class="wrapper pt-8" id="collapseSorting">
            <v-row class="row main-row">
                <!-- Sorting -->
                <v-col class="d-flex flex-column sort-col pa-6" cols="2">
                    <p class="mb-1 font-weight-black">Sort by</p>
                    <v-btn-toggle class="d-flex flex-column h-auto">
                        <v-btn class="sort-btn">Name</v-btn>
                        <v-btn class="sort-btn">Release date</v-btn>
                        <v-btn class="sort-btn">User reviews</v-btn>
                    </v-btn-toggle>
                    <!--          <OrderButton  />-->
                </v-col>
                <!-- Filtering -->
                <v-col class="pa-6">
                    <p class="mb-1 font-weight-black">Narrow by ...</p>
                    <div class="btn-group mb-4" v-for="tagClass in tagClasses">
                        <input type="button" class="btn-check" :id="tagClass.id" autocomplete="off"
                               @click="selectClass(tagClass.id)">
                        <label class="btn btn-outline-primary" :class="[tagClass.isSelected ? 'active' : '']"
                               :for="tagClass.id"
                        >{{ tagClass.name }}</label>

                    </div>
                    <div class="tags d-flex" v-if="idClass">
                        <button type="button" v-for="tag in idClass.tags" class="btn rounded-pill btn-light">
                            {{ tag.name }}
                        </button>
                    </div>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import TagButton from "@/components/UI/TagButton.vue";
import LanguageCheck from "@/components/UI/LanguageCheck.vue";
import GenreCheck from "@/components/UI/GenreCheck.vue";
import {mapActions} from "pinia";
import useTagsStore from "@/stores/tags";

export default {
    components: {
        TagButton,
        LanguageCheck,
        GenreCheck,
    },
    data() {
        return {
            tagClasses: [],
            idClass: null,
            sortOptions: [
                {
                    name: 'Name',
                    id: 1,
                    state: 0,
                },
                {
                    name: 'Release date',
                    id: 2,
                    state: 0,
                }
            ],
            selectedTags: new Map(),
        }
    },
    methods: {
        ...mapActions(useTagsStore, ['getAllTagsStore']),

        async renderTags() {
            this.tagClasses = await this.getAllTagsStore();

            this.clearSelect();

            console.log(this.tagClasses)
        },

        selectClass(id) {
            this.clearSelect();


            this.tagClasses.find(tagClass => tagClass.id === id).isSelected = !this.tagClasses.find(tagClass => tagClass.id === id).isSelected
            this.idClass = this.tagClasses.find(tagClass => tagClass.id === id);

            console.log(this.tagClasses.find(tagClass => tagClass.id === id))
            console.log(this.idClass)
        },

        clearSelect() {
            for (let tagClass in this.tagClasses) {
                this.tagClasses[tagClass].isSelected = false;
            }
        },

        selectOption(key, value) {
            this.selectedTags.has(key) ? this.selectedTags.delete(key) : this.selectedTags.set(key, value)
        }
    },
    mounted() {
        this.renderTags();
    }
}
</script>

<style scoped>
.main-container {
    box-shadow: 0 1px 10px slategrey;
    color: white;
}

.main-row {
    height: auto;
}

.sort-col {
    border-right: 1px solid slategrey;
}

.sort-btn {
    background: rgb(32, 40, 51);
    border-radius: 20px !important;
    color: white;
    margin-bottom: 10px;
    margin-top: 10px;
    padding: 12px;
}

.tags {
    flex-wrap: wrap;
    gap: 20px;
}

.btn{

}

</style>