import { createApp } from 'vue'
import App from './App.vue'
import vue from 'vue';
import router from './router';

createApp(App).use(router).mount('#app')

//**Global Variables**
//ApiUrl
vue.prototype.$apiUrl = 'http://localhost:3001/api';
//User / Token
if (localStorage.user != undefined) {
  vue.prototype.$token = JSON.parse(localStorage.user).token;
  vue.prototype.$userid = JSON.parse(localStorage.user);
}
