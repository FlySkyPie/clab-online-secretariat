# Club Secretary Service

## Usage

```sh 
docker run \
--rm \
--env HOSTNAME=http://localhost:3002 \
-p 3002:3050 \
-p 3001:3000 \
--mount type=bind,source="$(pwd)"/database,target=/app/database \
-it $(docker build -q .)
```

