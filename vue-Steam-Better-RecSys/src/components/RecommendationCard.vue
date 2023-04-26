<template>
  <div class="d-flex justify-center align-content-center">
    <div class="left-panel h-100 d-flex justify-center align-center flex-column pa-4">
      <v-btn class="button dislike rounded-t-pill w-100">
        <v-icon class="mr-2" icon="far fa-thumbs-down"/>
        Dislike
      </v-btn>
      <v-btn class="ban rounded-b-pill w-100">
        <v-icon class="mr-2" icon="fas fa-ban"/>
        Block
      </v-btn>
    </div>
    <div class="wrapper">
      <div class="card pa-8">
        <div class="img-wrapper d-flex justify-center mb-3">
          <img src="../assets/hero.avif" alt="">
        </div>
        <div class="desc-wrapper">
          <h1>{{ name }}</h1>
          <p>Cultivate your own cult in the lands of false prophets, travel through the mysterious corners of the
            forest,
            gather loyal followers around you and spread your word to the masses to make your cult the only one.</p>
        </div>
      </div>
    </div>
    <div class="right-panel h-100 d-flex justify-center align-center flex-column pa-4">
      <v-btn class="button dislike rounded-t-pill w-100">
        Like
        <v-icon class="ml-2" icon="far fa-thumbs-up"/>
      </v-btn>
      <v-btn class="ban rounded-b-pill w-100">
        Wishlist
        <v-icon class="ml-2" icon="far fa-heart"/>
      </v-btn>
    </div>
  </div>
  <div>
    <v-btn class="rounded-pill">
      Skip
      <v-icon icon="fas fa-forward" class="ml-2"></v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "RecommendationCard",
  props: {
    name: {
      type: String
    }
  }
}
</script>

<style scoped>
.card {
  background: rgb(37, 46, 59);
  border: 1px solid slategrey;
  border-radius: 30px;
  color: white;
  width: fit-content;
  height: fit-content;
}

.img-wrapper {
  width: auto;
  height: auto;
}

img {
  max-width: 100%;
  max-height: 100%;
}

.wrapper {
  width: 50%;
  height: 50%;
}

.left-panel, .right-panel {
  width: 200px;
}

</style>