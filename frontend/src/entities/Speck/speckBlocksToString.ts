const speckBlocksToString = (blocks: bigint[]): string =>  {
    const bytes = new Uint8Array(blocks.length * 8);
    
    blocks.forEach((block, index) => {
        const hex = block.toString(16).padStart(16, '0');
        const chunk = hex.match(/.{2}/g)!
            .reverse()
            .map(b => parseInt(b, 16));
            
        bytes.set(chunk, index * 8);
    });
    
    return new TextDecoder('utf-8').decode(bytes).replace(/\x00+$/, '');
}

export default speckBlocksToString;