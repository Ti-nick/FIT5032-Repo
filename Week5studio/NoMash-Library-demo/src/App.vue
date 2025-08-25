<script setup>
import { ref } from 'vue'
import JSONLab from './components/JSONLab.vue'
import BHeader from './components/BHeader.vue'
import LibraryRegistrationForm from './components/LibraryRegistrationForm.vue'
import Login from './components/views/Login.vue';

const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')
const onLoginSuccess = () => {
  isAuthenticated.value = true
}

</script>

<template>
  <header>
    <BHeader />
  </header>

  <main>
    <Login :isAuthenticated="isAuthenticated" @login-success="onLoginSuccess"/>
    <!-- <LibraryRegistrationForm /> -->
    <!-- <JSONLab /> -->
     <router-view></router-view>
  </main>
</template>

<style scoped>
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
