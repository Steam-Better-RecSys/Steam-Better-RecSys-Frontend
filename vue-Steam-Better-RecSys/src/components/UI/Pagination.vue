<template>
    <div class="d-flex align-center justify-content-center flex-row mt-auto mb-2">
        <div class="pagination">
            <a @click="getPrevPage" :aria-disabled="!this.currentPage>1">&laquo;</a>
            <a class="page" v-for="page in pages" @click="sendPage(page)">{{ page }}</a>
            <a @click="getNextPage" :aria-disabled="this.currentPage < this.pages.length-1">&raquo;</a>
        </div>
    </div>
</template>

<script>
import {mapState} from "pinia";
import useGamesStore from "@/stores/games";

export default {
    name: 'Pagination',
    data() {
        return {
            currentPage: 1,
        }
    },
    methods: {
        sendPage(page) {
            this.$emit('pageChange', (page - 1) * 50)
            this.currentPage = page
        },
        getNextPage() {
            this.currentPage++
            this.sendPage(this.currentPage)
        },
        getPrevPage() {
            this.currentPage--
            this.sendPage(this.currentPage)
        }
    },
    computed: {
        ...mapState(useGamesStore, ["pages"]),
    },
    emits: ['pageChange'],
};
</script>

<style scoped>
a {
    color: var(--light-theme-color);
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 5px;
}

a:hover {
    background: var(--light-theme-color);
    color: var(--contast-text-color);
    cursor: pointer;
}

a.page {
    background-color: #6e4bc2;
    color: white;
}

a:hover:not (.active) {
    background-color: #1b2228ff;
}
</style>
