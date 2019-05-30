FROM node:carbon-alpine

WORKDIR /usr/src/server

ENV TINI_VERSION v0.16.1
ENV PORT 3000
ENV NODE_ENV production
ENV UCLAPI_CLIENT_ID ""
ENV UCLAPI_CLIENT_SECRET ""
ENV SECRET ""

RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

COPY package*.json ./

RUN npm ci --production

COPY . .

EXPOSE ${PORT}

USER node
CMD [ "npm", "start" ]