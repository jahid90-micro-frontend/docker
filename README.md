# Infra
This repository contains code to setup a docker or a kubernetes system on a linux machine to host the MicroFrontend project.

Both the setups require the availability of [docker](https://www.docker.com/) on the host machine. The kubernetes setup additionally requires the availability of the [kind](https://kind.sigs.k8s.io/) executable to create docker-based kubernetes clusters. Helper aliases are provided in a [just](https://github.com/jahid90/just-cli) config file.

## Docker
The docker setup uses [docker-compose](https://docs.docker.com/compose/) to setup the containers and the required networks. The helper scripts are written using [nodejs](https://nodejs.org/).

### Setup

Fetch the necessary packages
```sh
./setup.js
./pull.js
```

Start the containers
```sh
docker-compose up -d
```

## Kubernetes

The kubernetes setup creates a `kind` cluster with a master node and two worker nodes. The commands require the [kubectl](https://kubernetes.io/docs/tasks/tools/) cli to run.

### Setup

Create the cluster
```sh
just cluster:up
```

To delete the cluster, run
```sh
just cluster:down
```

Setup the namespaces, loadbalancer, ingress and storege providers
```sh
just ns:up
just loadbalancer:up
just ingress:up
just storage:up
```

Each command has a `:down` variant to undo the changes from `:up`.

For the loadbalancer to work, update the ip address range in the config file. This should be from the same network as the cluster nodes. The cluster nodes are all part of the `kind` docker network. Inspect the network to find the network details.

```sh
docker network inspect kind
kubectl get nodes -o wide
```
The existing config is for the `172.18.0.1/16` subnet.

The storage provider uses nfs volumes. To make it work, setup an nfs server and update the configs with the details. Alternatively, the kind setup provides a `local-path-provisioner` which supports dynamic storage allocation from within a container. The downside of this is that the data will be lost when the cluster is brought down.

The ingress provider used is [traefik](https://traefik.io/).

The external ip of the ingress can be viewed from the output of
```sh
kubectl get svc -n traefik-system
```

The existing setup uses the domain `jahiduls.kube`. For it to work locally, an entry is made in the `/etc/hosts` file.

```text
<Ingress IP>    jahiduls.kube
```

All requests to the `jahiduls.kube` domain are intercepted locally and forwarded to the ingress controller in the kubernetes cluster.

## MicroFrontend
The aim of MicroFrontend project is to provide a unified interface for all of the frontends of all the other projects.

- All frontends should be served under a common domain
- Sub-projects could be differentiated by path prefixes or sub-domains
- Each sub-project should be able to use its own stack irrespective of the stack choices of the platform
- Each sub-project must adhere to a few interface guidelines to make the integration process streamlined
  - Each project must expose its initial markup at its root path
  - The initial markup could be the complete markup needed to render it on the server-seid
  - The initial markup could also be a custom tag from a web component and links to assets render it client-side

### Architecture

The high-level architecture of the platform is captured below.

![micro-frontend.png](https://github.com/jahid90-micro-frontend/docker/blob/main/images/micro-frontend.png)

### Request Flow

![micro-frontend-sequence.jpg](https://github.com/jahid90-micro-frontend/docker/blob/main/images/micro-frontend-sequence.png)
