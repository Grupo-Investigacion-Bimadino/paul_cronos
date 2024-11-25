export default defineNuxtConfig({
  buildModules: ['@nuxtjs/tailwindcss'],
  css: ['vue-toastification/dist/index.css'],
  plugins: ['~/plugins/toast.client.js'],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css'
  },

    pages: true, // Habilita el sistema de páginas en Nuxt
    buildModules: [
      // Aquí podrías incluir otros módulos si los estás utilizando
    ],
    vue: {
      router: {
        // Si deseas personalizar la configuración del router, puedes hacerlo aquí.
      }
    },
    history: true, 
  
  compatibilityDate: '2024-11-25'
})