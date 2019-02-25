import { signIn } from '../services/auth.js'

export default {
  data: () => ({
    error: null
  }),
  template: `<div>
	<button @click="signInHandler">Sign In</button>
	<span v-if="error">{{error}}</span>
	</div>`,
  methods: {
    signInHandler () {
      signIn()
        .then(this.success, this.failure)
    },
    success () {
      this.$router.push(this.$route.params.redirect || '/')
    },
    failure () {
      this.error = ':('
    }
  }
}
