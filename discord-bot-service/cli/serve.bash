#!/bin/bash
#title           :serve.bash
#description     :This script used to start the service in development.
#author          :FlySkyPie (Wei Ji)
#date            :2021-04-02
#version         :0.1.1
#usage           :bash ./cli/serve.bash
#notes           :--
#bash_version    :4.4.20(1)-release
#===============================================================================

if [ -f .env ]
then
    export $(cat .env | xargs)
fi

npx babel-node app/index.js