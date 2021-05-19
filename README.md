# MicroFrontend
The aim of this project is to provide a unified interface for all of the frontends of all the other projects.

- All frontends should be served under a common domain
- Sub-projects could be differentiated by path prefixes
- Each sub-project should be able to use its own stack irrespective of the stackchoices of the platform
- Each sub-project must adhere to a few interface guidelines to make the integration process streamlined
  - Each project must expose its components via WebComponents for client-side integrations
  - Each project must also expose the components for server side includes in a server
  
## Architecture

The high-level architecture of the platform is captured below.

![microfrontend.dark.png](https://github.com/jahid90-micro-frontend/docker/blob/main/images/micro-frontend.png)

## Request flow

- Request from a Client reaches the Gateway
- The gateway forwards the request to the WebService
- The WebService determines the page identifier based on the request
- The WebService consults the PageService to fetch the page layout for the page identifier
- The PageService consults the LayoutService for the layout
- The LayoutService returns the page metadata which includes the various slots on the page and their placements
- The PageService generates the page layout and returns the generated markup and the list of slots
- The WebService consults the ContentService to obtain metadata about the widgets to be placed on the page. The page and slot identifiers are sent along with the request
- The ContentService sends back the list of widgets to be placed in each slot
- The WebService queries the WidgetService for each of the widgets
- The WidgetService consults each individual Widget and returns the markup
- The WebService composes the page with the widget markup and sends back to the Gateway
- The Gateway checks the returned markup for server-side includes and processes them and updates the response
- The response is sent back to the Client
