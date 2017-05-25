<template>
<!-- vim: set sw=2 sts=2 expandtab: -->
<div class="page">
<span v-if="loading">Loading...</span>
<div v-if="!loading">
<p>Toal: {{ total }}</p>
<label>Item limit <input v-model.number="Limit" type="number"></label>
<router-link v-if=" LastEvaluatedKey" :to="{ query: LastEvaluatedKey }" tag=button>Next</router-link>
<p>LastEvaluatedKey: {{ LastEvaluatedKey }}</p>

<demo-grid
:data="filteredItems"
:columns="gridColumns"
:filter-key="searchQuery">
</demo-grid>

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
    loading: true,
    Limit: 10,
    LastEvaluatedKey: {},
    searchQuery: '',
    awsversion: AWS.VERSION,
    gridColumns: ['uuid', 'updated_at', 'status', 'title']
  }),
  asyncComputed: {
total () {

      var params = {
        TableName: 'Movies',
        IndexName: 'status-updated_at-index',
        KeyConditionExpression: '#status = :key',
        ExpressionAttributeValues: {
          ':key': this.$route.params.status
        },
        ExpressionAttributeNames: {
          '#status': 'status'
        },
        Select: 'COUNT'
      }

      return AwsDocClient.query(params).promise()
        .then((data) => {
          console.log("COUNT", data)
          document.title = `Status: ${this.$route.params.status.charAt(0).toUpperCase() + this.$route.params.status.slice(1)} has ${data.Count} items`
          return data.Count
        })
    },

    filteredItems () {
      console.log('Route', this.$route)
      console.log('Route status', this.$route.params.status, 'Query', this.$route.query)
      const status = this.$route.params.status
      console.log('Status', status)

      var params = {
        TableName: 'Movies',
        Limit: this.Limit,
        ScanIndexForward: false,
        IndexName: 'status-updated_at-index',
        KeyConditionExpression: '#status = :key',
        ExpressionAttributeValues: {
          ':key': status
        },
        ExpressionAttributeNames: {
          '#status': 'status'
        }
      }

      if (this.$route.query.uuid) {
        console.log('Starting from', this.$route.query)
        params.ExclusiveStartKey = this.$route.query
      }

      return AwsDocClient.query(params).promise()
        .then((data) => {
          // console.log(data)
          this.loading = false
          this.LastEvaluatedKey = data.LastEvaluatedKey
          // this.count = data.Items.length
          return data.Items
        })
    }
  },
  components: {
    'demo-grid': grid
  }

}
</script>
