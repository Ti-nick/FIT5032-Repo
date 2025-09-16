<script setup>
import { ref, onMounted } from 'vue'
import db from '../Firebase/init.js'
import { collection, query, where, getDocs } from 'firebase/firestore'

const books = ref([])

const fetchBooks = async () => {
  try {
    const q = query(collection(db, 'books'), where('isbn', '>', 1000))
    const snap = await getDocs(q)
    books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (error) {
    console.error('Error fetching books:', error)
  }
}

onMounted(fetchBooks)
</script>

<template>
  <div>
    <h1>Books with ISBN &gt; 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
      </li>
    </ul>
  </div>
</template>