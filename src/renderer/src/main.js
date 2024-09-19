import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import router from './router'
import { createPinia } from "pinia";

const pinia = createPinia()

import Layout from './components/Layout.vue'

const app = createApp(App)

app.component("Layout",Layout)

app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')
