<template>
  <div class="">
    <input class="v-checkbox" type="checkbox" :id="this.id">
    <label class="v-label ml-2">{{ this.name }}</label>
  </div>
</template>

<script>
export default {
  name: "GenreCheckbox",
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      required: true,
    }
  }
}
</script>

<style scoped>

</style>