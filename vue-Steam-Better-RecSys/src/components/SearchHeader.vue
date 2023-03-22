<template>
  <v-app-bar class="pa-5" style="height: 10%; background: rgb(43,53,68); color: white">
    <v-app-bar-title>
      <v-text-field class="w-25 font-weight-black" label="search" variant="underlined"></v-text-field>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script>
import FiltersMenu from "@/components/FiltersMenu.vue";
export default {
  components: {
    FiltersMenu
  }
}
</script>

<style scoped>

</style>