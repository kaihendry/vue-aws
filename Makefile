export PATH := $(shell npm bin):$(PATH)
REGION := ap-southeast-1
BUCKET := vueaws.dabase.com
VERSION = $(shell git describe --always)

dev:
	npm run dev

deploy:
	npm run build
	aws s3 --profile mine sync . s3://$(BUCKET) \
	--storage-class REDUCED_REDUNDANCY --exclude '*' \
	--include 'index.html' --include 'dist/build.js' \
	--acl public-read
	@echo http://$(BUCKET).s3-website-$(REGION).amazonaws.com/
	# http://vueaws.dabase.com.s3-website-ap-southeast-1.amazonaws.com

invalidate:
	@aws --profile mine cloudfront create-invalidation --distribution-id ERCN4ND82EM7Y \
	--invalidation-batch "{ \"Paths\": { \"Quantity\": 1, \"Items\": [ \"/*\" ] }, \"CallerReference\": \"$(shell date +%s)\" }"
	@echo Deployed to: https://$(BUCKET)
