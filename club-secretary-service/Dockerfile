FROM node:15-alpine

WORKDIR /app

#RUN apk update && apk add --update npm --no-cache

COPY package.json .
COPY  yarn.lock .
RUN yarn

COPY . .

ENTRYPOINT [ "sh", "./cli/start.bash"]