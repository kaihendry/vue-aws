<template>
	<div class="page">
		<span v-if="loading">Loading...</span>
		<div v-if="!loading">
			<p>Count: {{ count }}</p>
			<ol>
				<li v-for="item in items">
					{{ item }}
				</li>
			</ol>
			<p v-if="items.length === 0">No data</p>
		</div>
	</div>
</template>

<script>
import { AwsDocClient } from '../services/aws'

export default {
  name: 'dynamodb',
  data: () => ({
    loading: true,
    items: [],
    count: 0,
    scannedcount: 0
  }),
  methods: {
    scan () {
      let params = {
        TableName: 'Movies'
      }

// http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
      AwsDocClient.scan(params, (err, data) => {
        this.loading = false
        console.log('error', err)
        if (!err) {
          console.log(data)
          this.items = data.Items
          this.count = data.Count
        }
      })
    }
  },
  created: function () {
    this.scan()
  }
}
</script>
