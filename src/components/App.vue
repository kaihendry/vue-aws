<template>
	<div id="app">
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
import AWS from 'aws-sdk/global'

window.onSignIn = function (googleUser) {

	const profile = googleUser.getBasicProfile()
	console.log(`ID: ${profile.getId()}`) // Don't send this directly to your server!
	console.log(`Full Name: ${profile.getName()}`)
	console.log(`Given Name: ${profile.getGivenName()}`)
	console.log(`Family Name: ${profile.getFamilyName()}`)
	console.log(`Image URL: ${profile.getImageUrl()}`)
	console.log(`Email: ${profile.getEmail()}`)

	// The ID token you need to pass to your backend:
	const idToken = googleUser.getAuthResponse().id_token
	console.log(`ID Token: ${idToken}`)

	let bucket = null
	const roleArn = 'arn:aws:iam::407461997746:role/vueaws'

	AWS.config.credentials = new AWS.WebIdentityCredentials({
		RoleArn: roleArn, WebIdentityToken: idToken,
	})

	AWS.config.update({
		region: 'ap-southeast-1',
		logger: console,
	})

	window.docClient = new AWS.DynamoDB.DocumentClient({region: 'ap-southeast-1'});

}

export default {
	name: "App",
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
