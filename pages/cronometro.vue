<template>
  <div class="container">
    <button class="close-button" @click="logout">Cerrar</button>
    <h1>CRONÓMETRO</h1>
    <div class="timer-display">
      <span>{{ formatTime(timer) }}</span>
    </div>
    <div class="button-container">
      <button @click="startTimer">Iniciar</button>
      <button @click="saveTime">Guardar Tiempo</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const username = ref("");
const timer = ref(0);
let timerInterval = null;

onMounted(() => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    window.location.href = "/"; // Redirige al inicio si no está logueado
  } else {
    username.value = loggedInUser.username;
  }
});

const startTimer = () => {
  if (timerInterval) clearInterval(timerInterval); // Reinicia si ya está corriendo
  timerInterval = setInterval(() => {
    timer.value += 1;
  }, 10); // Incremento en milisegundos
};

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

const saveTime = () => {
  stopTimer();

  // Guardar tiempo en localStorage
  const userTimes = JSON.parse(localStorage.getItem("userTimes")) || {};
  userTimes[username.value] = timer.value;

  localStorage.setItem("userTimes", JSON.stringify(userTimes));
  alert(`Tiempo guardado: ${formatTime(timer.value)}`);
};

const formatTime = (time) => {
  const milliseconds = time % 100;
  const seconds = Math.floor((time / 100) % 60);
  const minutes = Math.floor((time / 6000) % 60);
  const hours = Math.floor(time / 360000);

  return `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")} : ${String(milliseconds).padStart(2, "0")}`;
};

const logout = () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "/"; // Redirige a la página de inicio de sesión
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: aqua;
  color: white;
  position: relative;
}

h1 {
  margin-bottom: 20px;
  font-size: 2rem;
}

.timer-display {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: #6c44ac;
  font-size: 4rem;
  font-weight: bold;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  width: 800px;
}

.button-container {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  transform: scale(1.05);
}

button:nth-child(1) {
  background-color: #ff9800;
  color: white;
}

button:nth-child(2) {
  background-color: #ff9800;
  color: white;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px 12px;
  font-size: 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.close-button:hover {
  background-color: #c0392b;
}
</style>
