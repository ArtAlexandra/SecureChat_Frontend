const stringToBigIntArray = (str: string): bigint[] => {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);

    const paddedBytes = new Uint8Array(16);

    paddedBytes.set(bytes.slice(0, 8));

    const view = new DataView(paddedBytes.buffer);
    return [
        view.getBigUint64(0, false),
        view.getBigUint64(8, false)
    ];
};

const sortStrings = (a: string, b: string): [string, string] => {
    return a.toLowerCase().localeCompare(b.toLowerCase()) < 0
        ? [a, b]
        : [b, a];
};

const createUniqueKey = (str1: string, str2: string): bigint[] => {
    const sortedKeys = sortStrings(str1, str2);
    return stringToBigIntArray(sortedKeys[0] + sortedKeys[1]);
};

export default createUniqueKey;