import 'bootstrap/dist/css/bootstrap.min.css'
import router from './components/router'
import './Firebase/init.js'

import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
app.mount('#app')