#!/bin/bash
#title           :override_docker0.bash
#description     :This script used to override iptables setting, to fix network issue on Godaddy VPS.
#author          :FlySkyPie (Wei Ji)
#date            :2021-05-13
#version         :0.1.0
#usage           :bash ./cli/override_docker0.bash ${source}
#requirement     :This script would modify iptables, make sure executor have permission.
#notes           :--
#bash_version    :4.4.20(1)-release
#===============================================================================

parameter=${1}

if [ -z "${parameter}" ]; then
    echo 'Source parameter are missing, end the process.'
    exit 0
fi
echo "Using: ${parameter}"

# Back up original Masquerade.
DOCKER0_SOURCE=$(iptables -S -t nat |
    grep "^-A POSTROUTING -s [0-9]*\.[0-9]*\.[0-9]*\.[0-9]*.*-o docker0 .*" |
    sed -r -e "s/-A POSTROUTING -s ([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+\/[0-9]+).* -j MASQUERADE/\1/")

if [ -z "${DOCKER0_SOURCE}" ]; then
    echo "There're not docker0 MASQUERADE need to override."
    exit 0
fi

# Remove rules.
RULE_NUMBER=$(iptables -t nat -v -L POSTROUTING -n --line-number |
    grep ".*docker0.*0.0.0.0/0.*$" |
    sed -re "s/^([0-9]+).*/\1/")

iptables -t nat -D POSTROUTING ${RULE_NUMBER}
echo "run: iptables -t nat -D POSTROUTING ${RULE_NUMBER}"

# Add rules.
iptables -t nat -A POSTROUTING -s ${DOCKER0_SOURCE} ! -o docker0 -j SNAT --to-source ${parameter}
echo "run: iptables -t nat -A POSTROUTING -s ${DOCKER0_SOURCE} ! -o docker0 -j SNAT --to-source ${parameter}"

exit 0
