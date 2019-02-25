// import AWS from 'aws-sdk/global'
// import 'aws-sdk/clients/dynamodb'

const ROLE_ARN = 'arn:aws:iam::407461997746:role/vueaws'

export let AwsDocClient = null

export function setCredentials (idToken) {
  AWS.config.credentials = new AWS.WebIdentityCredentials({
    RoleArn: ROLE_ARN,
    WebIdentityToken: idToken
  })

  AwsDocClient = new AWS.DynamoDB.DocumentClient({
    region: 'ap-southeast-1'
  })
}

export function destroy () {
  AwsDocClient = null
}

AWS.config.update({
  region: 'ap-southeast-1',
  logger: console
})
