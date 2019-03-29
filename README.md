# Docker

A prebuilt image exists on
[Dockerhub](https://hub.docker.com/r/mbellgb/ucl-assistant-server/), which you
can pull and run straight away. We recommend using a `.env` file for storing
your environment variables, but you could also just pass them into your docker
run command.

To run it locally, you can also use docker-compose:

    docker-compose build
    docker-compose up

# Non-Docker Development

Install and start `redis-server`:

    apt install redis-server
    service redis-server start

Run the auto-reloading nodemon server:

    yarn run start:dev


# Secrets

Copy example file and add your UCL API client ID and secret keys. Also, set
`SECRET` to a random value; this will be used for session keys. You can also add
a custom internal port for the server to run on, but for all intents and
purposes, leaving it works fine too (especially if running with Docker and/or
Kubernetes).

```bash
$ cp .env.example .env
$ nano .env

UCLAPI_CLIENT_ID=???
UCLAPI_CLIENT_SECRET=???
SECRET=???
```

# Run on Kubernetes

Build k8s secret from the env file created earlier.

```bash
$ kubectl create secret generic ucl-assistant-backend-secret --from-env-file='.env'
```

Now create the deployments and services from the YAML files:

```bash
$ kubectl create -f ../deployment/backend.yaml
$ kubectl create -f ../deployment/backend-service.yaml
```

And then the service will start up as `ucl-assistant-backend`.

# Running Tests

Run `yarn run test:dev` to run Jest in interactive mode where it'll re-run all tests as you develop.

To run tests on an ad hoc bases, use `yarn run test`
