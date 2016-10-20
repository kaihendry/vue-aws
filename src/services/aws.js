import AWS from 'aws-sdk/global'

export default {
	init(googleUser) {
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

		const docClient = new AWS.DynamoDB.DocumentClient({region: 'ap-southeast-1'});

	},
	fetchDoc() {
		// not sure if docClient is bound properly for me to export the method
		return this.docClient.scan
	}
}


