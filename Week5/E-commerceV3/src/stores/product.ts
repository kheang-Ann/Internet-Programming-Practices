import { defineStore } from 'pinia'
import axios from 'axios'

interface Product {
  image: string;
  [key: string]: any;
}

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    categories: [],
    groups: [],
    promotions: [],
  }),
    getters: {
    getProductsWithBadges: (state) => {
      return state.products.map(product => {

        let processedImagePath = product.image;
        try {
          const parsed = JSON.parse(processedImagePath);
          if (Array.isArray(parsed)) {
            processedImagePath = parsed[0]; 
          } else {
            processedImagePath = parsed;
          }
        } catch (e) {
        }
        processedImagePath = processedImagePath.replace(/\\\\/g, '/');

        return {
          ...product,
          image: processedImagePath
        };
      });
    },
  },

  actions: {
    async fetchProducts() {
      try {
        const res = await axios.get('http://localhost:3000/api/products');
        this.products = res.data;
        console.log(this.products);
        return res;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
    async fetchProductById(productId: string) {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/${productId}`);
        return res.data;
      } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
        throw error;
      }
    }
  },
})
