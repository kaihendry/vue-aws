# Goal

Using AWS services from VueJS whilst authenticated from the browser.

Since JSFiddle can't be used for [VUE](http://vuejs.org/) component files, I
guess the only way to do this is to setup an entire Github project to
demonstrate my issue.

<http://forum.vuejs.org/t/vue-component-start/1716>

# To run

	yarn
	npm run dev

Authenticate with any Google account from http://localhost:8080

# Implementation notes

Uses the router with the idea being I can build user interfaces around several
AWS services.

# Authentication setup

<img src=http://s.natalian.org/2016-10-20/1476933346_2558x1404.png alt="Trust relasonship">

1. <https://console.developers.google.com/apis/credentials?project=kubernetes-tutorial-146110>
2. <https://console.aws.amazon.com/iam/home?region=ap-southeast-1#roles/vueaws>
