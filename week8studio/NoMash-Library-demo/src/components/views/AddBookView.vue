<script>
import { ref } from 'vue'
import db from '../../Firebase/init.js'
import { collection, addDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore'
import BookList from '../BookList.vue'
import BooksQueryDemo from '../BooksQueryDemo.vue'

export default {
  components: { BookList, BooksQueryDemo },
  setup() {
    const addISBN = ref('')
    const deleteISBN = ref('')
    const name = ref('')

    const addBook = async () => {
      try {
        const isbnNumber = Number(addISBN.value)
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number')
          return
        }

        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value
        })

        addISBN.value = ''
        name.value = ''
        alert('Book added successfully!')
      } catch (error) {
        console.error('Error adding book:', error)
        alert(`Add failed: ${error.message ?? error}`)
      }
    }

    const deleteBook = async () => {
      try {
        const isbnNumber = Number(deleteISBN.value)
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number')
          return
        }

        const q = query(collection(db, 'books'), where('isbn', '==', isbnNumber))
        const snap = await getDocs(q)

        if (snap.empty) {
          alert(`No book found with ISBN ${isbnNumber}`)
          return
        }

        await Promise.all(snap.docs.map(d => deleteDoc(d.ref)))

        deleteISBN.value = ''
        alert(`Book(s) with ISBN ${isbnNumber} deleted successfully!`)
      } catch (error) {
        console.error('Error deleting book:', error)
        alert(`Delete failed: ${error.message ?? error}`)
      }
    }

    return {
      addISBN,
      deleteISBN,
      name,
      addBook,
      deleteBook
    }
  }
}
</script>

<template>
  <div>
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="addISBN">ISBN:</label>
        <input type="text" v-model="addISBN" id="addISBN" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
    </form>

    <br />

    <h1>Delete Book</h1>
    <form @submit.prevent="deleteBook">
      <div>
        <label for="deleteISBN">ISBN:</label>
        <input type="text" v-model="deleteISBN" id="deleteISBN" required />
      </div>
      <button type="submit">Delete Book</button>
    </form>

    <br />
    <BookList />

    <br></br>
    <BooksQueryDemo/>
  </div>
</template>