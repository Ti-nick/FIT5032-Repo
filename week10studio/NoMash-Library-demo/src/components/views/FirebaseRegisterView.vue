<template>
  <div>
    <h1>Create an Account</h1>
    <p><input type="email" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p>
      <button @click="register" :disabled="loading">
        {{ loading ? 'Creating…' : 'Save to Firebase' }}
      </button>
    </p>
    <p v-if="err" style="color:crimson">{{ err }}</p>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
// make sure Firebase is initialized once in your app (e.g., import './firebase' in main.js)

const email = ref('')
const password = ref('')
const err = ref('')
const loading = ref(false)

const router = useRouter()
const auth = getAuth()

const register = async () => {
  err.value = ''
  loading.value = true
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log('Firebase registration successful')
    router.push('/FireLogin')
  } catch (e) {
    console.log('Firebase registration failed', e?.code || e)
    err.value = e?.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>