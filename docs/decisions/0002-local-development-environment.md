---
# These are optional elements. Feel free to remove any of them.
status: accepted | preceded by [ADR-0001](0001-content-management-system.md)
date:  2023-03-24 
deciders: Caitlin O'Toole, Adam Love, Chet Potvin 
consulted: Jeff Rondeau
informed: Sitecore Practice Team 
---
# Local Development Environment - Docker

## Context and Problem Statement

Which technologies should be used for local Sitecore development environments?

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* Must follow Sitecore roadmap
* A developer should be able to spin up a local environment within 4 hours or less
* Must support debugging, one-click publish and the two primary serialization options: TDS and SCS

## Considered Options

* IIS
* Docker

## Decision Outcome

Chosen option: "Docker", because there is no IIS option for developing against XM Cloud.

## Pros and Cons of the Options

### IIS

#### Pro

* :heavy_check_mark: The team has significant experience in this environment
* :heavy_check_mark: Can run multiple environments at once
* :heavy_check_mark: Easy to reconfigure the web server

#### Cons

* :x: Setup is manual and time-consuming
* :x: No options for developing on XM Cloud
* :x: Very resource-intensive running multiple environments on one machine

### Docker

#### Pro

* :heavy_check_mark: Allows for layered development approach.
* :heavy_check_mark: Environments can be spun up in less than an hour 
* :heavy_check_mark: Can develop on top of latest XM Cloud images

#### Cons

* :x: Significant learning curve
* :x: Can only run one environment at-a-time
