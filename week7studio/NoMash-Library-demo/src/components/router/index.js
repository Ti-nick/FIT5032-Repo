// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ErrorView from '../views/ErrorView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView, meta: { requiresAuth: true } },
  { path: '/error', name: 'Error', component: ErrorView },
  { path: '/FireLogin', name: 'FireLogin', component: FirebaseSigninView},
  { path: '/FireRegister', name: 'FireRegister', component: FirebaseRegisterView}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// tiny auth checker (adjust to your app)
function isLoggedIn() {
  return localStorage.getItem('isAuthenticated') === 'true'
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next({ name: 'Error' })     // or: next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router