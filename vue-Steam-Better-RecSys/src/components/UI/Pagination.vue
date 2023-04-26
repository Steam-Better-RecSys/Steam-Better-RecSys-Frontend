<template>
    <div class="pagination d-lg-inline-flex">
        <a href="#">&laquo;</a>
        <a href="#" class="active">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a href="#">&raquo;</a>
    </div>
</template>

<script>
export default {
    name: "Pagination"

}
</script>

<style scoped>
a{
    color: white;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
}

a.active{
    background-color: #6e4bc2;
    color: white;
    border-radius: 5px;
}

a:hover:not(.active) {
    background-color: #1B2228FF;
    border-radius: 5px;
}
</style>