FROM node:20-alpine
WORKDIR /test_nodejs
COPY package.json .
RUN npm install
COPY . .
CMD ["node","./src/server.js"]