<template>
	<div id="app">
		<p v-if="currentUser">{{currentUser.name}}</p>
		<p>Goal: Google login &rarr; AWS login (STS) &rarr; AWS.DynamoDB.DocumentClient
		<p>Without button. Without Window object ideally.
		<p>
		<router-link to="/">AWS DYNAMODB</router-link>
		</p>
		<router-view></router-view>
		<p><a href=https://github.com/kaihendry/vue-aws>Source code</a></p>
	</div>
</template>

<script>
import { signedIn, currentUserProfile } from '../services/auth'

export default {
	name: 'App',
	data: () => ({
		currentUser: null,
	}),
	created() {
		signedIn().then(() => {
			currentUserProfile().then((user) => {
				this.currentUser = {
					name: user.getName()
				}
			})
		})
	},
}
</script>

<style>
body {
	margin: 0;
	font-size: 2rem;
	font-family: sans-serif;
}
.page {
	text-align: center;
}
</style>
