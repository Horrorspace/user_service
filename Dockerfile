FROM node:14.18-alpine3.14

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# rmq
EXPOSE 4369
EXPOSE 5671
EXPOSE 5672
EXPOSE 15671
EXPOSE 15672
EXPOSE 25672

# mongo
EXPOSE 27017

CMD ["npm", "run", "start:prod"]