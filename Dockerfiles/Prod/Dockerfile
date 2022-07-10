FROM node:14-alpine 


WORKDIR /usr/src

COPY package.json .
RUN npm install

COPY . .
COPY .env.production .env.production

EXPOSE 5000

CMD ["npm","run","start"]
