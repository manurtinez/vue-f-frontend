# Install stage, for dev purposes
FROM node:15.4.0-alpine AS install

ENV PATH /frontend/node_modules/.bin:$PATH

# python, make and g++ are necessary for some npm dependencies
RUN apk add g++ make python

WORKDIR /home/node/app
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY --chown=node:node . ./
EXPOSE 3000

# Build static files
FROM install AS build

# ARG VARS
ARG BASE_URL
ARG CURRENT_API_VERSION
ARG API_NAME
ARG LOCALES_PATH
ARG FB_APP_ID
ARG PAGE_DOMAIN
# convert to ENV
ENV BASE_URL=$BASE_URL
ENV CURRENT_API_VERSION=$CURRENT_API_VERSION
ENV API_NAME=$API_NAME
ENV LOCALES_PATH=$LOCALES_PATH
ENV FB_APP_ID=$FB_APP_ID
ENV PAGE_DOMAIN=$PAGE_DOMAIN

RUN yarn generate

#nginx conf stage
FROM nginx:1.17.6 as stage
LABEL builder=false

COPY --from=build /home/node/app/dist/ /opt/frontend
COPY --from=build /home/node/app/locales/ /opt/frontend/locales
#COPY conf/nginx-proxy-stage.conf /etc/nginx/conf.d/default.conf
