<template>
	<div>
		<div ref='test' @click="startSignIn">Sign In</div>
		<span v-if="error">{{error}}</span>
	</div>
	
</template>

<script>
export default {
	data: () => ({
		error: null
	}),
	mounted() {
		gapi.signin2.render(this.$refs.test, {
			theme: 'dark',
			onsuccess: this.success,
			onfailure: this.failure,
		})
	},
	methods: {
		success() {
			this.$router.push(this.$route.params.redirect || '/')
		},
		failure() {
			this.error = ':('
		},
	},
}
</script>
