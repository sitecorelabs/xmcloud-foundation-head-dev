# SPA Starters Monorepo

This monorepo contains starter template for Angular Single Page Application (SPA) designed to be compatible with XM Cloud and a proxy application that will serve to support the SPA frameworks by handling server-side rendering (SSR), data queries, and middleware functionalities. The monorepo is designed to support various other SPA applications for different frameworks in the future as well as to enable users to create their own starter applications.

The monorepo is set up using [pnpm workspaces](https://pnpm.io/workspaces), so you need to have `pnpm` installed globally.

- `npm run install-build` installs all the dependencies of the monorepo and builds the angular SPA starter;
- `npm run build:angular` builds the angular SPA starter;
- `npm run start:angular` starts the angular SPA in production mode;

## Included Applications

For more information on the included applications follow the lnks:

- [Node XM Cloud Proxy](proxy/)
- [Angular SPA for XM Cloud](angular/)
- more to follow in the future

## Deplopying the a SPA Starter + Proxy to XM CLoud

- Create your repository based on this one;
- The default configuration would deploy the NsxtJS starter application, so to deploy your a SPA + Proxy you need to enable its rendering host in xmcloud.build.json and disable nextjsstarter (provided example below is for Angular SPA):
  ```json
      "renderingHosts": {
          "nextjsstarter": {
              ...
              "enabled": false,
              ...
          },
          "angularstarter": {
              ...
              "enabled": true,
              ...
          }
      },
  ```
- Push the updates;
- Log into the Sitecore XM Cloud Deploy Portal, create a project and a deployment using your code and select your repository;
- When deployment finishes succesfully create your site
- When site creation finishes succesfully, you should be able to see your site in Pages

## Running your local SPA Starter + Proxy against the XM CLoud instance

- Log into the Sitecore XM Cloud Deploy Portal, locate your Environment and select the `Developer Settings` tab.
- Ensure that the `Preview` toggle is enabled.
- In the `Local Development` section, click to copy the sample `.env` file contents to your clipboard.
- Open the `.env` file in the `./headapps/spa-starters/<your-spa-app>` folder and paste the contents from your clipboard.
- From the `Local Development section` copy the value of the JSS_EDITING_SECRET env variable and paste it as the value of JSS_EDITING_SECRET in the `.env` file of the proxy app `./headapps/spa-starters/proxy`
- Run the following commands in the root of the repository to start the your SPA application:
  ```bash
  cd headapps/spa-starters
  pnpm build:<your-spa-app>
  pnpm start:<your-spa-app>
  ```
- You should now be able to access your site on `http://localhost:3000`

## Running your local Angular SPA Starter + Proxy in local containers

By default the setup and scripts for running [local-containers](../../local-conatiners/) will deploy the NextJs application to the rendering container. If you want to run your SPA application you will have to make the following adjustments:

- in the [docker-compose.override.yml](../../local-conatiners/docker-compose.override.yml) file you have to point rendering service to use the spa-starters folder (instead of `../headapps/nextjs-starter`):
  ```yml
    rendering:
        ...
        volumes:
        - ../headapps/spa-starters:C:\app
        ...
  ```
- you need to update the rendering [docker file](../../local-conatiners/docker/build/rendering/Dockerfile):

  - set User to be ContainerAdministrator
  - install pnpm globally
  - adjust the entry point command

  See example below for Angular SPA:

```dockerfile
    ARG PARENT_IMAGE
    FROM ${PARENT_IMAGE} as debug

    RUN ECHO "setting up rendering app..."

    USER ContainerAdministrator

    RUN npm install -g pnpm

    WORKDIR /app

    EXPOSE 3000

    ENTRYPOINT "pnpm install && pnpm build:angular && pnpm start:angular"
```
