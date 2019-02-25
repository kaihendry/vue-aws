import App from './components/App.js'
import router from './router/index.js'
import { initAuth, onSessionChange, getIdToken } from './services/auth.js'
import * as AWS from './services/aws.js'

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
    render: h => h(App)
  }).$mount('#app')
})
