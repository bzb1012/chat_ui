import { createWebHashHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/Home.vue'),
    children: [
      {
        path: '/Chat',
        name: 'Chat',
        component: () => import('@/components/Chat.vue')
      },
      {
        path: '/Contact',
        name: 'Contact',
        component: () => import('@/components/Contact.vue')
      }
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/components/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
