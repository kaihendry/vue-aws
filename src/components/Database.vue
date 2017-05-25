<template>
<!-- vim: set sw=2 sts=2 expandtab: -->
<div class="page">
<span v-if="loading">Loading...</span>
<div v-if="!loading">
<p>Count: {{ count }}</p>
<input v-model.number="Limit" type="number">
<p>LastEvaluatedKey: {{ LastEvaluatedKey }}</p>
<router-link :to="{ query: LastEvaluatedKey }">Next {{ Limit }}</router-link>

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
    loading: false,
    items: [],
    count: 0,
    Limit: 10,
    LastEvaluatedKey: {},
    searchQuery: '',
    awsversion: AWS.VERSION,
    gridColumns: ['uuid', 'updated_at', 'status', 'title']
  }),
  asyncComputed: {
    filteredItems () {
      console.log('Route', this.$route)
      console.log('Route status', this.$route.params.status, 'Page', this.$route.params.page, 'Query', this.$route.query)
      const status = this.$route.params.status
      console.log('Status', status)

      var params = {
        TableName: 'Movies',
        Limit: this.Limit,
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
          console.log(data)
          this.loading = false
          this.items = data.Items
          this.LastEvaluatedKey = data.LastEvaluatedKey
          this.count = data.Items.length
          return data.Items
        })
    }
  },
  components: {
    'demo-grid': grid
  }

}
</script>
