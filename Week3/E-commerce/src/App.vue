<script>
import CategoryComponent from './components/CategoryComponent.vue'
const burgerImage = new URL('@/assets/burger.png', import.meta.url).href
const peachImage = new URL('@/assets/peach.png', import.meta.url).href
const kiwiImage = new URL('@/assets/kiwi.png', import.meta.url).href
const appleImage = new URL('@/assets/apple.png', import.meta.url).href
const snackImage = new URL('@/assets/snack.png', import.meta.url).href
const blackplumImage = new URL('@/assets/blackplum.png', import.meta.url).href
const vegImage = new URL('@/assets/veg.png', import.meta.url).href
const headphoneImage = new URL('@/assets/headphone.png', import.meta.url).href
const cakemilkImage = new URL('@/assets/cakemilk.png', import.meta.url).href
const orangeImage = new URL('@/assets/orange.png', import.meta.url).href

const cmsImage = new URL('@/assets/cms.jpg', import.meta.url).href
const catImage = new URL('@/assets/cat.png', import.meta.url).href
const vegmexImage = new URL('@/assets/veg_mex.jpg', import.meta.url).href

export default {
  name: 'App',
  data() {
    return {
      burgerImage,
      peachImage,
      kiwiImage,
      appleImage,
      snackImage,
      blackplumImage,
      vegImage,
      headphoneImage,
      cakemilkImage,
      orangeImage,

      cmsImage,
      catImage,
      vegmexImage,
    }
  },
  components: {
    CategoryComponent,
  },
}
</script>

<template>
  <div class="category-wrapper">
    <CategoryComponent title="Burget&Cake" :product-count="14" :image="burgerImage" bg-color="#81B13D" />
    <CategoryComponent title="Peach" :product-count="13" :image="peachImage" bg-color="#FFFCEB"/>
    <CategoryComponent title="Organic Wiki" :product-count="15" :image="kiwiImage" bg-color="#ECFFEC"/>
    <CategoryComponent title="Red Apple" :product-count="15" :image="appleImage" bg-color="#FEEFEA"/>
    <CategoryComponent title="Snack" :product-count="34" :image="snackImage" bg-color="#FFF3EB"/>
    <CategoryComponent title="Black Plum" :product-count="23" :image="blackplumImage" bg-color="#FFF3FF"/>
    <CategoryComponent title="Vegetables" :product-count="11" :image="vegImage" bg-color="#F2FCE4"/>
    <CategoryComponent title="Headphone" :product-count="150" :image="headphoneImage" bg-color="#FFFCEB"/>
    <CategoryComponent title="Cake & Milk" :product-count="33" :image="cakemilkImage" bg-color="#F2FCE4"/>
    <CategoryComponent title="Orange" :product-count="22" :image="orangeImage" bg-color="#FFF3FF"/>

  </div>
  <div class="category-wrapper_big">
    <CategoryComponent title="Everyday Fresh & Clean with Our Products" :image="cmsImage" bg-color="#F0E8D5" :is-big="true"/>
    <CategoryComponent title="Make your Breakfast Healthy and Easy" :image="catImage" bg-color="#F3E8E8" :is-big="true"/>
    <CategoryComponent title="The best Organic Products Online" :image="vegmexImage" bg-color="#E7EAF3" :is-big="true"/>
  </div>
</template>

<style scoped>
.category-wrapper {
  display: flex;
  flex-direction: row;
  gap: 15px;
  flex-wrap: wrap;
}

.category-wrapper_big {
  padding: 40px;
  display: flex;
  flex-direction: row;
  gap: 25px;
  max-width: 1200px;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .category-wrapper, .category-wrapper_big {
    flex-direction: column;
  }
}
</style>