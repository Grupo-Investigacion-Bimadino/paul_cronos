<template>
  <div v-if="!isLoggedIn" class="overlay">
    <div class="form-container">
      <h2>{{ isLogin ? 'Iniciar Sesión' : 'Registrarse' }}</h2>

      <!-- Formulario de inicio de sesión -->
      <form v-if="isLogin" @submit.prevent="login">
        <input v-model="username" type="text" placeholder="Usuario" required />
        <input v-model="password" type="password" placeholder="Contraseña" required />
        <button type="submit">Ingresar</button>
      </form>

      <!-- Formulario de registro -->
      <form v-if="!isLogin" @submit.prevent="register">
        <input v-model="newUsername" type="text" placeholder="Nombre de usuario" required />
        <input v-model="newPassword" type="password" placeholder="Contraseña" required />
        <input v-model="firstName" type="text" placeholder="Nombres" required />
        <input v-model="lastName" type="text" placeholder="Apellidos" required />
        <input v-model="age" type="number" placeholder="Edad" required />
        <select v-model="gender" required>
          <option value="" disabled>Sexo</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
        <input v-model="identification" type="text" placeholder="Identificación" required />
        <button type="submit">Registrar</button>
      </form>

      <!-- Enlace para cambiar entre Iniciar sesión y Registrarse -->
      <p>
        <span v-if="isLogin">
          ¿No tienes cuenta? <a href="#" @click="toggleForm">Crea una cuenta</a>
        </span>
        <span v-if="!isLogin">
          ¿Ya tienes cuenta? <a href="#" @click="toggleForm">Inicia sesión</a>
        </span>
      </p>

      <!-- Botón de Cerrar -->
      <button class="close-btn" @click="closeForm">Cerrar</button>
    </div>
  </div>
</template>

<script setup>
import { nextTick } from 'vue';
import { useRouter } from 'vue-router';

const isLogin = ref(true);  // Controla si estamos en login o en registro
const isLoggedIn = ref(false);  // Estado para comprobar si el usuario ya está logueado

// Campos del formulario de inicio de sesión
const username = ref('');
const password = ref('');

// Campos del formulario de registro
const newUsername = ref('');
const newPassword = ref('');
const firstName = ref('');
const lastName = ref('');
const age = ref('');
const gender = ref('');
const identification = ref('');

// Router
const router = useRouter();

// Comprobamos si ya hay un usuario logueado al cargar la página
onMounted(() => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    isLoggedIn.value = true;
    router.push('/cronometro'); // Si el usuario está logueado, lo redirigimos al cronómetro
  }
});

// Función para alternar entre los formularios de login y registro
const toggleForm = () => {
  isLogin.value = !isLogin.value;
};

// Función para registrar un nuevo usuario
const register = () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const newUser = {
    username: newUsername.value,
    password: newPassword.value,
    firstName: firstName.value,
    lastName: lastName.value,
    age: age.value,
    gender: gender.value,
    identification: identification.value,
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  alert('¡Registro exitoso! Ahora puedes iniciar sesión');
  toggleForm();  // Cambiamos al formulario de login
};

// Función para iniciar sesión
const login = () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(
    (u) => u.username === username.value && u.password === password.value
  );

  if (user) {
    // Guardamos al usuario logueado en localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    // Redirigimos al cronómetro (si el login es exitoso)
    router.push('/cronometro');
  } else {
    alert('Usuario o contraseña incorrectos');
  }
};

// Función para cerrar la interfaz
const closeForm = () => {
  isLoggedIn.value = false;
  router.push('/');  // Redirige a la página de inicio
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
}
input, select {
  display: block;
  margin: 10px auto;
  padding: 10px;
  width: 80%;
  font-size: 1rem;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
}
p {
  font-size: 0.9rem;
}
a {
  color: #007BFF;
  cursor: pointer;
}
.close-btn {
  margin-top: 20px;
  background: #ff5c5c;
  color: white;
  font-size: 1rem;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}
</style>
