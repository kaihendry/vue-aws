<template>
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
    loading: true,
    items: [],
    count: 0,
    searchQuery: '',
    awsversion: AWS.VERSION,
    scannedcount: 0,
    gridColumns: ['uuid', 'updated_at', 'status', 'title']
  }),
  computed: {
    filteredItems () {
      const status = this.$route.path.substring(1)
      if (status) {
        console.log("Status", status)
        return this.items.filter(item => item.status === status)
      }
      return this.items
    }
  },
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
  },
  components: {
    'demo-grid': grid
  }

}
</script>
