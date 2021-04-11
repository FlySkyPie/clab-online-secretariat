FROM node:15-alpine

WORKDIR /app

COPY . .

RUN npm install -g npm@7.8.0
RUN npm install

ENTRYPOINT [ "sh", "./cli/start.bash"]