FROM node:erbium-alpine
# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["sh", "-c", "npm run ${node_env}"]
