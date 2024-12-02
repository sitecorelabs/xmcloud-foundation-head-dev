# escape=`

#
# Development-only image for running Angular starter plus Node Proxy app in a containerized environment.
# Assumes that the angular rendering host source is mounted to c:\app.
#

ARG PARENT_IMAGE
FROM ${PARENT_IMAGE} as debug

RUN ECHO "starting up angular rendering app..."

USER ContainerAdministrator

RUN npm install -g pnpm

WORKDIR /app

EXPOSE 3000

ENTRYPOINT "pnpm install && pnpm build:angular && pnpm start:angular"