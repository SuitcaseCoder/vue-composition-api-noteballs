import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'

const pinia = createPinia()

pinia.use(({ store }) => {
    // markRaw makes the store not reactive
    store.router = markRaw(router)
  })

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
