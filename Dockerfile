# the new image
FROM ubuntu:14.04
MAINTAINER Niraj Ranjan <ranjan.k.niraj@gmail.com>
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup | sudo bash -
#RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
#RUN echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
RUN apt-get update
RUN apt-get install -y nodejs build-essential
#RUN mkdir -p /data/db
#EXPOSE 27017
#ENTRYPOINT usr/bin/mongod
COPY . /3rd
RUN cd /3rd; npm install
EXPOSE 3000
CMD ["node", "/3rd/server.js"]