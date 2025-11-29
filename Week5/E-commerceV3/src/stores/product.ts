import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    categories: [],
    groups: [],
    promotions: [],
  }),
    getters: {
    getProductsWithBadges: (state) => {
      // Map over the raw products array to create a new array with the added badge property
      return state.products.map(product => {

        let processedImagePath = product.image; // Start with the original image path
        try {
          const parsed = JSON.parse(processedImagePath);
          if (Array.isArray(parsed)) {
            processedImagePath = parsed[0]; // If it's an array, take the first element
          } else {
            // If it's not an array but successfully parsed (e.g., "null", "123", "true", or a simple string in JSON format)
            // We assume it should still be a string path.
            // If the original 'product.image' was already a simple string, JSON.parse would have failed.
            // If 'product.image' was something like '"some/path.jpg"', JSON.parse makes it 'some/path.jpg'.
            processedImagePath = parsed;
          }
        } catch (e) {
          // If JSON.parse fails, processedImagePath remains the original product.image string, which is correct.
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
  },
})
