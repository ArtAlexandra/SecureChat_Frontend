import { createHash } from 'crypto';

const createUniqueKey = (str1: string, str2: string, date: Date): string => {

    const dateString = date.toISOString();
    const combined = str1 + str2 + dateString;

    return createHash('sha256')
        .update(combined)
        .digest('hex');
}

export default createUniqueKey;
