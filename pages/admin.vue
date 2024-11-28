<template>
  <div class="admin-container">
    <button class="close-button" @click="logout">Cerrar</button>
    <h1>Panel de Administración</h1>
    <table>
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Edad</th>
          <th>Sexo</th>
          <th>Identificación</th>
          <th>Tiempo Marcado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.username">
          <td>{{ user.username }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ user.identification }}</td>
          <td>{{ user.recordedTime || "N/A" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const users = ref([]);

onMounted(() => {
  const adminUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!adminUser || adminUser.username !== "SebaS_19" || adminUser.password !== "123456789") {
    window.location.href = "/"; // Redirigir al login si no es el administrador
    return;
  }

  const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];
  const userTimes = JSON.parse(localStorage.getItem("userTimes")) || {};

  users.value = registeredUsers.map(user => {
    return {
      ...user,
      recordedTime: userTimes[user.username] || null
    };
  });
});

const logout = () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "/"; // Redirige a la página de inicio de sesión
};
</script>

<style scoped>
.admin-container {
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

h1 {
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

table {
  border-collapse: collapse;
  width: 80%;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

th, td {
  text-align: left;
  padding: 12px 15px;
  border: 1px solid #ddd;
}

th {
  background-color: #6a0dad;
  color: #fff;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #f1f1f1;
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
