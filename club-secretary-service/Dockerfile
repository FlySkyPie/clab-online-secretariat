FROM node:15-alpine

WORKDIR /app

#RUN apk update && apk add --update npm --no-cache

COPY package*.json ./
RUN npm install -g npm
RUN npm install

COPY . .

ENTRYPOINT [ "sh", "./cli/start.bash"]