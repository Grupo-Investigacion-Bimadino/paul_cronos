<template>
  <div>
    <h2>Tiempo Actual</h2>
    <p>{{ timer }} segundos</p>
  </div>
</template>

<script setup>
defineProps(['timer']);
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
  color: #333;
}
p {
  font-size: 1.25rem;
  color: #555;
}
</style>
