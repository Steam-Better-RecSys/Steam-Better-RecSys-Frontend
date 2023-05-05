<template>
    <div>
        <button type="button" class="btn btn-light w-100 v-btn-toggle" @click="toggle">
            {{ isActive ? 'ASC' : 'DESC' }}
        </button>
    </div>
</template>

<script>
export default {
    name: "OrderButton",
    data() {
        return {
            isActive: true,
        }
    },
    methods: {
        toggle() {
            !this.isActive ? this.$emit('orderChange', 'asc') : this.$emit('orderChange', 'desc')
            this.isActive = !this.isActive
        },
    },
    emits: ['orderChange']
}
</script>

<style scoped>

</style>