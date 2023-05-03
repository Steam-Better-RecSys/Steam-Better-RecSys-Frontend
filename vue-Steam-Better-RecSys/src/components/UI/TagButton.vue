<template>
    <input
            type="checkbox"
            class="btn-check"
            :id="tag.id"
            v-model="isSelected"
            @click="[!isSelected ? this.$emit('selectionEvent', tag.id): this.$emit('deletionEvent', tag.id)]"
    >

    <label :for="tag.id"
           class="btn btn-light btn-sm rounded-pill m-0"
    >
        {{ tag.name }}
    </label>
</template>

<script>
export default {
    name: "TagButton",
    props: {
        tag: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isSelected: false
        }
    },
    emits: ['selectionEvent', 'deletionEvent'],
}
</script>

<style scoped>

</style>