<script>
import axios from 'axios';

export default {
    data() {
        return {
            count: null,
            error: null
        }
    },
    methods: {
        async getBookCount(){
            try{
                const response = await axios.get('https://countbooks-uojfm5t2pq-ts.a.run.app');
                this.count = response.data.count;
                this.error = null;
            }catch (error){
                console.error('Error fetching book count: ', error);
                this.error = error;
                this.count = null;
            }
        },
        async addBook() {
      try {
        this.addStatus = "Adding...";
        this.error = null;
        const url = "https://addbook-uojfm5t2pq-ts.a.run.app";
        const resp = await axios.post(url, {
          isbn: this.isbn,
          name: this.name
        });
        this.addStatus = `Added book with ID: ${resp.data.id}`;
        this.isbn = "";
        this.name = "";
      } catch (error) {
        console.error("Error adding book: ", error);
        this.error = "Failed to add book.";
        this.addStatus = "";
      }
    }
    }
}
</script>
<template>
    <div id="app">
        <h1>Book Counter</h1>
        <button @click="getBookCount">Get Book Count</button>
        <p v-if="count !== null">Total number of books: {{ count }}</p>
        <p v-if="error">{{ error }}</p>

        <h1>Add Book</h1>
    <input v-model="isbn" placeholder="Enter ISBN" />
    <input v-model="name" placeholder="Enter Name" />
    <button @click="addBook">Add Book</button>
    <p v-if="addStatus">{{ addStatus }}</p>
    </div>
</template>