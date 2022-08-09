FROM node:16-alpine3.15

RUN mkdir -p /srv/app/micc-delivery-challenge-server
WORKDIR /srv/app/micc-delivery-challenge-server
COPY package.json /srv/app/micc-delivery-challenge-server
COPY package-lock.json /srv/app/micc-delivery-challenge-server/
RUN npm install --production
COPY . /srv/app/micc-delivery-challenge-server

CMD [ "node", "server.js" ]