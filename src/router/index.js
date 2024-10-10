import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductView from '@/views/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/product/:idCompany/:idProduct',
      name: 'product',
      component: ProductView
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/'
    }
    // {
    //   path: '/:catchAll(.*)',
    //   redirect: '/'
    // }
  ]
})

export default router
