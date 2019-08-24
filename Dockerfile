FROM node:lts-alpine

WORKDIR /usr/src/server

ENV TINI_VERSION=v0.16.1

RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE ${PORT}

USER node
CMD [ "npm", "start" ]