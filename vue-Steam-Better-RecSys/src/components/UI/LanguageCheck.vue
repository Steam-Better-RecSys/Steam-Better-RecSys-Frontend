<template>
  <div class="d-flex align-center">
    <input class="v-checkbox" type="checkbox" :id="this.id">
    <label class="v-label ml-2" :for="this.id">{{this.name}}</label>
  </div>
</template>

<script>
export default {
  name: "LanguageCheckbox",
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      required: true
    },
  }
}
</script>

<style scoped>

</style>