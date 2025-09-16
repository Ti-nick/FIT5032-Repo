<template>
  <div>
    <h1>Log out</h1>
    <p>Click below to log out from Firebase.</p>
    <button @click="logout">Log out</button>
  </div>
</template>

<script setup>
import { getAuth, signOut } from 'firebase/auth'
import { onMounted } from 'vue'

const auth = getAuth()

onMounted(() => {
  console.log('👤 Current user on page load:', auth.currentUser)
})

const logout = async () => {
  console.log('🔑 User before signOut:', auth.currentUser)

  try {
    await signOut(auth)
    console.log('✅ User signed out successfully')
    console.log('👤 Current user after signOut:', auth.currentUser)
    alert('You have been logged out')
  } catch (error) {
    console.error('❌ Logout failed:', error)
  }
}
</script>