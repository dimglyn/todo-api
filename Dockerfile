# FROM node:boron
FROM node:10.15.1-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN npm cache clean --force
RUN npm install --dev nodemon
RUN npm install

EXPOSE 8880

CMD npm start