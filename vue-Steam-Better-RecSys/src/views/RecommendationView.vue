<template>
  <div class="wrapper d-flex justify-center align-center flex-column">
    <recommendation-card :name="recommendedGames"/>
    <v-btn class="mt-7" @click="$router.push({path: '/'})">Get back</v-btn>
  </div>
</template>

<script>
import RecommendationCard from "@/components/RecommendationCard.vue";
import {mapActions, mapState} from "pinia/dist/pinia";
import useGamesStore from "../stores/games";

export default {
  name: "RecommendationView",
  components: {RecommendationCard},
  computed: {
    ...mapState(useGamesStore, ['recommendedGames']),
  },
  methods: {
    ...mapActions(useGamesStore, ['getRecommendedGames']),
  },
  mounted() {
    this.getRecommendedGames()
  }
}
</script>

<style scoped>
.wrapper{
  width: 100%;
  height: 100%;
  background: rgb(43,53,68);
}
</style>