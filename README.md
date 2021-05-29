# MicroFrontend
The aim of this project is to provide a unified interface for all of the frontends of all the other projects.

- All frontends should be served under a common domain
- Sub-projects could be differentiated by path prefixes or sub-domains
- Each sub-project should be able to use its own stack irrespective of the stack choices of the platform
- Each sub-project must adhere to a few interface guidelines to make the integration process streamlined
  - Each project must expose its initial markup at its root path
  - The initial markup could be the complete markup needed to render it on the server-seid
  - The initial markup could also be a custom tag from a web component and links to assets render it client-side
  
## Architecture

The high-level architecture of the platform is captured below.

![micro-frontend.png](https://github.com/jahid90-micro-frontend/docker/blob/main/images/micro-frontend.png)

## Request Flow

![micro-frontend-sequence.jpg](https://github.com/jahid90-micro-frontend/docker/blob/dd528c5c133651a9de6de3135ec2c1d15d14ae30/images/micro-frontend.png)
