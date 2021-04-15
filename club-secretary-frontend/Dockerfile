FROM node:15-alpine

WORKDIR /app

COPY . .

#RUN npm install -g npm
RUN npm install

ENTRYPOINT [ "sh", "./cli/deploy.bash"]