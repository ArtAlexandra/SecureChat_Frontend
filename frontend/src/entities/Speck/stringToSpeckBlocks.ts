const stringToSpeckBlocks = (input: string): bigint[] => {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(input);
    
    const paddedBytes = new Uint8Array(8 * Math.ceil(bytes.length / 8));
    paddedBytes.set(bytes);
    
    const blocks: bigint[] = [];
    for (let i = 0; i < paddedBytes.length; i += 8) {
        const chunk = paddedBytes.slice(i, i + 8);
        
        const hexString = Array.from(chunk)
            .reverse()
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
            
        blocks.push(BigInt("0x" + hexString));
    }
    
    return blocks;
};

export default stringToSpeckBlocks;