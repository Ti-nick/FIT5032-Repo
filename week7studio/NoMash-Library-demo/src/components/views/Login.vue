<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const emit = defineEmits(['login-success'])

const formData = ref({ username: '', password: '' })
const account_database = { username: 'user123', password: 'Password@123' }

const router = useRouter()
const route = useRoute()

const submitForm = () => {
  const ok = formData.value.username === account_database.username &&
             formData.value.password === account_database.password
  if (ok) {
    localStorage.setItem('isAuthenticated', 'true')   // <-- match your guard
    emit('login-success')                             // tell parent
    alert('Login successful!')
    // optional: go to the page the user wanted, else /about
    router.push(route.query.redirect || '/about')
  } else {
    alert('Invalid username or password.')
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <input v-model="formData.username" placeholder="Username" />
    <input v-model="formData.password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</template>

<style scoped>

</style>