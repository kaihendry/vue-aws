<template>
	<div class="page">
		<p>Count: {{ count }}</p>
		<ol>
			<li v-for="item in items">
				Artist: {{ item.Artist }}
				Song title: {{ item.SongTitle }}
			</li>
		</ol>
		<p v-if="items.length === 0">No data</p>
	</div>
</template>

<script>
import { signedIn } from '../services/auth'
import { getAwsDocClient } from '../services/aws'

export default {
	name: 'dynamodb',
	data: () => ({
		items: [],
		count: 0,
		scannedcount: 0,
	}),
	methods: {
		scan() {
			let params = {
				TableName: 'Music'
			}

			getAwsDocClient().then((AwsDocClient) => {
				// http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
				AwsDocClient.scan(params, (err, data) => {
					console.log('error', err)
					if (data) {
						console.log(data)
						this.items = data.Items
						this.count = data.Count
					}
				})
			})
		},
	},
	created: function () {
		this.scan()
	}
}
</script>
