import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Cart from '../views/Cart.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      enterClass: "animate__animated animate__slideInDown animate__faster",
      leaveClass: "animate__animated animate__fadeOut animate__faster",
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    meta: {
      enterClass: "animate__animated animate__fadeIn animate__faster",
      leaveClass: "animate__animated animate__slideOutUp animate__faster",
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
