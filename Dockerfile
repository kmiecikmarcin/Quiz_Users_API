FROM node:12

RUN apt-get update && apt-get install -y build-essential make automake gcc g++ cpp libkrb5-dev libc6-dev man-db autoconf pkg-config

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g node-gyp
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node","app.js"]
