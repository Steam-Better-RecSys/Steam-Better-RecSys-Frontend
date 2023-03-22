<template>
  <button type="button" class="rounded-pill pa-2"
          :class="{'active': isActive, 'bg-blue': isActive, 'bg-grey': !isActive }" @click="setActive" :value="this.name">{{ this.name }}
  </button>
</template>

<script>
export default {
  name: "TagButton",
  data() {
    return {
      isActive: false,
    }
  },
  emits:[
    'setTag'
  ],
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      required: true
    }
  },
  methods: {
    setActive() {
        this.isActive = !this.isActive;
        this.$emit('setTag', this.id, 'tag')
    }
  }

}
</script>

<style scoped>

</style>