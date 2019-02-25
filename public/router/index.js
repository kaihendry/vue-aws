import SignIn from '../components/SignIn.js'
import Database from '../components/Database.js'

import { signedIn } from '../services/auth.js'

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/signin', component: SignIn },
    { path: '/:status', component: Database, meta: { auth: true } },
    { path: '/', redirect: '/new' }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !signedIn()) {
    next({
      path: '/signin',
      params: { redirect: to.path }
    })
  } else {
    // setTimeout to make sure the session listeners
    // have been executed first
    setTimeout(() => next(), 0)
  }
})

export default router
