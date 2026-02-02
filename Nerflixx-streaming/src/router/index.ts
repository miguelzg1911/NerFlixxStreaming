import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/auth/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/browse/HomeView.vue'),
      meta: { requiresAuth: true } 
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue')
    },
    {
      path: '/plans',
      name: 'plans',
      component: () => import('../views/auth/PlansView.vue')
    },
    {
      path: '/profiles',
      name: 'profiles',
      component: () => import('../views/profile/ProfilesView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/watch/:id',
      name: 'watch',
      component: () => import('../views/browse/WatchView.vue'),
      props: true
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminDashboardView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    }
  ]
})


router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router