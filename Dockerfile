FROM node:13.7.0
WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn

COPY . .

RUN yarn build
WORKDIR dist/

EXPOSE 3000
CMD ["node", "api/app.ts"]
