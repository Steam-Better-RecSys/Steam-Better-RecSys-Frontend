<template>
  <div class="wrapper d-flex justify-center align-center flex-column">
    <recommendation-card />
    <v-btn class="mt-7" @click="$router.push({path: '/'})">Get back</v-btn>
  </div>
</template>

<script>
import RecommendationCard from "@/components/RecommendationCard.vue";

export default {
  name: "RecommendationView",
  components: {RecommendationCard},
  methods: {

  },
  mounted() {
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