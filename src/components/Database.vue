<template>
<!-- vim: set sw=2 sts=2 expandtab: -->
<div class="page">
<span v-if="loading">Loading...</span>
<div v-if="!loading">
<p>Count: {{ count }}</p>

<demo-grid
:data="filteredItems"
:columns="gridColumns"
:filter-key="searchQuery">
</demo-grid>

<p v-if="items.length === 0">No data</p>
</div>

<p><a href="https://github.com/aws/aws-sdk-js/releases">AWS SDK version: {{ awsversion }}</a></p>
</div>
</template>

<script>
import AWS from 'aws-sdk/global'
import { AwsDocClient } from '../services/aws'
import grid from './Grid.vue'

export default {
  name: 'dynamodb',
  data: () => ({
    loading: false,
    items: [],
    count: 0,
    searchQuery: '',
    awsversion: AWS.VERSION,
    scannedcount: 0,
    gridColumns: ['uuid', 'updated_at', 'status', 'title']
  }),
  asyncComputed: {
    filteredItems () {
      const status = this.$route.path.substring(1)
      if (status) {
        console.log("Status", status)

        var params = {
          TableName: "Movies",
          IndexName: 'status-updated_at-index',
          KeyConditionExpression: '#status = :key',
          ExpressionAttributeValues: {
            ':key': status
          },
          ExpressionAttributeNames: {
            '#status': 'status'
          }
        }

        return AwsDocClient.query(params).promise()
          .then((data) => {
            console.log(data)
            this.loading = false
            this.items = data.Items
            this.count = data.Items.length
            return data.Items
          })

      }
    }
  },
  components: {
    'demo-grid': grid
  }

}
</script>
