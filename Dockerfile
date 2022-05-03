# syntax=docker/dockerfile:1

FROM node:16.4.1

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

RUN npm install nodemon -g --quiet

COPY .  .

CMD ["npm","start","server.js"]