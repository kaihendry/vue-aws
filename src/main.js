import Vue from 'vue'
import App from './components/App.vue'
import router from './router'

import { onAuthUpdate, getIdToken } from './services/auth'
import { setAWSCredentials } from './services/aws'

onAuthUpdate(() => {
	getIdToken().then((idToken) => {
		setAWSCredentials(idToken)
	})
})

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
