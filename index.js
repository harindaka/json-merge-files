#!/usr/bin/env node

(function main() {
    "use strict"
    if (process.argv.length !== 5) {
        console.log('USAGE: merge-json-files base-file override-file output-file');
        return;
    }

    let fs = require('fs');
    let merge = require('merge');
    let path = require('path');

    let baseFile = path.resolve(process.argv[2]);
    let overrideFile = path.resolve(process.argv[3]);
    let outputFile = path.resolve(process.argv[4]);

    let baseFileContent = JSON.parse(fs.readFileSync(baseFile, 'utf8'));
    let overrideFileContent = JSON.parse(fs.readFileSync(overrideFile, 'utf8'));

    let mergedContent = merge.recursive(true, baseFileContent, overrideFileContent);

    fs.writeFileSync(outputFile, JSON.stringify(mergedContent, null, 4));

    console.log('Merged to ' + outputFile);
})();