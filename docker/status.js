#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

const json = require('./packages.json');

for (const key in json) {

    const package = json[key];
    package.name = key;

    handle(package);

}

function handle(package) {

    console.log("------------------------------------------------------------------------");
    console.log(`Checking package: ${package.name} ...`);

    if (!fs.existsSync('./' + package.path)) {

        console.log(`The package does not exist at path: "${package.path}". Skip push.`);
        console.log();

    } else {

        console.log("Running: git status");
        runProc("git status", package.path);

    }

    console.log("------------------------------------------------------------------------");
}

function runProc(proc, cwd) {

    const spawned = execSync(proc, { cwd: cwd, stdio: 'inherit' });

}
