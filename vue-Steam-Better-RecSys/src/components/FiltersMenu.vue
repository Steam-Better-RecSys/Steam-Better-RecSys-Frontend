<template>
  <div class="main-container px-4 py-2">
    <div class="wrapper" id="collapseSorting">
      <div>
        <v-row class="row main-row">
          <!-- Sorting -->
          <v-col class="d-flex flex-column sort-col" cols="2">
            <p class="mb-1 font-weight-black">Sorting</p>
            <v-btn-toggle class="d-flex flex-column h-auto">
              <v-btn class="sort-btn">Name</v-btn>
              <v-btn class="sort-btn">Release date</v-btn>
              <v-btn class="sort-btn">User reviews</v-btn>
            </v-btn-toggle>
            <!-- <OrderButton  />-->
          </v-col>
          <!-- Filtering -->
          <v-col class="">
            <p class="mb-1 font-weight-black">Filtering</p>
            <div class="btn-group mr-1 mb-3" role="group" v-for="tagClass in tagClasses">
              <input type="radio" class="btn-check" name="btnradio" :id="tagClass.id" autocomplete="off"
                     @change="selectClass(tagClass.id)">
              <label class="btn btn-outline-primary custom-control-label" :for="tagClass.id">{{ tagClass.name }}</label>
            </div>

            <!--
            <div class="btn-group mb-4" v-for="tagClass in tagClasses">
                <input type="button" class="btn-check" :id="tagClass.id" autocomplete="off"
                       @click="selectClass(tagClass.id)">
                <label class="btn btn-outline-primary" :class="[tagClass.isSelected ? 'active' : '']"
                       :for="tagClass.id"
                >{{ tagClass.name }}</label>

            </div>
            -->

            <div class="tags d-flex" v-if="idClass">
              <button type="button" v-for="tag in idClass.tags" class="btn btn-light btn-sm rounded-pill m-0">
                {{ tag.name }}
              </button>
            </div>
          </v-col>
          <div class="col-12 d-flex justify-content-between mt-0 mb-1">
            <button type="button" class="btn btn-primary">
              Sort & Filter
            </button>
            <button type="button" class="btn btn-primary">
              Do Magic
            </button>
          </div>
        </v-row>
        <hr>
      </div>
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
      // this.clearSelect();

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
@import "../styles/main.css";

.main-container {
  color: var(--main-text-color);
}

.main-row {
  height: auto;
}

.sort-col {

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

</style>