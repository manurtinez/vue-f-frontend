# Foxtrot Frontend Project

This is the frontend project for the Foxtrot product.

It is a web app built using Nuxt.JS and VueJS, and using the Vuetify UI library.

To run it, you need to have both Docker and Docker-compose installed. For instructions, refer to the [foxtrot-docker](https://github.com/manu/foxtrot-docker) README.

# Setup

## Env variables

Copy the content of the `.env.example` file in a new file called `.env`

```bash
cp .env.example .env
```

Then, fill it with the necessary vars. For now, all the necessary vars are pre-filled.

## Docker image

To build the frontend docker image, run the build script:

```bash
./build_frontend.sh
```

Or:

```bash
bash build_frontend.sh
```

You can pass docker arguments like:

- `--no-cache` for ignoring previous cache when building
- `--target=install` for developing, `--target=build` for production and `--target=stage` for staging

## Commands (from the docker project directory)

To install dependencies:

```bash
./execute frontend yarn add [-D for dev-dependency] <dependency>
```

To remove dependencies:

```bash
./execute frontend yarn remove <dependency>
```

To run tests:

```bash
./execute frontend yarn test [optionally <test file name>]
```

To run tests in watch mode:

```bash
./execute frontend yarn watch [optionally <test file name>]
```

# Local setup

In case of not using Docker for some reason, you can setup a local develop environment running:

```bash
yarn install
yarn dev
```

Afterwards, you can run the same commands as above _without_ the `./execute frontend` prefix.
