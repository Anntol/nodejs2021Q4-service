# syntax=docker/dockerfile:1

FROM node:lts-alpine

EXPOSE 3000

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD [ "npm", "start" ] 
