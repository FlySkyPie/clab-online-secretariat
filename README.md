# Club Secretary Service


## Development

```shell
npm run start
```

## Usage

```shell 
docker run \
--rm \
--env HOSTNAME=http://localhost:3002 \
-p 3050:3050 \
-p 3030:3030 \
--mount type=bind,source="$(pwd)"/database,target=/app/database \
-it $(docker build -q .)
```

