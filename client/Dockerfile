FROM node:18-alpine3.15

RUN mkdir -p /srv/app/micc-delivery-challenge-client
WORKDIR /srv/app/micc-delivery-challenge-client
COPY package.json /srv/app/micc-delivery-challenge-client
COPY package-lock.json /srv/app/micc-delivery-challenge-client
RUN npm install --production
COPY . /srv/app/micc-delivery-challenge-client

CMD [ "npm", "start" ]