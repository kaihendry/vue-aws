import Vue from 'vue'
import Router from 'vue-router'
import DB from '../views/db.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{ path: '/', component: DB },
	]
})
