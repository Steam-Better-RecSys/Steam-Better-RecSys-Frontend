<template>
  <div class="card pa-5">
    <div class="wrapper d-flex justify-space-between align-center">
      <div class="left-slide d-flex flex-row justify-center align-center">
        Dislike
      </div>
      <div class="right-slide d-flex justify-center align-center">
        Like
      </div>
    </div>
    <div class="d-flex justify-center mb-3">
      <img src="src/assets/hero.avif" alt="">
    </div>

    <h1>Cult of the Lamb</h1>
    <p>Cultivate your own cult in the lands of false prophets, travel through the mysterious corners of the forest,
      gather loyal followers around you and spread your word to the masses to make your cult the only one.</p>

  </div>

</template>

<script>
export default {
  name: "RecommendationCard"

}
</script>

<style scoped>
.card {
  height: 62%;
  width: 50%;
  background: rgb(37, 46, 59);
  border: 1px solid slategrey;
  border-radius: 30px;
  color: white
}

img {
  height: 10% !important;
  width: 100%;
  border-radius: 20px;
}

.wrapper{
  position: absolute;
  width: 47.6%;
  height: 57.5%;
}

.left-slide {
  background: none;
  opacity: 0;
  width: 15%;
  height:100% ;
}

.left-slide:hover {
  background: rgba(112, 128, 144, 0.5);
  transition: ease-out 0.3s;
  color: red;
  font-size: 20px;
  font-weight: bold;
  opacity: 1;
}

.right-slide{
  height: 100%;
  width: 15%;
  background: none;
  opacity: 0;
}

.right-slide:hover {
  background: rgba(112, 128, 144, 0.5);
  transition: ease-out 0.3s;
  color: red;
  font-size: 20px;
  font-weight: bold;
  opacity: 1;
}
</style>