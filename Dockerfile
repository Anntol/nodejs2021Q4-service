# syntax=docker/dockerfile:1

FROM node:lts-alpine as build

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

FROM node:lts-alpine

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY . ./

EXPOSE ${PORT}

CMD [ "npm", "start" ] 
