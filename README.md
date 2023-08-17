# sph-sim-jms

## Setup

1. Clone repository

```
git@github.com:framgia/sph-sim-jms.git
```

2. Add env file to `server` directory

```
DATABASE_URL="postgresql://postgres:postgres@db:5432/jms?schema=public"
```

3. Build docker

```
docker compose build
```

4. After succesful build, run

```
docker compose up -d
```

5. After successful setup, you can access the following:

### Web URL

-   http://localhost:3000

### Server URL

-   http://localhost:4000

To stop docker, run

```
docker compose stop
```

To run yarn commands for `web` or `server`, first run

```
docker exec -it web-next sh
```

or

```
docker exec -it server-nest sh
```

To exit, press `Ctrl+D` or run

```
exit
```
