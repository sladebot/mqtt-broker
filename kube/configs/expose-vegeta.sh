#! /usr/bin/env bash

kubectl expose deployment vegeta-broker --type=LoadBalancer --name=vegeta-broker-ext
