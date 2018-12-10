#!/bin/bash

echo "Building and deploying AdStation"
npm run build
echo "Build now done -- Deploy to google cloud"
source /Users/marinhogomes/Downloads/google-cloud-sdk/path.zsh.inc
gcloud compute scp --recurse /Users/marinhogomes/Sites/adstation/dist api-server:~/remote-destination --zone southamerica-east1-b
