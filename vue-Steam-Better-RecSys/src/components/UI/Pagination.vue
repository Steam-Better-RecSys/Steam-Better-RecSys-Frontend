<template>
    <div class="d-flex align-center justify-content-center flex-row">
        <div class="pagination">
            <a href="#">&laquo;</a>
            <a href="#" class="active">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#">6</a>
            <a href="#">&raquo;</a>
        </div>
    </div>
</template>

<script>
import {mapState} from "pinia";
import useGamesStore from "@/stores/games";

export default {
    name: 'Pagination',
    methods: {
    },
    computed: {
        ...mapState(useGamesStore, ["games"]),
    }
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
}

a.active {
    background-color: #6e4bc2;
    color: white;
}

a:hover:not (.active) {
    background-color: #1b2228ff;
}
</style>
