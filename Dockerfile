FROM node:18

WORKDIR /app

EXPOSE 8000

COPY package.json .

RUN npm install --silent

COPY . .

CMD [ "npm", "run", "dev" ]