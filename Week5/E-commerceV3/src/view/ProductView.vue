<script>
import Header_page from '@/components/Header_page.vue';
import Header_page1 from '@/components/Header_page1.vue';

export default {
  name: 'ProductView',
  components: {
    Header_page,
    Header_page1,
  },
  data() {
    return {
      productId: null,
      categoryName: null,
    }
  },
  mounted() {
    this.productId = this.$route.params.id;
    this.categoryName = this.$route.name === 'HotDeals' ? 'Hot Deals' : null;
  },
  watch: {
    '$route.params.id'(newId) {
      this.productId = newId;
    }
  }
};
</script>

<template>
  <div>
    <Header_page1 />
  </div>
  <hr>
  <div>
    <Header_page />
  </div>
  <hr>
  <img src="@/assets/routeimg.png" alt="" style="width: 100%;">
</template>

<style scoped>
.product-view-content {
  padding: 40px;
}

.product-container {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

h2 {
  color: #253D4E;
  margin-bottom: 20px;
}
</style>
