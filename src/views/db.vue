<template>
<div class="page">
<button @click="scan">scan</button>
<p>Count: {{ count }}</p>
<ol>
<li v-for="item in items">
Artist: {{ item.Artist }}
Song title: {{ item.SongTitle }}
</li>
<p v-if="items.length === 0">No data</p>
</ol>
</div>
</template>

<script>
import 'aws-sdk/clients/dynamodb'

export default {
	name: "dynamodb",
	data() {
		return {
			items: [],
			count: 0,
			scannedcount: 0
		}
	},
	methods: {
		scan() {

			var params = {
				TableName: 'Music'
			};

			// http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
			window.docClient.scan(params, (err, data) => {
				console.log("error", err)
				if (data) {
					console.log(data)
					this.items = data.Items
					this.count = data.Count
				}
			})
		},
	},
	created: function () {
		// this.scan()
	}
}
</script>
