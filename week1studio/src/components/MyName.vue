<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="myname">
    <h1 class="green">{{ name }}</h1>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

.myname h1{
  text-align: center;
}

@media (min-width: 1024px) {
  .myname h1{
    text-align: left;
  }
}
</style>
