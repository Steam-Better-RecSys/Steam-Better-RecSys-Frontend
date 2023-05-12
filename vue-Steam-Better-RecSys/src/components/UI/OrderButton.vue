<template>
    <div>
        <button
            type="button"
            class="btn btn-light"
            @click="toggle"
        >
            <font-awesome-icon icon="fas fa-arrow-down-wide-short" v-if="!isActive"/>
            <font-awesome-icon icon="fas fa-arrow-down-short-wide" v-if="isActive"/>
        </button>
    </div>
</template>

<script>
export default {
    name: 'OrderButton',
    data() {
        return {
            isActive: false,
        };
    },
    methods: {
        toggle() {
            !this.isActive
                ? this.$emit('orderChange', 'asc')
                : this.$emit('orderChange', 'desc');
            this.isActive = !this.isActive;
        },
    },
    emits: ['orderChange'],
};
</script>

<style scoped>
@import '../../styles/main.css';
</style>
