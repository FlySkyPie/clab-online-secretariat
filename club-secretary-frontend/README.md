# club-secretary-frontend

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Build in Docker

```shell 
mkdir build
docker run \
--rm \
--env API_SERVICE_URI=http://localhost:8080 \
--mount type=bind,source="$(pwd)"/build,target=/build \
-it $(docker build -q .)
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
