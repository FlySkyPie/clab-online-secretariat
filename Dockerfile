FROM node:15-alpine

WORKDIR /app

COPY . .

RUN npm install

ENTRYPOINT [ "sh", "./cli/start.bash"]