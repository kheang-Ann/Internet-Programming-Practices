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
  <div class="product-view-content">
    <h2 v-if="categoryName">{{ categoryName }}</h2>
    <h2 v-else>Product View</h2>
    <p v-if="productId">Product/Category ID: {{ productId }}</p>
    <p v-else>Browse all products</p>

    <!-- Add your product display logic here -->
    <div class="product-container">
      <p>This is where you'll display your products or product details</p>
    </div>
  </div>
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
