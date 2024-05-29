import { createApp } from 'vue'
import pinia from "./stores"
import App from './App.vue'
import router from './router'

// 初始化样式
import '@/styles/common.scss'

const app = createApp(App)

app.use(pinia);
app.use(router)

app.mount('#app')
