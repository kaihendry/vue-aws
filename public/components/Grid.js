export default {
  replace: true,
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  template: `
<div style="overflow-x:auto;">
<router-link to="/new">New</router-link>
<router-link to="/in-progress">In-Progress</router-link>
<router-link to="/processing">Processing</router-link>
<router-link to="/done">Done</router-link>
<table>
<thead>
<tr>
<th v-for="key in columns" @click="sortBy(key)" :class="{ active: sortKey == key }">
{{ key | capitalize }}
<span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
</span>
</th>
</tr>
</thead>
<tbody>
<tr v-if="!filteredData || filteredData.length == 0">
<td style="font-style: oblique;" colspan="100%">No values</td>
</tr>
<tr v-for="entry in filteredData">
<td v-for="key in columns" v-bind:class="key">
<span v-html="format(entry, key)"></span>
</td>
</tr>
</tbody>
</table>
</div>`,
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    format (entry, key) {
      switch (key) {
        case 'updated_at':
          return new Date(Number(entry[key]))
        default:
          return entry[key]
      }
    },
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
}
