export class SpeckCipher {
    private static readonly rounds = 32;
    private keySchedule: bigint[];

    constructor(key: bigint[]) {
        if (key.length !== 2) {
            throw new Error("Speck64/128 requires 128-bit key (2x 64-bit words)");
        }
        this.keySchedule = this.expandKey(key);
    }

    private expandKey(key: bigint[]): bigint[] {
        const k = [...key];
        const keySchedule: bigint[] = new Array(SpeckCipher.rounds);
        
        keySchedule[0] = k[0];
        
        for (let i = 0; i < SpeckCipher.rounds - 1; i++) {
            k[i + 1] = this.rotateRight64(k[i], 8) + k[i + 1] & BigInt("0xFFFFFFFFFFFFFFFF");
            k[i + 1] ^= BigInt(i);
            keySchedule[i + 1] = k[i + 1];
        }
        
        return keySchedule;
    }

    private rotateRight64(x: bigint, n: number): bigint {
        n = n % 64;
        return ((x >> BigInt(n)) | (x << BigInt(64 - n))) & BigInt("0xFFFFFFFFFFFFFFFF");
    }

    private rotateLeft64(x: bigint, n: number): bigint {
        n = n % 64;
        return ((x << BigInt(n)) | (x >> BigInt(64 - n))) & BigInt("0xFFFFFFFFFFFFFFFF");
    }

    encryptBlock(plaintext: bigint[]): bigint[] {
        if (plaintext.length !== 2) {
            throw new Error("Block must be 64-bit (2x 32-bit words)");
        }

        let x = plaintext[1];
        let y = plaintext[0];

        for (let i = 0; i < SpeckCipher.rounds; i++) {
            x = this.rotateRight64(x, 8);
            x += y;
            x &= BigInt("0xFFFFFFFFFFFFFFFF");
            x ^= this.keySchedule[i];
            y = this.rotateLeft64(y, 3);
            y ^= x;
        }

        return [y, x];
    }

    decryptBlock(ciphertext: bigint[]): bigint[] {
        if (ciphertext.length !== 2) {
            throw new Error("Block must be 64-bit (2x 32-bit words)");
        }

        let x = ciphertext[1];
        let y = ciphertext[0];

        for (let i = SpeckCipher.rounds - 1; i >= 0; i--) {
            y ^= x;
            y = this.rotateRight64(y, 3);
            x ^= this.keySchedule[i];
            x -= y;
            x &= BigInt("0xFFFFFFFFFFFFFFFF");
            x = this.rotateLeft64(x, 8);
        }

        return [y, x];
    }
}
