import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/AppMain')
  },
  {
    path: '/todo',
    name: 'todolist',
    component: () => import('../views/AppTodo')
  },
  {
    path: '/logIn',
    name: 'logIn',
    component: () => import('../views/AppLogIn')
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('../views/AppRegistration')
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
