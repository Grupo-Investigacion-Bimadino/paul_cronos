<template>
  <div>
    <button @click="startTimer">Iniciar</button>
    <button @click="saveTime">Guardar</button>
  </div>
</template>

<script setup>
defineEmits(['start', 'save']);

const startTimer = () => {
  emit('start');
};

const saveTime = () => {
  emit('save');
};
</script>

<style scoped>
button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:first-of-type {
  background-color: #4caf50;
  color: white;
}
button:last-of-type {
  background-color: #2196f3;
  color: white;
}
</style>
