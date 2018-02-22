FROM node:8-alpine

ENV NODE_ENV=production

ADD . /app
VOLUME [ "/app/uploads" ]
WORKDIR /app
RUN npm i --production

EXPOSE 9999

CMD [ "npm", "start" ]
