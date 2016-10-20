import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import { signInHandler } from './lib/auth'

window.onSignIn = signInHandler

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
