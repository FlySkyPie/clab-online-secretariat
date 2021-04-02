# Discord Bot Service

## Usage

```sh 
docker run \
--rm \
--env-file .env \
-p 3030:3000 \
-it $(docker build -q .)
```

