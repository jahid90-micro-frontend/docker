#!/usr/bin/env node

const fs = require('fs');
const { spawn } = require('child_process');

const json = require('./packages.json');

for (const key in json) {

    const package = json[key];
    package.name = key;

    setTimeout(() => { handle(package); }, 1000);
}

function handle(package) {

    console.log(`Checking package: ${package.name}`);

    if (fs.existsSync('./' + package.path)) {

        console.log(`The package already exists at path: "${package.path}". Skip cloning.`);

    } else {

        console.log(`Running: git clone ${package.repo} ${package.path}`);

        const spawned = spawn("git", ["clone", package.repo, package.path]);

        spawned.stdout.on("data", data => {
            console.log(`${data}`);
        });

        spawned.stderr.on("data", error => {
            console.error(`${error}`);
        });

        spawned.on('error', (error) => {
            console.error(`${error}`);
        });

        spawned.on("close", code => {
            console.log(`exit: child process exited with code ${code}`);
        });
    }

    console.log();
}
