<template>
    <input type="checkbox" class="btn-check" :id="tag.id"
           @click="this.$emit('deleteSelected', tag.id)"
    >
    <label class="btn btn-light btn-sm rounded-pill m-0" :for="tag.id">
        {{ tag.name }}
    </label>
</template>

<script>
export default {
    name: "ChosenTag",
    props: {
        tag: {
            type: Object,
            required: true,
        }
    },
    emits: ['deleteSelected']
}
</script>

<style scoped>

</style>