FROM node:6.5
MAINTAINER Souranil Sen <souranil.sen@stonybrook.edu>

# RUN mkdir /src
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

RUN     \
	apt-get -y -qq install python

EXPOSE 1337

RUN apt-get update \
	&& apt-get install -y wget make g++ ruby-full \
	&& apt-get install -y build-essential

ADD package.json /src/package.json
RUN cd /src && yarn

RUN apt-get install -y ruby ruby-dev
ADD . /src
# Set working directory
WORKDIR	/src

CMD ["node server.js"]