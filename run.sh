# NAME=rnd_frontend
# docker stop $NAME;
# docker rm -f $NAME;

# docker compose down
# docker compose build
# docker compose up -d

#!/bin/bash
NAME=svelte-custom-server-docker
docker rm -f $NAME
docker run -it -d \
    -p 4010:3333 \
    -v $(pwd):/usr/src/app \
    -w /usr/src/app \
    --restart=always \
    --name $NAME \
    node:20-alpine sh -c "node server.js"