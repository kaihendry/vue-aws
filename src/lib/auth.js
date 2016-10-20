import AWS from 'aws-sdk/global'

const ROLE_ARN = 'arn:aws:iam::407461997746:role/vueaws'

const auth = {
	idToken: null,
	profile: null,
	awsClient: null,
}

export default auth

export function signInHandler(googleUser) {
	auth.profile = googleUser.getBasicProfile()
	
	console.log(`ID: ${auth.profile.getId()}`) // Don't send this directly to your server!
	console.log(`Full Name: ${auth.profile.getName()}`)
	console.log(`Given Name: ${auth.profile.getGivenName()}`)
	console.log(`Family Name: ${auth.profile.getFamilyName()}`)
	console.log(`Image URL: ${auth.profile.getImageUrl()}`)
	console.log(`Email: ${auth.profile.getEmail()}`)

	// The ID token you need to pass to your backend:
	auth.idToken = googleUser.getAuthResponse().id_token
	
	console.log(`ID Token: ${auth.idToken}`)

	setupAWS()
}

function setupAWS() {
	AWS.config.credentials = new AWS.WebIdentityCredentials({
		RoleArn: ROLE_ARN,
		WebIdentityToken: auth.idToken,
	})

	AWS.config.update({
		region: 'ap-southeast-1',
		logger: console,
	})

	auth.awsClient = new AWS.DynamoDB.DocumentClient({
		region: 'ap-southeast-1',
	})
}