# XM Cloud Next.js Starter Kit - Disconnected offline mode
Below are the instructions for how to mock a small subset of the XM Cloud Application elements in offline mode using Docker. This can allow for a disconnected development, however it is recommend to work in the default connected mode for the best experience.

## Prerequisites
- DotNet 8.0 (https://dotnet.microsoft.com/en-us/download)
- Docker (https://www.docker.com/products/docker-desktop)
- A windows based machine is required to run the local containers

## Base Image Versions  
The containers configured here are setup to use the latest LTSC base container version released by Microsoft. If you are running a BaseOS that isn't compatible, you will need to ammend the `./localContainers/.env` file and use the `baseOs` parameter when running the `./localContainers/scripts/init.ps1` script. You can read more about the different base container versions on the [Microsoft Learn Site](https://learn.microsoft.com/en-us/virtualization/windowscontainers/deploy-containers/version-compatibility?tabs=windows-server-2022%2Cwindows-11)

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