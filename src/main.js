import Vue from 'vue'
import App from './components/App.vue'
import router from './router'

import { initAuth, onSessionChange, getIdToken } from './services/auth'
import * as AWS from './services/aws'

onSessionChange((signedIn) => {
	if (signedIn) {
		AWS.setCredentials(getIdToken())
	} else {
		AWS.destroy()
	}
})

initAuth().then(() => {
	new Vue({
		router,
		render: h => h(App),
	}).$mount('#app')
})