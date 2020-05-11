# FROM node:boron
FROM node:10.15.1-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN npm cache clean --force
RUN npm install --dev nodemon
RUN npm install

RUN npm install pm2 -g
RUN npm install -g babel-cli
RUN npm install --production

EXPOSE 8080

CMD [ "pm2-runtime start", "src/index.js", "--interpreter babel-node" ]