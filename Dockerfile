FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY vue-Steam-Better-RecSys .

EXPOSE 3000

CMD ["npm", "run", "start"]