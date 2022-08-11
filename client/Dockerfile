FROM node:18-alpine3.15

RUN mkdir -p /srv/app/micc-delivery-challenge-client
WORKDIR /srv/app/micc-delivery-challenge-client
COPY package.json /srv/app/micc-delivery-challenge-client
COPY package-lock.json /srv/app/micc-delivery-challenge-client
COPY . /srv/app/micc-delivery-challenge-client
RUN npm install --production
RUN npm install -g serve
RUN npm run build

EXPOSE 3000
EXPOSE $PORT

CMD [ "serve", "-s", "build" ]