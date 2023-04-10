---
# These are optional elements. Feel free to remove any of them.
status: proposed
date: 2023-04-10
deciders: Caitlin O'Toole, Adam Love, Chet Potvin
consulted: Jeff Rondeau
informed: Sitecore Practice Team
---
# Solution and Feature Scaffolding

## Context and Problem Statement

Ideally, the starter kit should behave like a restaurant.  There is basic service that you'd expect when you sit down at the table, which is the overall solution with core modules.  Then you choose what you'd like based on your tastes and appetite.  This is where module scaffolding comes into play.  These are the features and project modules to use Helix terminology.  The scaffolding 'engine' that we create is the kitchen and we need it to operate efficiently in order for our restaurant to succeed.  

**This is where most of the contributions will happen in the starter kit, so it will need to be intuitive.**

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* Low barrier to entry
* Small learning curve
* Testability
* Documentation / Community Support

## Considered Options

* [PlopJS](https://plopjs.com/)
* [dotnet CLI](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-new)

## Decision Outcome

Chosen option: "{title of option 1}", because
{justification. e.g., only option, which meets k.o. criterion decision driver | which resolves force {force} | … | comes out best (see below)}.

<!-- This is an optional element. Feel free to remove. -->
## Pros and Cons of the Options

### PlopJS

#### Pro

* :heavy_check_mark: A team subset has experience with this tool.
* :heavy_check_mark: Simple and easy to use
* :heavy_check_mark: Very flexible
* :heavy_check_mark: Free

#### Cons

* :x: Requires `npm` package that must be installed before using
* :x: Difficult to test before scaffolding
* :x: Doesn't integrate with Visual Studio

### dotnet CLI

#### Pro

* :heavy_check_mark: Good documentation and learning tools from Microsoft
* :heavy_check_mark: The scaffolding tool of choice for Sitecore DevEx team
* :heavy_check_mark: Templates (pre-scaffolded code) testable in Visual Studio
* :heavy_check_mark: Integrates with Visual Studio allowing for modification of `sln` file
* :heavy_check_mark: Free

#### Cons

* :x: Documentation is more specific to `dotnet` as a whole rather than Sitecore
* :x: Medium learning curve (can pick it up in a day)
