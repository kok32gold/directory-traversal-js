"use strict";
exports.__esModule = true;
var path = require("path");
function startsWith(txt, search, rawPos) {
    var pos = rawPos > 0 ? rawPos | 0 : 0;
    return txt.substring(pos, pos + search.length) === search;
}
function commonPrefix(paths) {
    var arr = paths.concat().sort();
    var startElement = arr[0];
    var endElement = arr[arr.length - 1];
    var L = startElement.length;
    var i = 0;
    while (i < L && startElement.charAt(i) === endElement.charAt(i))
        i++;
    return startElement.substring(0, i);
}
;
function safeJoin(rootFolder, filename) {
    rootFolder = path.join(path.normalize(rootFolder), '');
    var normalizedFullPath = path.normalize(path.join(rootFolder, filename));
    var commonPathPrefix = commonPrefix([normalizedFullPath, rootFolder]);
    if (!commonPathPrefix || !startsWith(commonPathPrefix, rootFolder)) {
        throw new Error("Requested filename is outside of root directory!");
    }
    return normalizedFullPath;
}
exports.safeJoin = safeJoin;
;
