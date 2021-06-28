#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

const json = require('./packages.json');

for (const key in json) {

    const package = json[key];
    package.name = key;

    setTimeout(() => { handle(package); }, 1000);
}

function handle(package) {

    console.log("------------------------------------------------------------------------");
    console.log(`Checking package: ${package.name}`);

    if (fs.existsSync('./' + package.path)) {

        console.log(`The package already exists at path: "${package.path}". Skip cloning.`);

    } else {

        console.log(`Running: git clone ${package.repo} ${package.path}`);
        runProc(`git clone ${package.repo} ${package.path}`, package.path);

    }

    console.log("------------------------------------------------------------------------");
}

function runProc(proc, cwd) {

    const spawned = execSync(proc, { cwd: cwd, stdio: 'inherit' });

}
