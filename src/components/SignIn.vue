<template>
	<div>
		<button @click="signInHandler">Sign In</button>
		<span v-if="error">{{error}}</span>
	</div>
	
</template>

<script>
import { signIn } from '../services/auth'

export default {
  data: () => ({
    error: null
  }),
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
</script>
