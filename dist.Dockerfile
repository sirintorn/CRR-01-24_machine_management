FROM node:22-alpine as staging

WORKDIR /app

COPY package*.json .

RUN npm install --verbose

COPY . .

EXPOSE 4200

CMD ["node", "/src/index.js"]

#run $ sudo docker build --network=host -t master-data-config .
#then you're good to go

