FROM node:6.5
MAINTAINER Souranil Sen <souranil.sen@stonybrook.edu>

# RUN mkdir /src
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

RUN     \
	apt-get -y -qq install python


RUN apt-get update \
	&& apt-get install -y wget make g++ ruby-full \
	&& apt-get install -y build-essential

RUN npm install && npm install -g gulp
ADD . /app

WORKDIR /app

RUN gulp

EXPOSE 1337

ENTRYPOINT ["bash", "-c"]
CMD ["node dist/vegeta.js"]
