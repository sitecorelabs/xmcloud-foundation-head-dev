---
# These are optional elements. Feel free to remove any of them.
status: proposed | preceded by [ADR-0001](0001-content-management-system.md)
date: 2023-04-07
deciders: Caitlin O'Toole, Adam Love, Chet Potvin
consulted: Jeff Rondeau
informed: Sitecore Practice Team
---
# Content Serialization - Sitecore Content Serialization (SCS)

## Context and Problem Statement

A significant portion of Headless Sitecore development is documenting, creating and promoting content from a local development environment up through non-prod and finally to production.  A comprehensive content serialization tool is required for this important task.

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* Must be compatible with the CMS chosen in [ADR-0001](0001-content-management-system.md)
* Must offer a way to visually serialize content within the IDE
* Must support automated deployment of content

## Considered Options

* Team Development for Sitecore (TDS)
* Sitecore Content Serialization (SCS)

## Decision Outcome

TBD

## Pros and Cons of the Options

### Team Development for Sitecore (TDS)

#### Pro

* :heavy_check_mark: The team has experience with this tool.
* :heavy_check_mark: We already have a license
* :heavy_check_mark: Code Generation comes out of the box

#### Cons

* :x: Requires custom docker configuration to use
* :x: Challenging to hook into deployment automation pipelines
* :x: Monolithic
  
### Sitecore Content Serialization (SCS)

#### Pro

* :heavy_check_mark: According to Sitecore: the best features of TDS and Unicorn
* :heavy_check_mark: Supported OOTB with XM Cloud
* :heavy_check_mark: Leverages the Sitecore CLI for all automation tasks
* :heavy_check_mark: Has a command line and visual interface
* :heavy_check_mark: Visual interface requires TDS license

#### Cons

* :x: Learning curve
* :x: Tightly coupled to the Management Tools installed on the server
