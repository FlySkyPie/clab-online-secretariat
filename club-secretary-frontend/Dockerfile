FROM node:15-alpine

WORKDIR /app

COPY package.json .
COPY  yarn.lock .
#RUN npm install -g npm
RUN yarn

COPY . .

ENTRYPOINT [ "sh", "./cli/deploy.bash"]