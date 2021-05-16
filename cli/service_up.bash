#!/bin/bash
#title           :service_up.bash
#description     :This script used to wrapped docker-compose and some script.
#author          :FlySkyPie (Wei Ji)
#date            :2021-05-13
#version         :0.1.0
#usage           :bash ./cli/service_up.bash
#requirement     :This script would modify iptables, make sure executor have permission.
#notes           :--
#bash_version    :4.4.20(1)-release
#===============================================================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

function prefixFun() {
    printf "${GREEN}${1}${NC}"
}

parameter=${1}

if [ -z "${parameter}" ]; then
    echo 'Source parameter are missing, end the process.'
    exit 0
fi


# Run original service
docker-compose up -d

# Fixing network setting.
bash ./cli/override_docker0.bash ${parameter} | sed  "s/^/$(prefixFun "[Docker0 Override]") /"
bash ./cli/override_iptables.bash ${parameter} | sed  "s/^/$(prefixFun "[Bridges Override]") /"

exit 0
