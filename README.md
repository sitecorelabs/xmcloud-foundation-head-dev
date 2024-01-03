# XM Cloud Kajoo Starter Kit (Next JS)

## QUICK START

1. In an ADMIN terminal:

    ```ps1
    .\init.ps1 -InitEnv -LicenseXmlPath "C:\path\to\license.xml" -AdminPassword "DesiredAdminPassword"
    ```

2. Restart your terminal and run:

    ```ps1
    .\up.ps1
    ```

3. Follow the instructions to [deploy to XM Cloud](#deploy-to-xmcloud)

***

## Deploy to XM Cloud

:warning: **Before initiating the deployment**: We urge you to dedicate a few minutes to review the Web.config [transformations](/src/platform/App_Data/Xdts/Web.config.xdt). This step is crucial for diagnosing and addressing any potential deployment issues.

To deploy to XMCloud follow the instructions provided by Sitecore [here](https://doc.sitecore.com/xmc/en/developers/xm-cloud/deploying-xm-cloud.html)

## About this Solution

This solution is designed based on Sitecore's XMCloud [starter template](https://github.com/sitecorelabs/xmcloud-foundation-head) to help get started quickly with XMCLoud + Kajoo.
