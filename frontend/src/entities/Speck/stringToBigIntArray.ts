const stringToBigIntArray = (str: string): bigint[] => {
    const parsed = JSON.parse(str);
    if (!Array.isArray(parsed)) {
        throw new Error("Строка не является массивом");
    }
    return parsed.map(s => {
        if (typeof s !== "string") {
            throw new Error(`Элемент ${s} не является строкой`);
        }
        return BigInt(s);
    });
};

export default stringToBigIntArray;