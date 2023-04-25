import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import swipeAction from './lib/swipe-action'
const app = createApp(App)
app.use(swipeAction)
app.mount('#app')
