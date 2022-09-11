FROM node:12.18.3 as base


RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

RUN npm build 

COPY . /usr/src/app

EXPOSE 8080

CMD npm run start
