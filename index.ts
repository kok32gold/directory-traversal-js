import * as path from 'path';

function startsWith(txt: string, search: string, rawPos?: number) {
    const pos: number = rawPos > 0 ? rawPos|0 : 0;
    return txt.substring(pos, pos + search.length) === search;
}

function commonPrefix(paths: string[]): string {
    const arr: string[] = paths.concat().sort();
    const startElement: string = arr[0];
    const endElement: string = arr[arr.length - 1];
    const L: number = startElement.length;
    let i: number = 0;
    while (i < L && startElement.charAt(i) === endElement.charAt(i))
        i++;
    return startElement.substring(0, i);
};

export function safeJoin(rootFolder: string, filename: string): string {
    rootFolder = path.join(path.normalize(rootFolder), '');
    const normalizedFullPath: string = path.normalize(path.join(rootFolder, filename));
    const commonPathPrefix: string = commonPrefix([normalizedFullPath, rootFolder]);
    if (!commonPathPrefix || !startsWith(commonPathPrefix, rootFolder)) {
        throw new Error("Requested filename is outside of root directory!");
    }
    return normalizedFullPath;
};
