<template>
  <div class="history pa-5">
    <h1>History of views</h1>
    <div class="d-flex justify-end align-baseline">
      <v-btn @click="$router.push({path:'/recommendation'})">Generate</v-btn>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.history{
  box-shadow:  0 0 10px slategrey;
  background: rgb(43,53,68);
  height: 200px;
}
</style>