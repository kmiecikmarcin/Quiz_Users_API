FROM node:12

RUN apt-get update && apt-get install -y build-essential make automake gcc g++ cpp libkrb5-dev libc6-dev man-db autoconf pkg-config

WORKDIR /usr/src/app

RUN npm install -g node-gyp
RUN npm install -g nodemon

COPY package*.json ./

RUN npm install

COPY . .

CMD ["nodemon","app.js"]