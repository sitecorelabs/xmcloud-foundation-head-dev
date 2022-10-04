# XM Cloud Starter Kit (Next JS)

## QUICK START

1. Copy your license file to the license folde:

2. In an ADMIN terminal:

    ```ps1
    .\init.ps1 -InitEnv -AdminPassword "DesiredAdminPassword"
    ```

3. Restart your terminal and run:

    ```ps1
    .\up.ps1
    ```

4. Follow the instructions to [deploy to XM Cloud](#deploy-to-xmcloud)

5. Create Edge token and [query from edge](#query-edge)

*** 

## About this Solution
This solution is designed to help developers learn and get started quickly
with XMCLoud + SXA.

## License File

If you store your license file in a central location, you can pass a LicenseXmlPath paramter to the init command to use that location. 

    ```ps1
    .\init.ps1 -InitEnv -LicenseXmlPath "C:\path\to\license.xml" -AdminPassword "DesiredAdminPassword"
    ```
