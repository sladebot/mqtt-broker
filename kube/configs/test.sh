!#/bin/bash


tcpdump -G 60 -W 1 -w pub.pcap -i en0 'port 1883'
