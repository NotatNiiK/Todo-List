import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/AppMain')
  },
  {
    path: '/todo',
    component: () => import('../views/AppTodo')
  },
  {
    path: '/authorization',
    component: () => import('../views/AppAuth')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
