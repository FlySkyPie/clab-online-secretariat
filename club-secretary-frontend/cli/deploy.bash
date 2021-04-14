#!/bin/bash
#title           :deploy.bash
#description     :This script used to build static files.
#author          :FlySkyPie (Wei Ji)
#date            :2021-04-15
#version         :0.1.1
#usage           :only call this script in docker container (bash ./cli/deploy.bash)
#notes           :--
#bash_version    :4.4.20(1)-release
#===============================================================================

npm run build

sed -i "s|http://localhost:3050|${API_SERVICE_URI}|g" dist/static/api.json

cp -rf dist/* /build/.