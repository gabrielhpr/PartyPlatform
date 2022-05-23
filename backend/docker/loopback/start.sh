#!/usr/bin/env bash

#echo 'Checking up MySQL...'
#until mysql -u$MYSQL_USER -p$MYSQL_PASSWORD -h $MYSQL_HOST -e ";" ; do
#    echo 'Waiting MySQL...'
#    sleep 5
#done

DIR="/app/api"
if [[ ! -e $DIR ]]; then
  cd /app/ && npm run rebuild
fi

echo "Migrating DB..."
#cd /app/api && node migrate.js

echo 'Starting up API...'
if [ "$NODE_ENV" == "development" ]
then
  echo "Development MODE"
  pm2 start /app/docker/loopback/pm2/pm2-development.json
else
  echo "Production MODE"
  pm2 start /app/docker/loopback/pm2/pm2-production.json
fi

# Keep Container Running
tail -f /dev/null