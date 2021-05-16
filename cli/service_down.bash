#!/bin/bash
#title           :service_down.bash
#description     :This script used to wrapped docker-compose and some script.
#author          :FlySkyPie (Wei Ji)
#date            :2021-05-13
#version         :0.1.0
#usage           :bash ./cli/service_down.bash
#requirement     :This script would modify iptables, make sure executor have permission.
#notes           :--
#bash_version    :4.4.20(1)-release
#===============================================================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

function prefixFun() {
    printf "${RED}${1}${NC}"
}

#parameter=${1}

# Run original service
docker-compose down

# Remove network setting which created by custom script.
bash ./cli/clean_iptables.bash | sed  "s/^/$(prefixFun "[Bridges Cleaner]") /"

exit 0