import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../view/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/category',
    name: 'Category',
    // lazy-load a CategoryView which we'll create under `src/view`
    component: () => import('../view/CategoryView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
