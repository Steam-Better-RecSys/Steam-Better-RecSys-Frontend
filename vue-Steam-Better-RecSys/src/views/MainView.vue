<template>
  <div class="body">
      <search-header/>
      <filters-menu class="filters"/>
    <main-card/>
    <history-footer/>
  </div>
</template>

<script>
import SearchHeader from "@/components/SearchHeader.vue";
import FiltersMenu from "@/components/FiltersMenu.vue";
import MainCard from "@/components/MainCard.vue";
import HistoryFooter from "@/components/HistoryFooter.vue";
export default {
  components:{
    MainCard,
    SearchHeader,
    FiltersMenu,
    HistoryFooter
  }
}
</script>

<style scoped>
.body{
  background: rgb(37, 46, 59);
}


</style>