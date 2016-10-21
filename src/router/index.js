import Vue from 'vue'
import Router from 'vue-router'
import DB from '../components/Database.vue'
import SignIn from '../components/SignIn.vue'

import { signedIn } from '../services/auth'

Vue.use(Router)

const router = new Router({
	routes: [
		{ path: '/signin', component: SignIn },
		{ path: '/', component: DB, meta: { auth: true } },
	]
})

router.beforeEach((to, from, next) => {
	if (to.meta.auth) {
		signedIn()
		.then(() => next(), () => {
			next({
				path: '/signin',
				params: { redirect: to.path },
			})
		})
	} else {
		next()
	}
})

export default router