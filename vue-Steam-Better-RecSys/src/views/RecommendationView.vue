<template>
  <search-header/>
  <div class="wrapper d-flex justify-center align-center flex-column">
    <div class="col-6 d-flex flex-row justify-content-center mt-2">
      <recommendation-card :name="recommendedGame.title" :description="recommendedGame.description" :image="recommendedGame.horizontalImageUrl"/>
    </div>
    <div class="col-6 d-flex flex-row justify-content-around mt-3">
      <button type="button" class="btn btn-primary">Blacklist</button>
      <button type="button" class="btn btn-primary">Dislike</button>
      <button type="button" class="btn btn-primary">Ignore</button>
      <button type="button" class="btn btn-primary">Like</button>
      <button type="button" class="btn btn-primary">Wishlist</button>
    </div>
  </div>
</template>

<script>
import RecommendationCard from "@/components/RecommendationCard.vue";
import SearchHeader from "@/components/SearchHeader.vue";
import {mapActions} from "pinia/dist/pinia";
import useGamesStore from "@/stores/games";

export default {
  name: "RecommendationView",
  components: {
    RecommendationCard,
    SearchHeader
  },
  data() {
    return {
      recommendedGame: null,
    }
  },
  methods: {
    ...mapActions(useGamesStore, ['getRecommendedGame', 'updateCurrentGameDescription']),
    async getGame() {
      this.recommendedGame = await this.getRecommendedGame()

      if (this.recommendedGame.description == null) {
        this.recommendedGame = await this.updateCurrentGameDescription()
        console.log(this.recommendedGame.description)
      }
    },
  },
  beforeMount() {
    this.getGame()
  }
}
</script>

<style scoped>

</style>