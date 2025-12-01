<script>
import Header_page from '@/components/Header_page.vue';
import Header_page1 from '@/components/Header_page1.vue';
import { useProductStore } from '@/stores/product';

export default {
  name: 'ProductDetailView',
  components: {
    Header_page,
    Header_page1,
  },
  data() {
    return {
      productId: null,
      categoryName: null,
      product: null, 
    }
  },
  async mounted() {
    this.productId = this.$route.params.id;
    this.categoryName = this.$route.name === 'HotDeals' ? 'Hot Deals' : null;
    await this.fetchProductDetails();
  },
  watch: {
    '$route.params.id': {
      handler(newId) {
        this.productId = newId;
        this.fetchProductDetails();
      },
      immediate: true, 
    }
  },
  methods: {
    async fetchProductDetails() {
      const productStore = useProductStore();
      try {
        this.product = await productStore.fetchProductById(this.productId);
      } catch (error) {
        console.error('Failed to fetch product details:', error);
        this.product = null;
      }
    }
  }
};
</script>


<template>
    <div class="app"  v-if="product">
        <Header_page1 />
        <Header_page />
        <div class="footer">
            <div class="footer-content">
                Uninhibited carnally hired played in whimpered dear gorilla koala depending and much yikes off far
                quetzal goodness and from for grimaced goodness unaccountably and meadowlark near unblushingly crucial
                scallop tightly neurotic hungrily some and dear furiously this apart.
                <br /><br />
                Spluttered narrowly yikes left moth in yikes bowed this that grizzly much hello on spoon-fed that alas
                rethought much decently richly and wow against the frequent fluidly at formidable acceptably flapped
                besides and much circa far over the bucolically hey precarious goldfinch mastodon goodness gnashed a
                jellyfish and one however because.
            </div>
        </div>
    </div>
</template>

<style scoped>
.app {
    padding: 8px;
    min-width: 1628px;
}

.breadcrumbs {
    display: flex;
    flex-direction: row;
    font-family: 'Lato', sans-serif;
    size: 18px;
    color: #7E7E7E;
    gap: 15px;
}

.breadcrumbs span:last-child {
    color: #3BB77E;
}

.product-details {
    display: flex;
    flex-direction: row;
    gap: 40px;
    margin: 20px 0px;
}

.footer {
    margin-top: 60px;
    border: 1px solid #F2F3F4;
    border-radius: 15px;
    padding: 40px 50px 80px 50px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.tabs-navigation {
    display: flex;
    flex-direction: row;
    gap: 10px
}

.tab-button {
    justify-content: center;
    padding: 10px 20px;
    color: #B6B6B6;
    border: 1px solid #F2F3F4;
    border-radius: 30px;
    font-family: 'Quicksand', sans-serif;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
}

.active-tab {
    background-color: #FFFFFF;
    color: #3BB77E;
}

.footer-content {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: #7E7E7E;
}
</style>
