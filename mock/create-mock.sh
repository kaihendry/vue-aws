#!/bin/bash
node index.js
aws --profile mine dynamodb batch-write-item \
	    --request-items file://test-items.json
