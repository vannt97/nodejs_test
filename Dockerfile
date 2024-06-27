FROM node:20-alpine
WORKDIR /home/test_nodejs
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["node","./build/server.js"]