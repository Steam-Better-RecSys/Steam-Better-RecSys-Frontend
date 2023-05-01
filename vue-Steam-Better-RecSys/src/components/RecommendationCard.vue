<template>
  <div class="card pa-5">
    <img class="card-img-top" :src="image" :alt="name">
    <div class="card-body pb-0">
      <h1><a :href=getSteamLink> {{ name }} </a></h1>
      <p v-html="description"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendationCard",
  props: {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    nameSlug: {
      type: String
    },
    gameId: {
      type: Number
    }
  },
  computed: {
    getSteamLink() {
      return "https://store.steampowered.com/app/" + this.gameId + "/" + this.nameSlug
    }
  }
}
</script>

<style scoped>
.card {
  background: var(--bg-color);
  border: 5px solid var(--additional-bg-color);
  border-radius: 30px;
  color: var(--main-text-color);
  width: 40rem;
}

img {
  border-radius: 20px;
}

a {
  text-decoration: None;
  color: var(--main-theme-color)
}
</style>