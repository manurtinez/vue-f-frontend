#!/bin/bash
set -a
[ -f .env ] && . .env

if test -f ".env"; then
  docker build --build-arg BASE_URL=$BASE_URL --build-arg CURRENT_API_VERSION=$CURRENT_API_VERSION --build-arg API_NAME=$API_NAME --build-arg LOCALES_PATH=$LOCALES_PATH --build-arg FB_APP_ID=$FB_APP_ID --build-arg PAGE_DOMAIN=$PAGE_DOMAIN $1 -f frontend.Dockerfile -t foxtrot/frontend:latest .
else
  echo ".env file is missing"
fi
