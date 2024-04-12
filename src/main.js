import './assets/index.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaFlag, RiZhihuFill,CoHome,LaEllipsisHSolid,IoEllipsisHorizontalCircleSharp  } from "oh-vue-icons/icons";

addIcons(FaFlag, RiZhihuFill,CoHome,LaEllipsisHSolid,IoEllipsisHorizontalCircleSharp );

const app = createApp(App)

app.component("v-icon", OhVueIcon);
app.use(router)

app.mount('#app')