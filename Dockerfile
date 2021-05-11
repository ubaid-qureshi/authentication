
FROM node:12

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app/

RUN npm install --only=prod --silent

COPY . /app

EXPOSE 80

ENTRYPOINT node src/app.js
