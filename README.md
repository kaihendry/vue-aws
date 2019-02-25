# Goal

Using AWS services from VueJS whilst authenticated from the browser. No
back-end like [Internal Github
login](https://github.com/unee-t/internal-github-login) used.

Uses [dynamic
imports](https://developers.google.com/web/updates/2017/11/dynamic-import) to
avoid Webpack hell, however this sadly doesn't work in Firefox without some
hoop jumping.

## Cons

Once associating the domain with the role, you can't really do fine grained
access user by user since each user would effectively have the same permissions
and the code is all run in the front end. Be wary that a user can effectively
set a break point and change your code to leverage what permissions they have.

# Authentication setup

<img src="https://s.natalian.org/2019-02-25/1551056818_2560x1440.png" alt="Google Client ID for Web application">
<img src="https://s.natalian.org/2019-02-25/1551056320_2560x1440.png" alt="Trust relasonship">

1. <https://console.developers.google.com/apis/credentials?project=vue-aws>
2. <https://console.aws.amazon.com/iam/home?region=ap-southeast-1#roles/vueaws>

A note about limiting it to your (company's) [Google Apps
domain](http://stackoverflow.com/questions/40098541/g-suite-identity-provider-for-an-aws-driven-browser-based-app).
