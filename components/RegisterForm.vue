<template>
    <div class="overlay">
      <div class="form-container">
        <h2>Registrar Usuario</h2>
        <input v-model="firstName" type="text" placeholder="Nombres" required />
        <input v-model="lastName" type="text" placeholder="Apellidos" required />
        <input v-model="age" type="number" placeholder="Edad" required />
        <select v-model="gender" required>
          <option value="">Seleccione Sexo</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
        <input v-model="idNumber" type="text" placeholder="Identificación" required />
        <input v-model="username" type="text" placeholder="Nombre de Usuario" required />
        <input v-model="password" type="password" placeholder="Contraseña" required />
        <button @click="register">Registrar</button>
        <button @click="$emit('close')">Cancelar</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const firstName = ref('');
  const lastName = ref('');
  const age = ref('');
  const gender = ref('');
  const idNumber = ref('');
  const username = ref('');
  const password = ref('');
  
  const register = () => {
    // Verificar si ya existe un usuario con el mismo nombre de usuario
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  
    const userExists = existingUsers.find((user) => user.username === username.value);
    if (userExists) {
      alert('El nombre de usuario ya está registrado.');
      return;
    }
  
    // Crear el nuevo objeto de usuario
    const newUser = {
      firstName: firstName.value,
      lastName: lastName.value,
      age: age.value,
      gender: gender.value,
      idNumber: idNumber.value,
      username: username.value,
      password: password.value,
    };
  
    // Agregar el nuevo usuario al arreglo de usuarios en localStorage
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
  
    // Confirmar registro y cerrar el formulario de registro
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    $emit('close'); // Cierra el formulario de registro después de registrarse
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
  </style>
  