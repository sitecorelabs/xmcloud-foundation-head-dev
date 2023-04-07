---
# These are optional elements. Feel free to remove any of them.
status: accepted
date: 2023-03-24 
deciders: Jeff Rondeau, Caitlin O'Toole, Adam Love, Chet Potvin
consulted: Ryan Heap
informed: Sitecore Practice Team
---
# Content Management System - Sitecore XM Cloud

## Context and Problem Statement

Which Content Management System should be used as a reference point for the starter kit?

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* Must follow Sitecore Roadmap
* Documentation should be plentiful and easy to follow
* Development should be easier than traditional implementations
* A champion is required

## Considered Options

* Sitecore XM 10.3+
* Sitecore XM Cloud
* Sitecore Content Hub One

## Decision Outcome

Chosen option: "Sitecore XM Cloud", because Sitecore's future and the future of this practice is dependent on the success of the SaaS platform.

<!-- This is an optional element. Feel free to remove. -->
## Pros and Cons of the Options

### Sitecore XM 10.3+

#### Pro

* :heavy_check_mark: Familiar to the development team
* :heavy_check_mark: Has its own authentication provider in Sitecore Identity
* :heavy_check_mark: Local development can leverage IIS or containers

#### Cons

* :x: Does not follow Sitecore's Composable Roadmap
* :x: Encourages the status-quo

### Sitecore XM Cloud

#### Pros

* :heavy_check_mark: The future of the Sitecore CMS
* :heavy_check_mark: Simple CMS platform (even simpler than XM)
* :heavy_check_mark: Exciting, New technology
* :heavy_check_mark: SaaS-based

#### Cons

* :x: Learning curve with new technology (docker, SCS, etc)
* :x: Unproven in our Production experience
* :x: Requires a Sitecore Cloud organization and login for each team member

### Sitecore Content Hub One

#### Pros

* :heavy_check_mark: Content is less-structured
* :heavy_check_mark: Loosely with front-end frameworks

#### Cons

* :x: Page and Layout Design cannot be managed by the author
  