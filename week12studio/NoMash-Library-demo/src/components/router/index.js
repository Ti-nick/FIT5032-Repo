// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ErrorView from '../views/ErrorView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AddBookView from '../views/AddBookView.vue'
import Logout from '../views/Logout.vue'
import GetBookCountView from '../views/GetBookCountView.vue'
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView, meta: { requiresAuth: true } },
  { path: '/addBook', name: 'AddBook', component: AddBookView},
  { path: '/error', name: 'Error', component: ErrorView },
  { path: '/FireLogin', name: 'FireLogin', component: FirebaseSigninView},
  { path: '/Logout', name: 'Logout', component: Logout},
  { path: '/FireRegister', name: 'FireRegister', component: FirebaseRegisterView},
  { path: '/GetBookCount', name: 'GetBookCount', component: GetBookCountView},
  { path: '/WeatherCheck', name: 'WeatherCheck', component: WeatherView },
  { path: '/CountBookAPI', name: 'CountBookAPI', component: CountBookAPI }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
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