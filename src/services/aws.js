import AWS from 'aws-sdk/global'
import 'aws-sdk/clients/dynamodb'

const ROLE_ARN = 'arn:aws:iam::407461997746:role/vueaws'

let AwsDocClient = null
let awsDocClientResolve = null
const awsDocClientInit = new Promise((resolve) => awsDocClientResolve = resolve)

export function getAwsDocClient() {
	return awsDocClientInit.then(() => AwsDocClient)
}

export function setAWSCredentials(idToken) {
	AWS.config.credentials = new AWS.WebIdentityCredentials({
		RoleArn: ROLE_ARN,
		WebIdentityToken: idToken,
	})

	AwsDocClient = new AWS.DynamoDB.DocumentClient({
		region: 'ap-southeast-1',
	})

	awsDocClientResolve()
}

AWS.config.update({
	region: 'ap-southeast-1',
	logger: console,
})