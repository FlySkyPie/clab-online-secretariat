#!/bin/bash
#title           :override_iptables.bash
#description     :This script used to override iptables setting, to fix network issue on Godaddy VPS.
#author          :FlySkyPie (Wei Ji)
#date            :2021-05-09
#version         :0.1.0
#usage           :bash ./cli/override_iptables.bash $(curl ifconfig.me 2>/dev/null)
#requirement     :This script would modify iptables, make sure executor have permission.
#notes           :--
#bash_version    :4.4.20(1)-release
#===============================================================================

parameter=${1}

if [ -z "${parameter}" ]; then
    echo "Type in IP address which going been SNAT source:"

    read USER_INPUT
    if [ -z "${USER_INPUT}" ]; then
        echo 'Empty input, end the process.'
        exit 0
    else
        parameter=${USER_INPUT}
    fi
fi
echo "Using: ${parameter}"

# Back up original Masquerade.
TABLE=$(iptables -S -t nat |
    grep "^-A POSTROUTING -s [0-9]*\.[0-9]*\.[0-9]*\.[0-9]*.*-o .*" |
    sed -r -e "s/-A POSTROUTING -s ([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+\/[0-9]+).*-o (.+) -j MASQUERADE/\1,\2/")

# Remove rules.
while true; do
    RULE_NUMBER=$(iptables -t nat -v -L POSTROUTING -n --line-number | grep "0.0.0.0/0.*$" | sed -re "s/^([0-9]+).*/\1/" | head -1)
    if [ -z "${RULE_NUMBER}" ]; then
        break
    else
        iptables -t nat -D POSTROUTING ${RULE_NUMBER}
        echo "run: iptables -t nat -D POSTROUTING ${RULE_NUMBER}"
    fi
done

# Add rules.
for row in ${TABLE}; do
    IP=$(echo ${row} | sed -r -e "s/(.*),.*/\1/")
    NAME=$(echo ${row} | sed -r -e "s/.*,(.*)/\1/")
    iptables -t nat -A POSTROUTING -s ${IP} ! -o ${NAME} -j SNAT --to-source ${parameter}
    echo "run: iptables -t nat -A POSTROUTING -s ${IP} ! -o ${NAME} -j SNAT --to-source ${parameter}"
done

exit 0
