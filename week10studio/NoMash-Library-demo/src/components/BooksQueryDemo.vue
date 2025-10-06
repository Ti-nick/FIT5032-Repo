<script setup>
import { ref, onMounted } from 'vue'
import db from '../Firebase/init.js'
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore'

const topIsbnDesc = ref([])    
const recentLargeIsbn = ref([])  
const nameStartsWithA = ref([])   
async function runQueries() {
  // 1) Books with isbn >= 1000, ordered by isbn DESC, limit 5
  {
    const q1 = query(
      collection(db, 'books'),
      where('isbn', '>=', 1000),
      orderBy('isbn', 'desc'),
      limit(5)
    )
    const snap1 = await getDocs(q1)
    topIsbnDesc.value = snap1.docs.map(d => ({ id: d.id, ...d.data() }))
  }

  // 2) Books with 2000 <= isbn <= 9999, ordered by isbn ASC, limit 10
  {
    const q2 = query(
      collection(db, 'books'),
      where('isbn', '>=', 2000),
      where('isbn', '<=', 9999),
      orderBy('isbn', 'asc'),
      limit(10)
    )
    const snap2 = await getDocs(q2)
    recentLargeIsbn.value = snap2.docs.map(d => ({ id: d.id, ...d.data() }))
  }

  // 3) “Name starts with A” style query using range on name
  {
    const q3 = query(
      collection(db, 'books'),
      where('name', '>=', 'A'),
      where('name', '<', 'B'),
      orderBy('name', 'asc'),
      limit(10)
    )
    const snap3 = await getDocs(q3)
    nameStartsWithA.value = snap3.docs.map(d => ({ id: d.id, ...d.data() }))
  }
}

onMounted(runQueries)
</script>

<template>
  <div class="space-y-8">
    <section>
      <h2>Query 1 — where + orderBy(desc) + limit</h2>
      <p><code>where('isbn', '&gt;=', 1000) → orderBy('isbn','desc') → limit(5)</code></p>
      <ul>
        <li v-for="b in topIsbnDesc" :key="b.id">
          <strong>{{ b.name }}</strong> — ISBN: {{ b.isbn }}
        </li>
      </ul>
    </section>

    <section>
      <h2>Query 2 — multiple where + orderBy + limit</h2>
      <p><code>where('isbn','&gt;=',2000), where('isbn','&lt;=',9999) → orderBy('isbn') → limit(10)</code></p>
      <ul>
        <li v-for="b in recentLargeIsbn" :key="b.id">
          <strong>{{ b.name }}</strong> — ISBN: {{ b.isbn }}
        </li>
      </ul>
    </section>

    <section>
      <h2>Query 3 — prefix match with range + orderBy + limit</h2>
      <p><code>where('name','&gt;=','A'), where('name','&lt;','B') → orderBy('name') → limit(10)</code></p>
      <ul>
        <li v-for="b in nameStartsWithA" :key="b.id">
          <strong>{{ b.name }}</strong> — ISBN: {{ b.isbn }}
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.space-y-8 > * + * { margin-top: 2rem; }
</style>