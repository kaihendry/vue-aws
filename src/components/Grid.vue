<template>
<!-- vim: set sw=2 sts=2 expandtab: -->

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
</div>
</template>


<script>

    export default {
      replace: true,
      props: {
        data: Array,
        columns: Array,
        filterKey: String
      },
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
            case "updated_at":
              return new Date(Number(entry[key]))
              break;
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
</script>

<style>
body {
  font-size: 14px;
  color: #444;
}

table {
  border: 2px solid #1a1a1a;
  border-radius: 3px;
  background-color: #fff;
  table-layout: auto;
  width: 100%;
}

th {
  background-color: #1a1a1a;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th, td {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}

span.doc-content {
  font-style:italic;
  font-size: 0.7em;
}
/* Zebra */
tbody tr:nth-child(odd) td {
    background-color: #D3D3D3;
}
</style>
