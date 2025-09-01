// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './components/router'

import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })

// app.component('DataTable', DataTable)
// app.component('Column', Column)
app.use(router)
app.mount('#app')

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgYzjToGjhvoskO_OUtYk7sajMj1a84mU",
  authDomain: "week7-nick.firebaseapp.com",
  projectId: "week7-nick",
  storageBucket: "week7-nick.firebasestorage.app",
  messagingSenderId: "1035049370601",
  appId: "1:1035049370601:web:db974c979390286cacc178"
};

// Initialize Firebase
initializeApp(firebaseConfig);
