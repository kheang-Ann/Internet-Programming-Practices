<template>
  <div class="category-view">
    <h1>{{ categoryName }}</h1>
    <p>This is a simple category view. You can add more content here.</p>
  </div>
</template>

<script>
export default {
  name: 'CategoryView',
  computed: {
    categoryName() {
      if (this.$route.name === 'HotDeals') {
        return 'Hot Deals';
      }
      return this.$route.params.name;
    }
  }
}
</script>

<style scoped>
.category-view {
  padding: 20px;
}
</style>