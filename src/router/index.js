import { useUserStore } from '@/stores/user'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegistrationView.vue'),
    },
    {
      path: '/post',
      name: 'new-post',
      component: () => import('@/views/NewArticle.vue'),
      meta: { requiresAdmin: true },
    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import('@/views/ArticleView.vue'),
      props: true,
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/UsersView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFoundPage.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const userStore = useUserStore()
    if (userStore.isAuthorised) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
