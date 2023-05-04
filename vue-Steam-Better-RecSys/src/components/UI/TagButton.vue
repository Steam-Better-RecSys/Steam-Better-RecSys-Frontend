<template>
    <div class="mx-2 mt-1">
        <!--
        <input
                type="checkbox"
                class="btn-check"
                :id="tag.id"
                v-model="isSelected"
                @click="[!isSelected ? this.$emit('selectionEvent', tag.id): this.$emit('deletionEvent', tag.id)]"
        >
        <label :for="tag.id"
               class="btn btn-light btn-sm rounded-pill m-0 custom-control-label"
        >
            {{ tag.name }}
        </label>
        -->
        <button class="btn btn-light btn-sm rounded-pill m-0" :id="tag.id" @click="[!isSelected ? this.$emit('selectionEvent', tag.id): this.$emit('deletionEvent', tag.id)]"> {{ tag.name }} </button>
    </div>
</template>

<script>
export default {
    name: "TagButton",
    props: {
        tag: {
            type: Object,
            required: true
        },
        isSelected: {
            type: Boolean
        }
    },
    emits: ['selectionEvent', 'deletionEvent'],
}
</script>

<style scoped>
.btn-light {
    color: var(--main-text-color);
    background-color: var(--additional-bg-color);
    border-color: var(--additional-bg-color);
}

.btn-light:hover, .selected .btn-light:hover {
    color: var(--contast-text-color);
    background: var(--dark-theme-color);
    border-color: var(--dark-theme-color);
}

.selected .btn {
    color: var(--contast-text-color);
    background: var(--light-theme-color);
    border-color: var(--light-theme-color);
}

.btn-light:focus {
    box-shadow: none;
}

.btn-light:active:focus {
    color: var(--contast-text-color);
    background: var(--dark-theme-color);
    border-color: var(--dark-theme-color);
    box-shadow: none;
}
</style>