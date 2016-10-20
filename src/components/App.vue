<template>
	<div id="app">
		<p>Goal: Google login &rarr; AWS login (STS) &rarr; AWS.DynamoDB.DocumentClient
		<p>Without button. Without Window object ideally.
		<p>
		<router-link to="/">Amazon DynamoDB</router-link>
		</p>
		<router-view></router-view>
		<p><a href=https://github.com/kaihendry/vue-aws>Source code</a></p>
	</div>
</template>

<script>
export default {
	name: "App",
}
</script>

<style>
body {
	margin: 0;
	font-size: 2rem;
	font-family: sans-serif;
}
.page {
	text-align: center;
}
</style>
