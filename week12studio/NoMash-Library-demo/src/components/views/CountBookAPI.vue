<script>
import axios from 'axios';

export default {
  data() {
    return {
      jsondata: null,     // all books list
      bookCount: null,    // total number of books
      error: null
    };
  },
  mounted() {
    this.getBookData();
  },
  methods: {
    async getBookData() {
      try {
        // --- Fetch book count ---
        const countResponse = await axios.get('https://countbooks-uojfm5t2pq-ts.a.run.app');
        this.bookCount = countResponse.data.count;

        // --- Fetch all book records ---
        const allResponse = await axios.get('https://getallbooks-uojfm5t2pq-ts.a.run.app');
        this.jsondata = allResponse.data;

        this.error = null;
      } catch (error) {
        console.error('Error fetching book data:', error);
        this.error = error;
        this.jsondata = null;
        this.bookCount = null;
      }
    },
  },
};
</script>

<template>
  <div>
    <h1>All Books (JSON Data)</h1>
    <!-- Show total book count -->
    <p v-if="bookCount !== null">📚 Total Books: {{ bookCount }}</p>

    <!-- Display JSON response -->
    <pre v-if="jsondata">{{ jsondata }}</pre>

    <p v-if="error">Error: {{ error.message }}</p>
  </div>
</template>

<style scoped></style>