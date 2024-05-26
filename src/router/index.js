import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: 'Anime/:path/:id',
          component: () => import('@/views/Anime/index.vue')
        },
        {
          path: 'Search/',
          component: () => import('@/views/Search/index.vue')
        },
      ]
    }
  ]
})

export default router
