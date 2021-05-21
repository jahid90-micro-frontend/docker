#!/usr/bin/env sh

echo "Setting up the workspace..."

git clone git@github.com:jahid90-micro-frontend/gateway.git gateway
git clone git@github.com:jahid90-micro-frontend/web-service.git web-service
git clone git@github.com:jahid90-micro-frontend/page-service.git page-service
git clone git@github.com:jahid90-micro-frontend/layout-service.git layout-service
git clone git@github.com:jahid90-micro-frontend/content-service.git content-service
git clone git@github.com:jahid90-micro-frontend/widget-service.git widget-service

mkdir widgets
cd widgets

git clone git@github.com:jahid90-micro-frontend/nav-widget.git nav
git clone git@github.com:jahid90-micro-frontend/footer-widget.git footer
git clone git@github.com:jahid90-micro-frontend/home-widget.git home
git clone git@github.com:jahid90-micro-frontend/about-widget.git about
git clone git@github.com:jahid90-micro-frontend/not-found-widget.git not-found

echo "Done!"
