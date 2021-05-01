#!/bin/bash
#title           :deploy.bash
#description     :This script used to build static files.
#author          :FlySkyPie (Wei Ji)
#date            :2021-04-15
#version         :0.2.0
#usage           :only call this script in docker container (bash ./cli/deploy.bash)
#notes           :--
#bash_version    :4.4.20(1)-release
#===============================================================================

CURRENT_VERSION=$(node -p -e "require('./package.json').version")

if [ -d /build ] && [ -f /build/static/api.json ]; then
    PREVIOUS_VERSION=$(node -p "require('/build/static/api.json').version")

    if [[ "${PREVIOUS_VERSION}" == "${CURRENT_VERSION}" ]]; then
        echo "The frontend already been built: ${CURRENT_VERSION}"
        echo "Skip buiding."
        exit 0
    fi
fi

npm run build

sed -i "s|http://127.0.0.1:3050|${API_SERVICE_URI}|g" dist/static/api.json
sed -i "s|VERSION|${CURRENT_VERSION}|g" dist/static/api.json

cp -rf dist/* /build/.
