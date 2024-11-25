<template>
  <div>
    <h2>Información del Usuario</h2>
    <p><strong>Usuario:</strong> {{ username }}</p>
    <p><strong>Tiempo Guardado:</strong> {{ savedTime }} segundos</p>
  </div>
</template>

<script setup>
defineProps(['username', 'savedTime']);
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
  color: #333;
}
p {
  font-size: 1rem;
  color: #555;
}
</style>
