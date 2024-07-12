# XM Cloud Next.js Starter Kit - Disconnected offline mode
Below are the instructions for how to mock a small subset of the XM Cloud Application elements in offline mode using Docker. This can allow for a disconnected development, however it is recommend to work in the default connected mode for the best experience.

## Prerequisites
- DotNet 8.0 (https://dotnet.microsoft.com/en-us/download)
- Docker (https://www.docker.com/products/docker-desktop)
- A windows based machine is required to run the local containers

## Running the Containers
A number of PowerShell scripts have been provided to help you configure the repository and interact with the containers. These scripts are located in the `./localContainers/scripts` folder.

### Initialising the Repository
You first need to initialize the repository, which will configure how the different application elements will run. This will configure the different environment variables required for the Containers to build and run. You can do this by running the `./localContainers/scripts/init.ps1` script in a terminal with elevated privilidges:

```ps1
./localContainers/scripts/init.ps1 -InitEnv -LicenseXmlPath "C:\path\to\license.xml" -AdminPassword "DesiredAdminPassword"
```

### Running the Containers
After you have initialised the repository you can use the `./localContainers/scripts/up.ps1` script to build and run the containers:

```ps1
./localContainers/scripts/up.ps1
```

### Stopping the Containers
Once you have finished you can use the `./localContainers/scripts/down.ps1` script to stop the containers:

```ps1
./localContainers/scripts/down.ps1
```

This will stop all containers, and tidy up any resources that were created.