<template>
    <div>
      <h1>Mi Cronómetro</h1>
      <TimerButtons @iniciar="startTimer" @guardar="saveTime" />
      <div>
        <p>Tiempo: {{ timer }} segundos</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'; // Importa useRouter de vue-router

const router = useRouter();  // Obtén el enrutador
  import { ref } from 'vue';
  import TimerButtons from '~/components/TimerButtons.vue'; // Asegúrate de que la ruta sea correcta
  
  const timer = ref(0); // Estado del cronómetro
  let timerInterval = null; // Variable para manejar el intervalo
  
  // Función para iniciar el cronómetro
  const startTimer = () => {
    if (timerInterval) clearInterval(timerInterval); // Limpiar cualquier intervalo previo
    timerInterval = setInterval(() => {
      timer.value += 1; // Incrementar el tiempo cada segundo
    }, 1000);
  };
  
  // Función para guardar el tiempo y detener el cronómetro
  const saveTime = () => {
    const savedTime = String(timer.value); // Convertir el tiempo a cadena por seguridad
    localStorage.setItem('savedTime', savedTime); // Guardar en localStorage
    console.log("Tiempo guardado correctamente:", savedTime);
    onMounted(() => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    isLoggedIn.value = true;
    router.push('/cronometro'); // Si el usuario está logueado, lo redirigimos al cronómetro
  } else {
    isLoggedIn.value = false;
  }
});
    // Detener el cronómetro
    clearInterval(timerInterval);
    timerInterval = null; // Limpieza de la referencia del intervalo
  };
  </script>
  
  <style scoped>
  h1 {
    color: #42b883;
  }
  </style>
  