const bigIntArrayToString = (arr: bigint[]): string => {
    return JSON.stringify(arr.map(b => b.toString()));
};

export default bigIntArrayToString;