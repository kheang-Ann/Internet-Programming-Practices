import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../view/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/category/:name',
    name: 'Category',
    // lazy-load a CategoryView which we'll create under `src/view`
    component: () => import('../view/CategoryView.vue'),
  },
  {
    path: '/hot-deals',
    name: 'HotDeals',
    component: () => import('../view/CategoryView.vue'),
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('../view/ProductView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
