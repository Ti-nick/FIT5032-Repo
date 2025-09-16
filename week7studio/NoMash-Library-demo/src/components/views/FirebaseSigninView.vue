<template>
  <h1>Sign in</h1>
  <p><input type="email" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p>
    <button @click="signin">
      Sign in with Firebase
    </button>
  </p>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import db from '../../Firebase/init.js'
import { doc, getDoc } from 'firebase/firestore'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()

const signin = async () => {
  try {
    const cred = await signInWithEmailAndPassword(auth, email.value, password.value)
    console.log('✅ Firebase login successful:', cred.user.email)

    // ---- role lookup ----
    const userEmail = cred.user.email.trim()
    const roleRef = doc(db, 'userRoleTable', userEmail)
    const roleSnap = await getDoc(roleRef)

    if (roleSnap.exists()) {
      const role = roleSnap.data().Role
      console.log('[Role] user:', userEmail, 'role:', role)
      localStorage.setItem('userRole', role)
    } else {
      console.warn('⚠️ No role doc found for', userEmail)
    }

    router.push('/')
  } catch (error) {
    console.error('❌ Firebase login failed', error?.code || error)
  }
}
</script>