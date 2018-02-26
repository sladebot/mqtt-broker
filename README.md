![Build Status](https://travis-ci.com/sladebot/vegeta.svg?token=zxUVizLppNAh1hvbquCT&branch=master)


A broker which uses MQTT as the protocol to connect to any publisher / subscriber that connects to its endpoint. 

### How to run ?

This is completely dockerized and we encourage you to use the docker image to run it. The docker image is available at - `https://hub.docker.com/r/souranilsbu/vegeta/`. 

If you want to deploying it in a Kubernetes cluster, the scripts for its service and deployment is available in the folder - `kube/configs/`.

### How to connect to the broker ?

You can use `https://github.com/sladebot/trunks` or any MQTT complaint client to connect to the endpoint where you have deployed your broker. If its behind a Load Balancer you can just connect to it using a TCP connection. 

Personally I've used the `LoadBalancer` which Kubernetes provides. For that you need to expose the vegeta-service as an external service, the script to do that is at - `https://github.com/sladebot/vegeta/blob/master/kube/configs/expose-vegeta.sh`.
