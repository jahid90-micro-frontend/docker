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
    console.log(`Pulling package: ${package.name} ...`);

    if (!fs.existsSync('./' + package.path)) {

        console.log(`The package does not exist at path: "${package.path}". Skip pull.`);
        console.log();

    } else {

        console.log("Stashing unsaved work...");

        console.log("Running: git add .");
        runProc("git add .", package.path);
        console.log();

        console.log('Running: git stash');
        runProc("git stash || echo 'nothing to stash'", package.path);
        console.log();

        console.log('Running: git pull --rebase');
        runProc("git pull --rebase", package.path);
        console.log();

        console.log("Restoring unsaved work...")

        console.log("Running: git stash pop");
        runProc("git stash pop || echo 'Nothing to unstash'", package.path);

    }

    console.log("------------------------------------------------------------------------");
}

function runProc(proc, cwd) {

    const spawned = execSync(proc, { cwd: cwd, stdio: 'inherit' });

}
