import { signOut, signedIn, currentUserProfile, onSessionChange } from '../services/auth.js'

export default {
  name: 'App',
  data: () => ({
    currentUser: null
  }),
  created () {
    onSessionChange(this.handleSessionStatus)
    this.handleSessionStatus(signedIn())
  },
  template: `
	<div id="app">
		<p v-if="currentUser">{{currentUser.name}} <button @click="signOut">Sign Out</button></p>
		<router-view></router-view>
		<p><a href=https://github.com/kaihendry/vue-aws>Source code</a></p>
	</div>`,
  methods: {
    signOut () {
      signOut()
      this.user = null
    },
    handleSessionStatus (signedIn) {
      if (signedIn) {
        const user = currentUserProfile()
        this.currentUser = {
          name: user.getName()
        }
      } else {
        this.currentUser = null
        this.$router.push('/signin')
      }
    }
  }
}
