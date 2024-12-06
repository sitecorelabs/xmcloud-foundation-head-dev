# SPA Starter Kit Monorepo

The Starter Kit contains:

* [Node XM Cloud Proxy](proxy/)
* [Angular SPA](angular/)

It is designed to support various frameworks in the future as well as to enable users to create their own starter applications.

The monorepo is set up using [pnpm workspaces](https://pnpm.io/workspaces)

## Getting Started

1. Install PNPM
```shell
npm i pnpm -g
```

2. Install all the dependencies of the monorepo and build the SPA
```shell
npm run install-build:<your-spa-app>
```

3. [Optional] Re-build your SPA once you made changes
```shell
npm run build:<your-spa-app>
```

4. Start the SPA in production mode:
```shell
npm run start:<your-spa-app>
```

> \<your-spa-app\> - your SPA application. Currently the only one availble framework is Angular.

## Deployment

- Create your repository based on this one
- The default configuration would deploy the `Next.js` application. To deploy your `SPA + Proxy` you need to enable rendering host in `xmcloud.build.json` and disable `nextjsstarter` rendering host (provided example below is for Angular SPA):
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
- Push the updates
- Log into the Sitecore XM Cloud Deploy Portal, create a project and a deployment using your code and select your repository
- When deployment finishes succesfully create your site
- When site creation finishes succesfully, you should be able to see your site in Pages

## Local development against the XM Cloud instance

- Log into the Sitecore XM Cloud Deploy Portal, locate your `Environment` and select the `Developer Settings` tab.
- Ensure that the `Preview` toggle is enabled.
- In the `Local Development` section, click to copy the sample `.env` file contents to your clipboard.
- Open the `.env` file in the `./headapps/spa-starters/<your-spa-app>` folder and paste the contents from your clipboard. You can remove the JSS_EDITING_SECRET since it is not needed in your spa app's env.
- From the `Local Development section` copy and paste the value of the JSS_EDITING_SECRET env variable in the `.env` file of the proxy app `./headapps/spa-starters/proxy`
- Run the following commands in the root of the repository to start the your SPA application:
  ```bash
  cd headapps/spa-starters
  pnpm build:<your-spa-app>
  pnpm start:<your-spa-app>
  ```
- You should now be able to access your site on `http://localhost:3000`
- You can also [connect your localhost to Pages](https://doc.sitecore.com/xmc/en/developers/xm-cloud/connect-your-local-host-to-pages.html) to use it as editing host

> Running your local SPA + Proxy in local containers is not supported, since SPA + Proxy do not support Experience Editor and the above should cover all development flow use cases 
