<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-2xl font-bold mb-6">Panel de Administración</h1>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-bold">Usuarios Registrados</h2>
      <ul class="mt-4">
        <li v-for="user in usuarios" :key="user.username" class="border-b py-2 flex justify-between">
          <span>{{ user.firstName }} {{ user.lastName }} ({{ user.username }})</span>
          <span v-if="user.role === 'admin'" class="text-sm text-gray-500">Admin</span>
        </li>
      </ul>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 class="text-lg font-bold">Tiempos Registrados</h2>
      <ul class="mt-4">
        <li v-for="registro in tiempos" :key="registro.fecha" class="border-b py-2 flex justify-between">
          <span>{{ registro.usuario }} - {{ registro.tiempo }} segundos</span>
          <span class="text-sm text-gray-500">{{ registro.fecha }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuarios: this.getStoredData("users"),
      tiempos: this.getStoredData("tiempos")
    };
  },
  methods: {
    getStoredData(key) {
      try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
      } catch (error) {
        console.error(`Error al obtener datos de localStorage para la clave "${key}":`, error);
        return [];
      }
    }
  }
}
</script>
