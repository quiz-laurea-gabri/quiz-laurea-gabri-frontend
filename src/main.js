import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

createApp(App).mount('#app')

axios.get("https://quiz-laurea-gabri.herokuapp.com/").then(res => console.log("Received " + res))