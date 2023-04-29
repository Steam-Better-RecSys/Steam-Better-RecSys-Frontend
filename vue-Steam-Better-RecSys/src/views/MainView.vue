<template>
  <search-header/>
  <filters-menu/>
  <main-card/>
  <history-footer/>
</template>

<script>
import SearchHeader from "@/components/SearchHeader.vue";
import FiltersMenu from "@/components/FiltersMenu.vue";
import MainCard from "@/components/MainCard.vue";
import HistoryFooter from "@/components/Footer.vue";

export default {
  components: {
    MainCard,
    SearchHeader,
    FiltersMenu,
    HistoryFooter
  }
}
</script>

<style scoped>

</style>