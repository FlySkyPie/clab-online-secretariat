#!/bin/bash
#title           :start.bash
#description     :This script used to start the service.
#author          :FlySkyPie (Wei Ji)
#date            :2021-04-02
#version         :0.1.0
#usage           :bash ./cli/start.bash
#notes           :--
#bash_version    :4.4.20(1)-release
#===============================================================================

DATABASE_FILE=./database/db.sqlite
if [ ! -f "${DATABASE_FILE}" ]; then
    npx sequelize-cli db:migrate 
fi
export NODE_ENV=production
npx babel-node app/index.js