# Club Secretary Service

## Usage

```sh 
docker run \
--mount type=bind,source="$(pwd)"/database,target=/app/database \
-it $(docker build -q .)
```

