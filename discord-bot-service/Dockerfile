FROM node:15-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install -g npm
RUN npm install

COPY . .

ENTRYPOINT [ "sh", "./cli/start.bash"]