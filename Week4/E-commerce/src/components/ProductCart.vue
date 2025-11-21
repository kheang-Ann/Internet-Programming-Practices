<template>
  <div class="product-card">
    <div v-if="discount !== null && discount !== undefined" class="discount-label">
      -{{ discount }}%
    </div>

    <img :src="image" class="product-img" />

    <div class="product-body">
      <p class="brand">{{ brand }}</p>
      <p class="title">{{ title }}</p>

      <div class="rating-row">
        <span class="stars">{{ stars }}</span>
        <span class="rating">({{ rating.toFixed(1) }})</span>
      </div>

      <p class="weight">{{ weight }}</p>

      <div class="price-row">
        <span class="price">${{ price.toFixed(2) }}</span>
        <span v-if="oldPrice" class="old-price">${{ oldPrice.toFixed(2) }}</span>

        <button class="qty-btn">{{ quantity }} ▾</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    title: { type: String, default: 'Product Title' },
    image: { type: String, default: '' },
    brand: { type: String, default: 'Hodo Foods' },
    price: { type: Number, default: 2.51 },
    oldPrice: { type: Number, default: null },
    rating: { type: Number, default: 4.0 },
    weight: { type: String, default: '500 gram' },
    discount: { type: Number, default: null },
    quantity: { type: Number, default: 1 },
  },
  computed: {
    stars() {
      const r = Math.max(0, Math.min(5, Math.round(this.rating)))
      const filled = '★'.repeat(r)
      const empty = '☆'.repeat(5 - r)
      return filled + empty
    },
  },
}
</script>

<style scoped>
.product-card {
  width: 280px;
  background: #fff;
  border: 2px solid #c3e9ff;
  border-radius: 18px;
  padding: 20px;
  position: relative;
  transition: 0.2s ease;
}

.discount-label {
  background: #55b84a;
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  position: absolute;
  top: 15px;
  left: 15px;
}

.product-img {
  width: 100%;
  height: 180px;
  object-fit: contain;
  margin-top: 20px;
}

.product-body {
  margin-top: 20px;
}

.brand {
  font-size: 14px;
  color: #6f6f6f;
}

.title {
  font-size: 17px;
  font-weight: bold;
  margin-top: 6px;
}

.rating-row {
  display: flex;
  gap: 5px;
  margin: 8px 0;
}

.stars {
  color: #ffb400;
}

.price-row {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.price {
  color: #3bb77e;
  font-size: 22px;
  font-weight: bold;
}

.old-price {
  text-decoration: line-through;
  color: grey;
}

.qty-btn {
  margin-left: auto;
  padding: 6px 14px;
  border: 2px solid #3bb77e;
  border-radius: 8px;
  background: white;
  color: #3bb77e;
  font-weight: bold;
  cursor: pointer;
}
</style>
