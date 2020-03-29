"use strict"

const path = require("path")

const safeJoin = (rootFolder, filename) => {
    rootFolder = path.join(path.normalize(rootFolder), '');
    const normalizedFullPath = path.normalize(path.join(rootFolder, filename));
    const commonPathPrefix = commonPrefix([normalizedFullPath, rootFolder]);
    if (!commonPathPrefix || !commonPathPrefix.startsWith(rootFolder)) {
        throw new Error("Requested filename is outside of root directory!");
    }
    return normalizedFullPath;
};

const commonPrefix = (paths) => {
    const arr = paths.concat().sort();
    const startElement = arr[0];
    const endElement = arr[arr.length - 1];
    const L = startElement.length;
    let i = 0;
    while (i < L && startElement.charAt(i) === endElement.charAt(i))
        i++;
    return startElement.substring(0, i);
};

module.exports = {
    safeJoin
}
