import { AwsDocClient } from '../services/aws.js'
import grid from './Grid.js'

export default {
  name: 'dynamodb',
  data: () => ({
    loading: true,
    total: 0,
    filteredItems: [],
    Limit: 10,
    LastEvaluatedKey: {},
    searchQuery: '',
    awsversion: AWS.VERSION,
    gridColumns: ['uuid', 'updated_at', 'status', 'title']
  }),

  template: `
<div class="page">
<span v-if="loading">Loading...</span>
<div v-if="!loading">
<p>Total: {{ total }}</p>
<label>Item limit <input v-model.number="Limit" type="number"></label>
<router-link v-if=" LastEvaluatedKey" :to="{ query: LastEvaluatedKey }" tag=button>Next</router-link>
<p>LastEvaluatedKey: {{ LastEvaluatedKey }}</p>

<demo-grid
:data="filteredItems"
:columns="gridColumns"
:filter-key="searchQuery">
</demo-grid>

</div>

  <button v-on:click="computeTotal">compute Total</button>
  <button v-on:click="computeFilteredItems">compute Filtered Items</button>

<p><a href="https://github.com/aws/aws-sdk-js/releases">AWS SDK version: {{ awsversion }}</a></p>
</div>`,
  methods: {
    async computeTotal () {
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

      this.total = await AwsDocClient.query(params).promise()
        .then((data) => {
          console.log('COUNT', data)
          document.title = `Status: ${this.$route.params.status.charAt(0).toUpperCase() + this.$route.params.status.slice(1)} has ${data.Count} items`
          return data.Count
        })
    },
    async computeFilteredItems () {
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

      this.filteredItems = await AwsDocClient.query(params).promise()
        .then((data) => {
          console.log(data)
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
