import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TestView from '@/views/TestView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/test/:testID',
      name: 'test',
      component: TestView,
    },
    {
      path: '/test/404',
      name: '404',
      component: NotFoundView,
    },
  ],
})

export default router
