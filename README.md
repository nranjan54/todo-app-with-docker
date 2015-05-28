#To-Do App with delete option

#to pull mongo image
docker pull mongo:latest

#to create mongo container
docker run -v "$(pwd)":/data --name mongo -d mongo mongod --smallfiles

#to connect to mongo database with new contianer
docker run -it --link mongo:mongo --rm mongo sh -c 'exec mongo "$MONGO_PORT _27017_TCP_ADDR:$MONGO_PORT_27017_TCP_PORT/test"'

#to run mongo container
docker exec -it mongo bash

#to export database
mongodump --db test  --out /data/test-backup

#to restore database
mongorestore --db test-restored /data/test-backup/test

#to pull latest node image
docker pull node:latest

#to launch nodejs container
docker run -it --rm node

#to run nodejs app
docker run -it --name node -v "$(pwd)":/data --link mongo:mongo -w /data -p 8082:8082 node node server.js

