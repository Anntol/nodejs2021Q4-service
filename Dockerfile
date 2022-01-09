# syntax=docker/dockerfile:1

FROM node:lts-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . ./

EXPOSE ${PORT}

CMD [ "npm", "start" ] 
