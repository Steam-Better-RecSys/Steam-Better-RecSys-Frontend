<template>
  <div class="main-container pa-8">
    <div class="wrapper pt-8" id="collapseSorting">
      <v-row class="row main-row">
        <!-- Sorting -->
        <v-col class="d-flex flex-column sort-col" cols="2">
          <p class="mb-1 font-weight-black">Sort by</p>
          <v-btn-toggle class="d-flex flex-column h-auto">
            <v-btn class="sort-btn">Name</v-btn>
            <v-btn class="sort-btn">Release date</v-btn>
            <v-btn class="sort-btn">User reviews</v-btn>
          </v-btn-toggle>
          <!--          <OrderButton  />-->
        </v-col>
        <!-- Filtering -->
        <v-col class="">
          <p class="mb-1 font-weight-black">Narrow by ...</p>
          <v-row class="v-row v-row-cols-1 v-row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-1">
            <!-- Systems -->
            <v-col class="" cols="4">
              <p class="mb-1">Game genre</p>
              <div class="">
                <GenreCheck style="display: inline-block; max-width:50%; width: 100%;"
                            v-for="genre in genres" :id="genre.id" :key="genre.id" :name="genre.name"/>
              </div>
            </v-col>

            <!-- Checkboxes -->
            <v-col class="" cols="2">
              <p class="mb-1">Language</p>
              <div class="d-flex flex-column justify-space-around">
                <LanguageCheck v-for="lang in languages" :id="lang.id" :key="lang.id" :name="lang.name"/>
              </div>
            </v-col>
            <!-- Container with Tags-->
            <v-col class="" cols="6">
              <div class="d-flex">
                <p id="tagsHeader" class="mb-3" >Tags: {{ selectedTags.size}}/3</p>
                <p v-if="selectedTags.size > 3" class="text-red ml-5">Delete some tags</p>
              </div>
              <div class="d-flex flex-row justify-space-between align-content-center flex-wrap">
                <TagButton v-for="tag in tags" :id="tag.id" :key="tag.id" :name="tag.name" @click="selectedTags" @setTag="selectOption(tag.id, tag.name)" />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import TagButton from "@/components/UI/TagButton.vue";
import LanguageCheck from "@/components/UI/LanguageCheck.vue";
import GenreCheck from "@/components/UI/GenreCheck.vue";

export default {
  components: {
    TagButton,
    LanguageCheck,
    GenreCheck,
  },
  data() {
    return {
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
      tags: [
        {
          name: 'Action',
          id: 1,
        },
        {
          name: 'Multiplayer',
          id: 2,
        },
        {
          name: 'Simulation',
          id: 3,
        },
        {
          name: 'Walking simulator',
          id: 4,
        },
        {
          name: 'Horror',
          id: 5,
        }
      ],
      languages: [
        {
          name: 'English',
          id: 1,
        },
        {
          name: 'Russian',
          id: 2,
        },
        {
          name: 'Spanish',
          id: 3,
        },
        {
          name: 'German',
          id: 4,
        },
      ],
      genres: [
        {
          name: 'Action',
          id: '1'
        },
        {
          name: 'Puzzle',
          id: '2'
        },
        {
          name: 'Adventure',
          id: '3'
        },
        {
          name: 'RPG',
          id: '4'
        },
        {
          name: 'Simulation',
          id: '5'
        },
        {
          name: 'Strategy',
          id: '6'
        },
      ],
      selectedTags: new Map(),
    }
  },
  methods: {
    selectOption(key, value) {
        this.selectedTags.has(key) ? this.selectedTags.delete(key) : this.selectedTags.set(key, value)
    }
  }
}
</script>

<style scoped>
.main-container {
  border-bottom: 2px solid slategrey;
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
  padding: 10px;
}

</style>