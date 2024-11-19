# SPA Starters Monorepo

This monorepo contains starter template for Angular Single Page Application (SPA) designed to be compatible with XM Cloud and a proxy application that will serve to support the SPA frameworks by handling server-side rendering (SSR), data queries, and middleware functionalities. The monorepo is designed to support various other SPA applications for different frameworks in the future as well as to enable users to create their own starter applications.

The monorepo is set up using [pnpm workspaces](https://pnpm.io/workspaces), so you need to have `pnpm` installed globally.
- `npm run install-all` installs all dependencies of the monorepo;
- `npm run install-build` installs all the dependencies of the monorepo and builds the angular SPA starter;
- `npm run build:angular` builds the angular SPA starter;
- `npm run start:angular` starts the angular SPA in production mode; 

## Node XM Cloud Proxy

For more information on the XM Cloud Proxy application and its features take a look at [Node XM Cloud Proxy](proxy/)

## Angular SPA for xmcloud 

For more information on the Angular for xmcloud starter template and its features take a look at [Angular for XM Cloud starter app](angular/)

## Deplopying the Angular SPA Starter + Proxy to XM CLoud

- Create your repository based on this one;
- The default configuration would deploy the NsxtJS starter application, so to deploy Angular SPA + Proxy we need to make few updates in `xmcloud.build.json`:
    - choose a name for your rendering host and replace 'nextjsstarter' with it under `renderingHosts`
    - update the `path` property of your rendering host to `./headapps/spa-starters`
    - update `buildCommand` to `install-build`
    - update `runCommand` to `start:angular`

    ```json
        "renderingHosts": {
            "angularstarter": {
                "path": "./headapps/spa-starters",
                "nodeVersion": "20.14.0",
                "jssDeploymentSecret": "110F1C44A496B45478640DD36F80C18C9",
                "enabled": true,
                "type": "sxa",
                "buildCommand": "install-build",
                "runCommand": "start:angular"
            }
        },
    ```
- Push the updates;
- Log into the Sitecore XM Cloud Deploy Portal, create a project and a deployment using your code and select your repository;
- Sitename resolution in the NextJS starter is being done by the multisite plugin, since Angular does not support multisite yet we need to specify the name of the site in the environment variables. So when you create a site you need to go to your environment, open 'variables' tab and create a new variable with:
    - name: 'SITECORE_SITE_NAME'
    - value: the name of your site
    - target: 'Rendering host'
    - rendering host name: your host name from `xmcloud.build.json`
- you should now be able to see your site in Pages

## Running your local Angular SPA Starter + Proxy against the XM CLoud instance

- Log into the Sitecore XM Cloud Deploy Portal, locate your Environment and select the `Developer Settings` tab.
- Ensure that the `Preview` toggle is enabled.
- In the `Local Development` section, click to copy the sample `.env` file contents to your clipboard.
- Open the `.env` file in the `./headapps/spa-starters/angular` folder and paste the contents from your clipboard.
- From the `Local Development section` copy the value of the JSS_EDITING_SECRET env variable and paste it as the value of JSS_EDITING_SECRET in the `.env` file of the proxy app `./headapps/spa-starters/proxy`
- Run the following commands in the root of the repository to start the NextJs application:
    ```bash
    cd headapps/spa-starters
    pnpm install-all
    pnpm build:angular
    pnpm start:angular
    ```
- You should now be able to access your site on `http://localhost:3000`
