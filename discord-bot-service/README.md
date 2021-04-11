# Discord Bot Service

## Usage

```sh 
docker run \
--rm \
--env-file .env \
-p 3020:3020 \
-it $(docker build -q .)
```

