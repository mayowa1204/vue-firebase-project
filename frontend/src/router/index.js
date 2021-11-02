import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/contact-us',
    name: 'Contact-us',
    component: () => import(/* webpackChunkName: "contact-us" */ '../components/contact-us.vue')
  },
  {
    path: '/menu-item-data',
    name: 'MenuItemData',
    component: () => import(/* webpackChunkName: "menu-item-data" */ '../components/menu-item-data.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
