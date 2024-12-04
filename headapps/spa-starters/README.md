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

By default the setup and scripts for running local containers will create containers for both NextJS and Angular SPA + Node Proxy rendering hosts. For more information refer to [local-containers](../../local-conatiners/). 
Please note that running Angular + Proxy with local containers has limited functionality, due to it not supporting Experience Editor and limited communitcation with the CM container. During development we encourage running your local Angular SPA and Proxy directly against an XM Cloud instance both as rendering and editing host. 
