<template>
  <div :class="{ 'container': !isBig, 'container_big': isBig }">
    <img :src="image" />
    <h3 v-if="!isBig">{{ title }}</h3>
    <h2 v-else>{{ title }}</h2>
    <span class="count" v-if="productCount > 0 && !isBig">{{ productCount }} items</span>
    <span v-else-if="isBig">{{ productCount }}</span>
  </div>
</template>

<script>
export default {
  name: 'CategoryComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
    productCount: {
      type: Number,
      default: 0,
    },
    image: {
      required: true,
    },
    bgColor: {
      type: String,
      default: '#81b13d99'
    },
    isBig: {
      type: Boolean,
      default: false,
    }
  },
}
</script>

<style scoped>
.container, .container_big {
  border: 1px solid #81b13d;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: v-bind(bgColor);
}

.container_big {
  /* Specific styles for the big container if any, otherwise remove this block */
}

.count {
  color: #818080;
  font-size: 12px;
}
</style>