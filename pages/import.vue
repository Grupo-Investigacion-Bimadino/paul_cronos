<template>
    <div>
      <h1 class="text-3xl font-bold text-center my-4">Bienvenido al Sistema de Cronómetro</h1>
      <!-- Aquí se inserta el Panel de Administración -->
      <AdminPanel />
    </div>
  </template>
  
  <script>
  // Importar el componente AdminPanel
  import AdminPanel from '~/components/AdminPanel.vue';
  
  export default {
    components: {
      AdminPanel,
    },
  };
  </script>
  