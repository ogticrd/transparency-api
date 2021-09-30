# Servicio transparencia de empleados públicos ⛽️

[![Prod Deployment](https://github.com/opticrd/transparency-api/actions/workflows/prod-cd.yml/badge.svg)](https://github.com/opticrd/transparency-api/actions/workflows/prod-cd.yml)

## Tabla de contenidos

- [Servicio transparencia de empleados públicos ](#servicio-transparencia-de-empleados-públicos )
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Descripción y contexto](#descripción-y-contexto)
  - [Referencia del servicio](#referencia-del-servicio)
  - [Cómo iniciar](#cómo-iniciar)
  - [Stack de desarrollo](#stack-de-desarrollo)
    - [Servidor](#servidor)
    - [Base de datos](#base-de-datos)
  - [Descargo de responsabilidad](#descargo-de-responsabilidad)
  - [Autores](#autores)

## Descripción y contexto

Este servicio es un [wrapper](https://es.quora.com/Qu%C3%A9-es-exactamente-un-wrapper-API-Y-en-qu%C3%A9-se-diferencia-de-solo-una-API) de las consultas de nómina de la [Contraloría General de la República Dominicana](https://consultas.contraloria.gob.do/).

## Referencia del servicio

- [Documentación oficial](https://developers.digital.gob.do)

## Cómo iniciar

1. Configuración del repositorio

```sh
    # Clonar repositorio
    git clone https://github.com/opticrd/transparency-api.git;
```

2. Declarar y definir las variables de entorno

```sh
    # Crear archivo de variables de entorno
    cd transparency-api;
    touch .env;
```

```sh
    # Application
    PORT=
    API_VERSION=
    DEFAULT_PAGINATION_RESPONSE=
    NODE_ENV=

    # Database
    DB_HOST=
    DB_PORT=
    DB_USER=
    DB_NAME=
    DB_PASSWORD=
    DB_LOGGING=

    # Third Party Services
    TRANSPARENCY_API_TOKEN_EMAIL=
    COMPTROLLER_API_URI=
```

3. Instalar dependecias

```sh
    yarn
```

4. Correr proyecto

```sh
    npm run start:dev
```

## Stack de desarrollo

### Servidor

- Node.js
  - Nest.js Framework

### Base de datos

- Postgres

## Autores

Septiembre 2021

- [Marluan Espiritusanto](https://github.com/marluanespiritusanto)
