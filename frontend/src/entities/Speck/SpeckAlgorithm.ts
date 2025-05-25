export class SpeckCipher {
    private keySchedule: bigint[];
    static readonly BLOCK_WORDS = 2;
    static readonly KEY_WORDS = 2;
    static readonly WORD_BITS = 32;
    static readonly ROUNDS = 32;

    constructor(key: bigint[]) {
        if (key.length !== 2) {
            throw new Error("Speck64/128 requires 128-bit key (2x 64-bit words)");
        }
        this.keySchedule = this.expandKey(key);
    };

    private expandKey(key: bigint[]): bigint[] {
        const k: bigint[] = [...key];
        const keySchedule: bigint[] = new Array(SpeckCipher.ROUNDS);

        for (let i = key.length; i < SpeckCipher.ROUNDS; i++) {
            k.push(BigInt(0));
        }

        keySchedule[0] = k[0];

        for (let i = 0; i < SpeckCipher.ROUNDS - 1; i++) {
            const rotated = this.rotateRight64(k[i], 8);
            k[i + 1] = (rotated + k[i + 1]) & BigInt("0xFFFFFFFFFFFFFFFF");
            k[i + 1] ^= BigInt(i);
            keySchedule[i + 1] = k[i + 1];
        }

        return keySchedule;
    };

    private rotateRight64(x: bigint, n: number): bigint {
        n = n % 64;
        return ((x >> BigInt(n)) | (x << BigInt(64 - n))) & BigInt("0xFFFFFFFFFFFFFFFF");
    };

    private rotateLeft64(x: bigint, n: number): bigint {
        n = n % 64;
        return ((x << BigInt(n)) | (x >> BigInt(64 - n))) & BigInt("0xFFFFFFFFFFFFFFFF");
    };

    encryptBlockSingleBlock(plaintext: bigint[]): bigint[] {
        let x = plaintext[1];
        let y = plaintext[0];

        for (let i = 0; i < SpeckCipher.ROUNDS; i++) {
            x = this.rotateRight64(x, 8);
            x += y;
            x &= BigInt("0xFFFFFFFFFFFFFFFF");
            x ^= this.keySchedule[i];
            y = this.rotateLeft64(y, 3);
            y ^= x;
        }

        return [y, x];
    };


    private addZeroPadding(data: bigint[]): bigint[] {
        const remainder = data.length % SpeckCipher.BLOCK_WORDS;
        if (remainder === 0) return [...data];

        const padding = new Array(SpeckCipher.BLOCK_WORDS - remainder).fill(BigInt(0));
        return [...data, ...padding];
    };


    encryptBlock(plaintext: bigint[]): bigint[] {
        const padded = this.addZeroPadding(plaintext);
        const answer = [];

        for (let i = 0; i < padded.length; i += SpeckCipher.BLOCK_WORDS) {
            const block = padded.slice(i, i + SpeckCipher.BLOCK_WORDS);
            const plainBlock = this.encryptBlockSingleBlock(block);
            answer.push(...plainBlock);
        }

        return answer;
    };

    decryptBlockSingleBlock(ciphertext: bigint[]): bigint[] {
        let x = ciphertext[1];
        let y = ciphertext[0];

        for (let i = SpeckCipher.ROUNDS - 1; i >= 0; i--) {
            y ^= x;
            y = this.rotateRight64(y, 3);
            x ^= this.keySchedule[i];
            x -= y;
            x &= BigInt("0xFFFFFFFFFFFFFFFF");
            x = this.rotateLeft64(x, 8);
        }

        return [y, x];
    };

    decryptBlock(ciphertext: bigint[]): bigint[] {
        const answer = [];

        for (let i = 0; i < ciphertext.length; i += SpeckCipher.BLOCK_WORDS) {
            const block = ciphertext.slice(i, i + SpeckCipher.BLOCK_WORDS);
            const plainBlock = this.decryptBlockSingleBlock(block);
            answer.push(...plainBlock);
        }
        return answer;
    };
}
