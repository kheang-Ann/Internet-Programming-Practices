import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/page_one',
    },
    {
      path: '/page_one',
      name: 'PageOne',
      component: () => import('@/views/PageOneView.vue'),
      children: [
        {
          name: 'PageOne_Section',
          path: 'sections/:sectionId',
          component: () => import('@/components/SectionComponent.vue'),
          props: { pageID: 1 }
        }
      ],
    },
    {
      path: '/page_two',
      name: 'PageTwo',
      component: () => import('@/views/PageTwoView.vue'),
      children: [
        {
          name: 'PageTwo_Section',
          path: 'sections/:sectionId',
          component: () => import('@/components/SectionComponent.vue'),
          props: { pageID: 2 }
        }
      ],
    },
    {
      path: '/page_three',
      name: 'PageThree',
      component: () => import('@/views/PageThreeView.vue'),
      children: [
        {
          name: 'PageThree_Section',
          path: 'sections/:sectionId',
          component: () => import('@/components/SectionComponent.vue'),
          props: { pageID: 3 }
        }
      ],
    },
  ],
})
export default router
