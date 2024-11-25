<template>
  <div>
    <h1>Mi Cronómetro</h1>
    <p>Bienvenido, {{ username }}!</p>
    <p>Tiempo: {{ timer }} segundos</p>
    <button @click="startTimer">Iniciar</button>
    <button @click="saveTime">Guardar Tiempo</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const username = ref('');
const timer = ref(0);
let timerInterval = null;

onMounted(() => {
  // Verificar si el usuario está logueado
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!loggedInUser) {
    // Si no hay usuario logueado, redirigir al login
    window.location.href = '/'; // Redirige a la página de inicio de sesión
  } else {
    username.value = loggedInUser.username; // Cargar el nombre del usuario
  }
});

const startTimer = () => {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer.value += 1;
  }, 1000);
};

const saveTime = () => {
  localStorage.setItem('savedTime', timer.value);
  alert(`Tiempo guardado: ${timer.value} segundos`);
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
}
</style>
