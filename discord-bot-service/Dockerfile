FROM node:15-alpine

WORKDIR /app

COPY package.json .
COPY  yarn.lock .
RUN yarn

COPY . .

ENTRYPOINT [ "sh", "./cli/start.bash"]