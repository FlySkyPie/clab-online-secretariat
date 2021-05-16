#!/bin/bash
#title           :clean_iptables.bash
#description     :This script used to override iptables setting, to fix network issue on Godaddy VPS.
#author          :FlySkyPie (Wei Ji)
#date            :2021-05-16
#version         :0.1.0
#usage           :bash ./cli/clean_iptables.bash $(curl ifconfig.me 2>/dev/null)
#requirement     :This script would modify iptables, make sure executor have permission.
#notes           :--
#bash_version    :4.4.20(1)-release
#===============================================================================

# Back up original Masquerade.
TABLE=$(iptables -S -t nat |
    grep "^-A POSTROUTING -s [0-9]*\.[0-9]*\.[0-9]*\.[0-9]*.*-o .*-j SNAT" |
    sed -r -e "s/-A POSTROUTING -s ([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+\/[0-9]+).*-o (.+) -j SNAT.*/\1,\2/")

# Remove rules.
for row in ${TABLE}; do
    IP=$(echo ${row} | sed -r -e "s/(.*),.*/\1/")
    NAME=$(echo ${row} | sed -r -e "s/.*,(.*)/\1/")
    if [ "${NAME}" = "docker0" ]; then
        continue
    fi

    RULE_NUMBER=$(iptables -t nat -v -L POSTROUTING -n --line-number |
        grep ".*SNAT.*${NAME}.*${IP}.*0.0.0.0/0.*$" |
        sed -re "s/^([0-9]+).*/\1/")
    if [ -z "${RULE_NUMBER}" ]; then
        echo "This shouldn't happen :V"
        continue
    fi
    iptables -t nat -D POSTROUTING ${RULE_NUMBER}
    echo "Run command: 'iptables -t nat -D POSTROUTING ${RULE_NUMBER}'"
done

exit 0
